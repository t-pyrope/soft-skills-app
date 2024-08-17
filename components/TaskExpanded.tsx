import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export const TaskExpanded = ({
    src,
    text,
    setSelectedTaskId,
}: {
    src: string;
    text: string;
    setSelectedTaskId: React.Dispatch<React.SetStateAction<string | null>>;
}) => {
    const close = () => {
        setSelectedTaskId(null);
    };

    return (
        <View
            aria-role={'modal'}
            style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Pressable onPress={close} style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                backgroundColor: 'rgba(0,0,0,0.65)',
            }} />
            <View style={{ backgroundColor: '#ffffff', padding: 10, width: '80%', gap: 10 }}>
                <View style={{ height: 33, position: 'absolute', top: 5, right: 5 }}>
                    <FontAwesome.Button
                        name='close'
                        onPress={close}
                        backgroundColor={'#f5f5f5'}
                        color={'#151515'}
                        iconStyle={{ marginRight: 0 }}
                    />
                </View>
                <Image
                    source={{ uri: src }}
                    style={{ width: 100, height: 100, borderRadius: 10 }}
                />
                <Text>{text}</Text>
            </View>
        </View>
    );
};
