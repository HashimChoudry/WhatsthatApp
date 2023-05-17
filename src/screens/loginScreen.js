/* eslint-disable no-use-before-define */
/* eslint-disable react/jsx-filename-extension */
import {
  Text, View, TextInput, StyleSheet, TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [invalid, setInvalid] = useState(false);

  const navigation = useNavigation();
  const checkLoggedIn = async () => {
    const value = await AsyncStorage.getItem('whatsthat_session_token');
    if (value != null) {
      navigation.navigate('main');
    }
  };

  const Login = () => {
    const toSend = {
      email,
      password,
    };
    return fetch('http://localhost:3333/api/1.0.0/login', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(toSend),
    })
      // eslint-disable-next-line consistent-return
      .then((response) => {
        if (response.status === 200) {
          setEmail('');
          setPassword('');
          setInvalid(false);
          return response.json();
        }
      })
      .then(async (responseJson) => {
        try {
          await AsyncStorage.setItem('whatsthat_user_id', responseJson.id);
          await AsyncStorage.setItem('whatsthat_session_token', responseJson.token);
          navigation.navigate('main');
        } catch {
          // eslint-disable-next-line no-throw-literal
          throw responseJson;
        }
      })
      .catch(() => {
        setInvalid(true);
      });
  };
  useEffect(() => {
    checkLoggedIn();
  }, []);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="grey"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="grey"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />
      {invalid ? <Text style={{ color: 'red' }}>Username/Email is invalid</Text> : null}
      <TouchableOpacity style={styles.buttonContainer} onPress={Login}>
        <Text style={{ color: 'white' }}>Log In</Text>
      </TouchableOpacity>
      <View style={{ flexDirection: 'row', marginTop: 20 }} m>
        <Text style={{ color: 'white' }}>Dont have an account </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.link}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2e2e2d',
  },
  input: {
    fontSize: 15,
    borderRadius: 50,
    borderWidth: StyleSheet.hairlineWidth,
    padding: 10,
    marginBottom: 5,
    height: 10,
    borderColor: 'lightgray',
    backgroundColor: 'white',
  },
  link: {
    color: 'lightblue',
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 42,
    marginTop: 20,
    borderRadius: 4,
    backgroundColor: '#075E54',
  },
});
