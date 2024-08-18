import { ImageBackground, StyleSheet, Text } from 'react-native';
import { DrawerToggleButton } from '@react-navigation/drawer';

export const Header = () => {
    return (
        <ImageBackground source={require('../assets/images/intro.jpg')} style={styles.intro}>
            <DrawerToggleButton tintColor={'#ffffff'} />
            <Text style={styles.title}>Soft skills trainer</Text>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
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
});
