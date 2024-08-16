import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveToSecureStore = async (key: string, value: string) => {
    try {
        if (Platform.OS === 'web') {
            await AsyncStorage.setItem(key, value);
        } else {
            await SecureStore.setItemAsync(key, value);
        }
    } catch (e) {
        console.error(e);
    }
};

export const getValueFromSecureStore = async (key: string) => {
    try {
        if (Platform.OS === 'web') {
            return await AsyncStorage.getItem(key);
        } else {
            return await SecureStore.getItemAsync(key);
        }
    } catch (e) {
        console.error(e);
        return null;
    }
};

export const deleteValueFromSecureStore = async (key: string) => {
    try {
        if (Platform.OS === 'web') {
            await AsyncStorage.removeItem(key);
        } else {
            await SecureStore.deleteItemAsync(key);
        }
        return true;
    } catch (e) {
        console.error(e);
        return false;
    }
};
