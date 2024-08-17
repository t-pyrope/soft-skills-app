import { StyleSheet, Text, ImageBackground, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Category } from '@/components/Category';
import { API } from '@/constants/API';
import { TaskExpanded } from '@/components/TaskExpanded';

export default function HomeScreen() {
    const [selectedTaskId, setSelectedTaskId] = useState<null | string>(null);
    const [categories, setCategories] = useState<{ title: string; id: string, tasks: {
            id: string;
            src: string;
            text: string;
        }[] }[]>([]);
    const tasks = categories.map((category) => category.tasks).flat();
    const selectedTask = selectedTaskId ? tasks.find((task) => task.id === selectedTaskId) : null;

    useEffect(() => {
        fetch(`${API}/categories`)
            .then((res) => res.json())
            .then((json) => setCategories(json.categories));
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground source={require('../../assets/images/intro.jpg')} style={styles.intro}>
                <Text style={styles.title}>Soft skills trainer</Text>
            </ImageBackground>
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
    },
    intro: {
        width: '100%',
        height: 90,
        padding: 6,
        justifyContent: 'flex-end',
    },
    categoryContainer: {
        paddingTop: 20,
        padding: 10,

    },
});
