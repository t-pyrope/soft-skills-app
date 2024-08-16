import { Platform, View } from 'react-native';
import { useForm } from 'react-hook-form';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-root-toast';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';

import { CustomInput } from '@/components/ui/CustomInput';
import { CustomButton } from '@/components/ui/CustomButton';
import { DISPLAY_NAME_RULES, EMAIL_RULES, PASSWORD_RULES } from '@/constants/login';
import { getErrorMessage } from '@/helpers/login';
import { API } from '@/constants/API';
import { ERROR_COLOR, SUCCESS_COLOR } from '@/constants/Colors';

export default function RegisterModal() {
    const {
        control,
        handleSubmit,
        formState: { errors, isDirty },
    } = useForm({
        defaultValues: {
            email: '',
            displayName: '',
            password: '',
        },
    });

    const onSubmit = handleSubmit(async (data) => {
        try {
            const response = await fetch(`${API}/register`, {
                method: 'POST',
                body: JSON.stringify({
                    email: data.email,
                    password: data.password,
                    displayName: data.displayName,
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const json = await response.json();

            if ('error' in json) {
                // TODO: make the proper text field errored
                Toast.show(json.error, {
                    backgroundColor: ERROR_COLOR,
                    shadow: false,
                });
            } else {
                if (json.status === 'ok') {
                    Toast.show('The email was sent', {
                        backgroundColor: SUCCESS_COLOR,
                        shadow: false,
                        textColor: '#000',
                    });

                    router.navigate('/profile');
                }
            }
        } catch (e) {
            console.error(e);
        }
    });

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
                    errorMessage={
                        !!errors.password?.type ? getErrorMessage(errors.password.type) : ''
                    }
                    placeholder={'Password'}
                    name={'password'}
                />

                <CustomInput
                    control={control}
                    rules={DISPLAY_NAME_RULES}
                    errorMessage={
                        !!errors.displayName?.type ? getErrorMessage(errors.displayName.type) : ''
                    }
                    placeholder={'Name to display'}
                    name={'displayName'}
                />

                <View>
                    <CustomButton
                        onPress={onSubmit}
                        disabled={!isDirty || Object.keys(errors).length > 0}
                        text={'Register'}
                    />
                </View>

                <View style={{ marginTop: 4 }}>
                    <CustomButton
                        type={'transparent'}
                        text={'Login'}
                        onPress={() => router.navigate('/login')}
                    />
                </View>
            </View>

            <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
        </SafeAreaView>
    );
}
