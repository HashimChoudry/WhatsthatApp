/* eslint-disable react/jsx-filename-extension */
/* eslint-disable consistent-return */
/* eslint-disable eqeqeq */
import React, { useState } from 'react';
import {
  Text, View, TextInput, TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles/styles';

export default function SignUpScreen() {
  const navigation = useNavigation();

  const [fname, SetFname] = useState('');
  const [sname, setSname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signUp = () => {
    const toSend = {
      first_name: fname,
      last_name: sname,
      email,
      password,
    };
    SetFname('');
    setSname('');
    setEmail('');
    setPassword('');
    return fetch('http://localhost:3333/api/1.0.0/user', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: (JSON.stringify(toSend)),
    })
      .then((Response) => {
        if (Response.status == 201) {
          return Response.json();
        }
      })
      .then((responseJson) => {
        navigation.navigate('Login');
        return responseJson;
      })
      .catch((error) => error);
  };

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>

        <TextInput
          style={styles.signUpInput}
          placeholder="First Name... "
          placeholderTextColor="grey"
          value={fname}
          onChangeText={SetFname}
        />

        <TextInput
          style={styles.signUpInput}
          placeholder="Second Name... "
          placeholderTextColor="grey"
          value={sname}
          onChangeText={setSname}
        />

        <TextInput
          style={styles.signUpInput}
          placeholder="E-mail... "
          placeholderTextColor="grey"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          style={styles.signUpInput}
          placeholder="Password... "
          placeholderTextColor="grey"
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.signUpButtonContainer} onPress={signUp}>
          <Text style={{ color: 'white' }}>Sign Up</Text>
        </TouchableOpacity>

        <View style={{ flexDirection: 'row', marginTop: 20 }}>
          <Text style={{ color: 'white' }}>Already Have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.link}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
