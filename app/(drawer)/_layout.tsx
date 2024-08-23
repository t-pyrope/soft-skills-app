import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { i18n } from '@/locales/i18n';

export default function Layout() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Drawer screenOptions={{  }}>
                <Drawer.Screen
                    name={"index"}
                    options={{
                        title: i18n.t('home'),
                        headerShown: false,
                    }}
                />

                <Drawer.Screen
                    name='profile'
                    options={{
                        title: i18n.t('profile'),
                        headerShown: false,
                    }}
                />
            </Drawer>
        </GestureHandlerRootView>
    );
}
