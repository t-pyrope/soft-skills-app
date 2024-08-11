
import {StyleSheet, FlatList, Text, View, Pressable, Button} from 'react-native';
import {SafeAreaView} from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import {Link} from "expo-router";

export default function TabTwoScreen() {
  const data = [
    { id: 'login', title: 'Login' },
    { id: 'register', title: 'Register' }
  ];

  return (
      <SafeAreaView style={styles.container}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <Ionicons name="person-circle-outline" size={32} />
            <Pressable>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                    <Text style={{ fontSize: 20 }}>Red bunny</Text>
                    <Ionicons name="pencil" size={20} />
                </View>
            </Pressable>
        </View>
        <FlatList
            data={data}
            renderItem={({ item }) => (
                <View style={{ marginTop: 8 }}>
                <Link href={'../login'}>
                    {item.title}
                </Link>
                </View>
            )}
        />
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    gap: 8,
    position: 'static',
  },
});
