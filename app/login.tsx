import {Platform, Text, View, Pressable} from "react-native";
import {StatusBar} from "expo-status-bar";
import {useForm} from "react-hook-form";
import {SafeAreaView} from "react-native-safe-area-context";
import Toast from 'react-native-root-toast';
import { router } from 'expo-router';

import {API} from "@/constants/API";
import {CustomInput} from "@/components/ui/CustomInput";

import {saveToSecureStore} from "@/helpers/secure-store";
import {saveToAsyncStore} from "@/helpers/async-store";
import {ERROR_COLOR} from "@/constants/Colors";

export default function LoginModal () {
    const {
        control,
        handleSubmit,
        formState: { errors, isDirty }
    } = useForm({
        defaultValues: {
            email: '',
            password: ''
        }
    })

    const onSubmit = handleSubmit(async (data) => {
        try {
            const response = await fetch(`${API}/login`, {
                method: 'POST',
                body: JSON.stringify({ email: data.email, password: data.password }),
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            const json = await response.json();

            if ('error' in json) {
                Toast.show(json.error, {
                    backgroundColor: ERROR_COLOR,
                    shadow: false,
                })
            } else {
                await saveToSecureStore('token', json.token);
                await saveToAsyncStore('email', json.user.email);
                await saveToAsyncStore('displayName', json.user.displayName);

                router.navigate('/profile');
            }
        } catch (e) {
            console.error(e);
        }
    })

    const getErrorMessage = (type: string) => {
        switch (type) {
            case 'pattern':
                return `Doesn't look like an email`;
            case 'minLength':
                return 'Too short'
            case 'required':
            default:
                return 'Required';
        }
    }

    return (
        <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <View style={{ minWidth: 300 }}>
                <CustomInput
                    control={control}
                    rules={{
                        required: true,
                        pattern: /^[-.\w]+@([\w-]+\.)+[\w-]{2,12}$/,
                    }}
                    errorMessage={!!errors.email?.type ? getErrorMessage(errors.email.type) : ''}
                    placeholder={'Email'}
                    name={'email'}
                />

                <CustomInput
                    control={control}
                    rules={{
                        required: true,
                        minLength: 3,
                    }}
                    errorMessage={!!errors.password?.type ? getErrorMessage(errors.password.type) : ''}
                    placeholder={'Password'}
                    name={'password'}
                />

                <View>
                    <Pressable
                        onPress={onSubmit}
                        disabled={!isDirty || Object.keys(errors).length > 0}
                    >
                        <Text>Login</Text>
                    </Pressable>
                </View>
            </View>

            <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
        </SafeAreaView>
    )
}
