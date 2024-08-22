import { StyleSheet, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Category } from '@/components/Category';
import { API } from '@/constants/API';
import { TaskExpanded } from '@/components/TaskExpanded';
import { Header } from '@/components/Header';
import { CategoryTask } from '@/types';

export default function HomeScreen() {
    const [selectedTaskId, setSelectedTaskId] = useState<null | string>(null);
    const [categories, setCategories] = useState<
        { title: string; id: string; tasks: CategoryTask[] }[]
    >([]);

    const tasks = categories.map((category) => category.tasks).flat();
    const selectedTask = selectedTaskId ? tasks.find((task) => task.id === selectedTaskId) : null;

    useEffect(() => {
        fetch(`${API}/categories`)
            .then((res) => res.json())
            .then((json) => setCategories(json.categories));
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <Header />
            <ScrollView style={styles.categoryContainer}>
                {categories.map(({ id, title, tasks }) => (
                    <Category
                        title={title}
                        tasks={tasks}
                        key={id}
                        setSelectedTaskId={setSelectedTaskId}
                    />
                ))}
            </ScrollView>
            {!!selectedTask && (
                <TaskExpanded
                    src={selectedTask.src}
                    text={selectedTask.text}
                    id={selectedTask.id}
                    setSelectedTaskId={setSelectedTaskId}
                />
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 60,
        gap: 8,
        position: 'static',
    },
    title: {
        fontSize: 20,
        color: 'white',
        marginLeft: 14,
    },
    intro: {
        width: '100%',
        height: 90,
        padding: 6,
        justifyContent: 'space-between',
    },
    categoryContainer: {
        paddingTop: 20,
        padding: 10,
    },
});
