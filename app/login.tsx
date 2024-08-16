import {Platform, View} from "react-native";
import {StatusBar} from "expo-status-bar";
import {useForm} from "react-hook-form";
import {SafeAreaView} from "react-native-safe-area-context";
import Toast from 'react-native-root-toast';
import { router } from 'expo-router';

import {API} from "@/constants/API";
import {CustomInput} from "@/components/ui/CustomInput";

import {ERROR_COLOR} from "@/constants/Colors";
import {CustomButton} from "@/components/ui/CustomButton";
import {useAppContext} from "@/context/AppContext";
import {EMAIL_RULES, PASSWORD_RULES} from "@/constants/login";
import {getErrorMessage} from "@/helpers/login";

export default function LoginModal () {
    const { loginLocally } = useAppContext();
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
                // TODO: make the proper text field errored
                Toast.show(json.error, {
                    backgroundColor: ERROR_COLOR,
                    shadow: false,
                })
            } else {
                await loginLocally(json.token, json.user.email, json.user.displayName);
                router.navigate('/profile');
            }
        } catch (e) {
            console.error(e);
        }
    })

    return (
        <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <View style={{ minWidth: 300 }}>
                <CustomInput
                    control={control}
                    rules={EMAIL_RULES}
                    errorMessage={!!errors.email?.type ? getErrorMessage(errors.email.type) : ''}
                    placeholder={'Email'}
                    name={'email'}
                />

                <CustomInput
                    control={control}
                    rules={PASSWORD_RULES}
                    errorMessage={!!errors.password?.type ? getErrorMessage(errors.password.type) : ''}
                    placeholder={'Password'}
                    name={'password'}
                />

                <View>
                    <CustomButton
                        onPress={onSubmit}
                        disabled={!isDirty || Object.keys(errors).length > 0}
                        text={'Login'}
                    />
                </View>
                <View style={{ marginTop: 4 }}>
                    <CustomButton
                        type={'transparent'}
                        text={'Register'}
                        onPress={() => router.navigate('/register')}
                    />
                </View>
            </View>

            <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
        </SafeAreaView>
    )
}
