import { StyleSheet, Text, View } from "react-native";
import {useEffect, useState} from "react";
import {API} from "@/constants/API";
import {Task} from "@/components/Task";

export const Category = ({ title, id }: { title: string, id: string }) => {
    const [tasks, setTasks] = useState<{
        id: string,
        src: string,
        text: string,
    }[]>([]);

    useEffect(() => {
        fetch(`${API}/tasks?categoryId=${id}`, {
            method: 'GET',
        }).then((res) => res.json())
            .then((json) => setTasks(json.tasks))
            .catch((e) => console.error(e));
    }, []);

    return (
        <View>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.tasksContainer}>
                {tasks.map(({ id, src, text }) => (
                    <Task id={id} src={src} text={text} key={id} />
                ))}
            </View>
        </View>
    )
}

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
    }
})
