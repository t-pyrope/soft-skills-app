import {useEffect, useState} from "react";
import {StyleSheet, FlatList, Text, View, Pressable} from 'react-native';
import {SafeAreaView} from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";

import {getValueFromSecureStore} from "@/helpers/secure-store";
import {getValueFromAsyncStore} from "@/helpers/async-store";
import CustomLink from "@/components/ui/CustomLink";

export default function TabTwoScreen() {
    const [token, setToken] = useState('token')
    const [email, setEmail] = useState('no email');
    const [displayName, setDisplayName] = useState('Red bunny');

    const data = [
    { id: 'login', title: 'Login' },
    { id: 'register', title: 'Register' }
  ];

  useEffect(() => {
      getValueFromSecureStore('token')
          .then((value) => {
              if (value) {
                  setToken(value);
              }
          })

      getValueFromAsyncStore('email').then((val) => {
          if (val) {
              setEmail(val)
          }
      })

      getValueFromAsyncStore('displayName').then((val) => {
          if (val) {
              setDisplayName(val);
          }
      })
  }, [])

  return (
      <SafeAreaView style={styles.container}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <Ionicons name="person-circle-outline" size={32} />
            <Pressable>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                    <Text style={{ fontSize: 20 }}>{displayName}</Text>
                    <Ionicons name="pencil" size={20} />
                </View>
            </Pressable>
        </View>

        <FlatList
            data={data}
            renderItem={({ item }) => (
                <View style={{ marginTop: 8 }}>
                <CustomLink href={`../${item.id}`}>
                    {item.title}
                </CustomLink>
                </View>
            )}
        />
          <Text>Token: {token}</Text>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    gap: 8,
    position: 'static',
  },
    link: {
        textDecorationLine: 'underline',
        color: '',
    },
});
