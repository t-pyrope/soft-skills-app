import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Task } from '@/components/Task';
import { TaskExpanded } from '@/components/TaskExpanded';

export const Category = ({
    title,
    tasks,
    selectedTaskId,
    setSelectedTaskId,
}: {
    title: string;
    tasks: {
        id: string;
        src: string;
        text: string;
    }[];
    selectedTaskId: null | string;
    setSelectedTaskId: React.Dispatch<React.SetStateAction<string | null>>;
}) => {
    const selectedTask =
        selectedTaskId && tasks.length ? tasks.find((task) => task.id === selectedTaskId) : null;

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
