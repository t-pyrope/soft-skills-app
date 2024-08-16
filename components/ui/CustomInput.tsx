import { Controller, FieldValues, RegisterOptions } from 'react-hook-form';
import { StyleSheet, TextInput, View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { ERROR_COLOR } from '@/constants/Colors';

export const CustomInput = ({
    control,
    rules,
    errorMessage,
    placeholder,
    name,
}: {
    control: any;
    rules: Omit<
        RegisterOptions<FieldValues, string>,
        'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
    >;
    errorMessage: string;
    placeholder: string;
    name: string;
}) => {
    return (
        <View>
            <Controller
                control={control}
                rules={rules}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        onChangeText={onChange}
                        value={value}
                        onBlur={onBlur}
                        placeholder={placeholder}
                        style={[styles.input, errorMessage ? styles.error : null]}
                    />
                )}
                name={name}
            />
            <View style={{ height: 23 }}>
                {!!errorMessage && (
                    <Animated.Text entering={FadeIn} exiting={FadeOut} style={styles.errorMessage}>
                        {errorMessage}
                    </Animated.Text>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    input: {
        height: 40,
        borderWidth: 1,
        padding: 10,
    },
    error: {
        borderColor: ERROR_COLOR,
    },
    errorMessage: {
        color: ERROR_COLOR,
    },
});
