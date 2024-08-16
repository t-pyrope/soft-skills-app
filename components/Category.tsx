import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { API } from '@/constants/API';
import { Task } from '@/components/Task';
import { TaskExpanded } from '@/components/TaskExpanded';

export const Category = ({
    title,
    id,
    selectedTaskId,
    setSelectedTaskId,
}: {
    title: string;
    id: string;
    selectedTaskId: null | string;
    setSelectedTaskId: React.Dispatch<React.SetStateAction<string | null>>;
}) => {
    const [tasks, setTasks] = useState<
        {
            id: string;
            src: string;
            text: string;
        }[]
    >([]);
    const selectedTask =
        selectedTaskId && tasks.length ? tasks.find((task) => task.id === selectedTaskId) : null;

    useEffect(() => {
        fetch(`${API}/tasks?categoryId=${id}`, {
            method: 'GET',
        })
            .then((res) => res.json())
            .then((json) => setTasks(json.tasks))
            .catch((e) => console.error(e));
    }, [id]);

    return (
        <View style={{ position: 'static' }}>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.tasksContainer}>
                {tasks.map(({ id, src, text }) => (
                    <Task
                        id={id}
                        src={src}
                        text={text}
                        key={id}
                        setSelectedTaskId={setSelectedTaskId}
                    />
                ))}
            </View>
            {!!selectedTask && (
                <TaskExpanded
                    id={selectedTask.id}
                    src={selectedTask.src}
                    text={selectedTask.text}
                    setSelectedTaskId={setSelectedTaskId}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    title: {
        fontSize: 18,
        fontWeight: 700,
        marginBottom: 12,
    },
    tasksContainer: {
        flexDirection: 'row',
        gap: 10,
        flexWrap: 'wrap',
    },
});
