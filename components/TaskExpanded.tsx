import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { CustomButton } from '@/components/ui/CustomButton';
import { useAppContext } from '@/context/AppContext';
import { API } from '@/constants/API';

export const TaskExpanded = ({
    src,
    text,
    id,
    setSelectedTaskId,
}: {
    src: string;
    text: string;
    id: string;
    setSelectedTaskId: React.Dispatch<React.SetStateAction<string | null>>;
}) => {
    const { doneTasks, setDoneTasks, token } = useAppContext();
    const isLogged = !!token;

    const isDone = !!doneTasks.find((task) => task.id === id);

    const close = () => {
        setSelectedTaskId(null);
    };

    const toggleDone = async () => {
        try {
            const response = await fetch(`${API}/me/tasks`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ taskId: id }),
            })

            const json = await response.json();
            setDoneTasks(json.user.doneTasks);
        } catch (e) {
            console.error(e);
        }
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
                {isLogged && (
                    <CustomButton
                        text={isDone ? 'Mark as undone' : 'Done'}
                        onPress={toggleDone}
                        type={isDone ? 'transparent' : undefined}
                    />
                )}
            </View>
        </View>
    );
};
