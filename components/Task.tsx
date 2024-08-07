import {Image, View} from "react-native";

export const Task = ({ id, src, text }: {
    id: string;
    src: string;
    text: string;
}) => {
    return (
        <View>
            <Image source={{ uri: src }} style={{ width: 100, height: 100, borderRadius: 10 }} />
        </View>
    )
}
