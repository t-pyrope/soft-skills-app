import {Image, Text, View} from "react-native";
import React from "react";
import FontAwesome from '@expo/vector-icons/FontAwesome';

export const TaskExpanded = ({ id, src, text, setSelectedTaskId }: {
    id: string;
    src: string;
    text: string;
    setSelectedTaskId: React.Dispatch<React.SetStateAction<string | null>>
}) => {
    const close = () => {
        setSelectedTaskId(null);
    }

    return (
        <View
            aria-role={'modal'}
            style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                backgroundColor: 'rgba(0,0,0,0.65)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
        <View
            style={{ backgroundColor: '#ffffff', padding: 10, width: '80%', gap: 10 }}
        >
            <View style={{ height: 33, width: 33, position: 'absolute', top: 0, right: 10 }}>
                <FontAwesome.Button
                    name="close"
                    onPress={close}
                    backgroundColor={'transparent'}
                    color={'#151515'}
                />
            </View>
            <Image source={{ uri: src }} style={{ width: 100, height: 100, borderRadius: 10 }} />
            <Text>
                {text}
            </Text>
        </View>
        </View>
    )
}
