import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveToAsyncStore = async (key: string, value: string) => {
    try {
        await AsyncStorage.setItem(key, value);
    } catch (e) {
        console.error(e);
    }
};

export const getValueFromAsyncStore = async (key: string) => {
    try {
        return await AsyncStorage.getItem(key);
    } catch (e) {
        console.error(e);
    }
};

export const deleteValueFromAsyncStore = async (key: string) => {
    try {
        await AsyncStorage.removeItem(key);
        return true;
    } catch (e) {
        console.error(e);
        return false;
    }
};
