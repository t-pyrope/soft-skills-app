import { StyleSheet, FlatList, Text, View, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';

import CustomLink from '@/components/ui/CustomLink';
import { CustomButton } from '@/components/ui/CustomButton';
import { API } from '@/constants/API';
import { useAppContext } from '@/context/AppContext';
import { Header } from '@/components/Header';
import { TasksGraph } from '@/components/TasksGraph';

export default function TabTwoScreen() {
    const { token, displayName, logoutLocally } = useAppContext();

    const data = [
        { id: 'login', title: 'Login' },
        { id: 'register', title: 'Register' },
    ];

    const logout = async () => {
        try {
            const response = await fetch(`${API}/logout`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const json = await response.json();

            if (json.status === 'ok') {
                logoutLocally();
            }
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Header />

            <View style={styles.inner}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                    <Ionicons name='person-circle-outline' size={32} />
                    <Pressable>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                            <Text style={{ fontSize: 20 }}>{displayName}</Text>
                        </View>
                    </Pressable>
                </View>

                {!token ? (
                    <FlatList
                        data={data}
                        renderItem={({ item }) => (
                            <View style={{ marginTop: 8 }}>
                                <CustomLink href={`../${item.id}`}>{item.title}</CustomLink>
                            </View>
                        )}
                    />
                ) : (
                    <CustomButton
                        text={'Log out'}
                        size={'small'}
                        type={'transparent'}
                        onPress={logout}
                    />
                )}

                <View style={{ marginTop: 24, gap: 8 }}>
                    <Text style={styles.title}>Statistics</Text>
                    <TasksGraph />
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        gap: 8,
        position: 'static',
    },
    inner: {
        padding: 10,
    },
    link: {
        textDecorationLine: 'underline',
        color: '',
    },
    title: {
        fontSize: 18,
    },
});
