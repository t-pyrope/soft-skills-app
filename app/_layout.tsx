import { useEffect } from 'react';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import 'react-native-reanimated';
import { RootSiblingParent } from 'react-native-root-siblings';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { useColorScheme } from '@/hooks/useColorScheme';
import { AppContextProvider } from '@/context/AppContext';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const colorScheme = useColorScheme();
    const [loaded] = useFonts({
        SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    });

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    return (
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <AppContextProvider>
                <RootSiblingParent>
                    <SafeAreaProvider>
                        <Stack>
                            <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
                            <Stack.Screen name='+not-found' />
                            <Stack.Screen
                                name='login'
                                options={{
                                    title: 'Login',
                                    presentation: 'modal',
                                }}
                            />
                            <Stack.Screen
                                name='register'
                                options={{
                                    title: 'Register',
                                    presentation: 'modal',
                                }}
                            />
                        </Stack>
                    </SafeAreaProvider>
                </RootSiblingParent>
            </AppContextProvider>
        </ThemeProvider>
    );
}
