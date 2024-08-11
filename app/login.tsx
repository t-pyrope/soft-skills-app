import {Platform, View, Button} from "react-native";
import {StatusBar} from "expo-status-bar";
import {API} from "@/constants/API";
import {useForm} from "react-hook-form";
import {SafeAreaView} from "react-native-safe-area-context";
import {CustomInput} from "@/components/ui/CustomInput";

export type LoginFieldValues = {
    email: string,
    password: string,
}

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

    // const login = async () => {
    //     const response = await fetch(`${API}/login`, {
    //         method: 'POST',
    //         body: JSON.stringify({ email, password })
    //     })
    // }

    const onSubmit = handleSubmit((data) => {
        console.log('data', data);
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
                        minLength: 8,
                    }}
                    errorMessage={!!errors.password?.type ? getErrorMessage(errors.password.type) : ''}
                    placeholder={'Password'}
                    name={'password'}
                />

                <View style={{ }}>
                <Button
                    title={'Login'}
                    onPress={onSubmit}
                    disabled={!isDirty || Object.keys(errors).length > 0}
                />
                </View>
            </View>

            <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
        </SafeAreaView>
    )
}
