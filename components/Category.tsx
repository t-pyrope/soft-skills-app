import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Task } from '@/components/Task';
import { CategoryTask } from '@/types';

export const Category = ({
    title,
    tasks,
    setSelectedTaskId,
}: {
    title: string;
    tasks: CategoryTask[];
    setSelectedTaskId: React.Dispatch<React.SetStateAction<string | null>>;
}) => {
    return (
        <View style={{ paddingBottom: 40 }}>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.tasksContainer}>
                {tasks.map(({ id, src, text }) => (
                    <Task id={id} src={src} key={id} setSelectedTaskId={setSelectedTaskId} />
                ))}
            </View>
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
