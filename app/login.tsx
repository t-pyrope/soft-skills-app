import {Platform, Text, View, Pressable} from "react-native";
import {StatusBar} from "expo-status-bar";
import {API} from "@/constants/API";
import {useForm} from "react-hook-form";
import {SafeAreaView} from "react-native-safe-area-context";
import {CustomInput} from "@/components/ui/CustomInput";

import {saveToSecureStore} from "@/helpers/secure-store";
import {saveToAsyncStore} from "@/helpers/async-store";

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
            console.log(json);

            if ('token' in json) {
                await saveToSecureStore('token', json.token);
            }
            if ('user' in json) {
                if ('email' in json.user) {
                    await saveToAsyncStore('email', json.user.email);
                }

                if ('displayName' in json.user) {
                    await saveToAsyncStore('displayName', json.user.displayName);
                }
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
