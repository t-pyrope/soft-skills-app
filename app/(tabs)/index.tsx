import { StyleSheet, Text, ImageBackground, ScrollView } from 'react-native';
import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Category } from '@/components/Category';
import { API } from '@/constants/API';

export default function HomeScreen() {
    const [selectedTaskId, setSelectedTaskId] = useState<null | string>(null);
    const [categories, setCategories] = useState<{ title: string; id: string }[]>([]);

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
                {categories.map(({ id, title }) => (
                    <Category
                        title={title}
                        id={id}
                        key={id}
                        selectedTaskId={selectedTaskId}
                        setSelectedTaskId={setSelectedTaskId}
                    />
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
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
        position: 'static',
    },
});
