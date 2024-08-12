import {Pressable, PressableProps, StyleSheet, Text} from "react-native";
import {useThemeColor} from "@/hooks/useThemeColor";
import {Colors} from "@/constants/Colors";

export const CustomButton = ({ type = 'button', text, ...rest }: PressableProps & {
    type?: keyof typeof Colors.light & keyof typeof Colors.dark,
    text: string,
}) => {
    const backgroundColor = useThemeColor({}, type);
    const isLink = type === 'transparent';
    const color = useThemeColor({}, isLink ? 'link' : 'text' );

    return (
        <Pressable { ...rest } style={[styles.button, { backgroundColor, }]}>
            <Text style={{ color, textDecorationLine: isLink ? 'underline' : 'none' }}>
                {text}
            </Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
    },
})
