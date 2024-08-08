import React from 'react';
import {Image, Pressable, View} from "react-native";

export const Task = ({ id, src, text, setSelectedTaskId }: {
    id: string;
    src: string;
    text: string;
    setSelectedTaskId: React.Dispatch<React.SetStateAction<string | null>>
}) => {
    return (
        <View>
            <Pressable
                onPress={() => setSelectedTaskId(id)}
            >
                <Image source={{ uri: src }} style={{ width: 100, height: 100, borderRadius: 10 }} />
            </Pressable>
        </View>
    )
}
