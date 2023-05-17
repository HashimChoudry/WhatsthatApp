/* eslint-disable react/jsx-filename-extension */
/* eslint-disable consistent-return */
import {
  View, Text, Image, TouchableOpacity, TextInput,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles/styles';

export default function EditProfileScreen() {
  const [token, setToken] = useState('');
  const [userID, setUserID] = useState();
  const [photo, setPhoto] = useState();
  const [fname, setfname] = useState();
  const [sname, setsname] = useState();
  const [email, setEmail] = useState();
  const [pass, setPass] = useState();

  const navigation = useNavigation();

  const LoadTokenID = () => {
    AsyncStorage.getItem('whatsthat_session_token').then((data) => {
      if (data !== null) {
        setToken(data);
      }
    }).catch(
      (error) => (error),
    );
    AsyncStorage.getItem('whatsthat_user_id').then((data) => {
      if (data !== null) {
        setUserID(data);
      }
    }).catch(
      (error) => (error),
    );
  };

  const loadUserPhoto = () => fetch(`http://localhost:3333/api/1.0.0/user/${userID}/photo`, {
    method: 'get',
    headers: {
      'X-authorization': token,
    },
  })
    .then((response) => {
      if (response.status === 200) {
        return response.blob();
      }
    })
    .then((rblob) => {
      const data = URL.createObjectURL(rblob);
      setPhoto(data);
    })
    .catch((err) => (err));

  const loadUserData = () => fetch(`http://localhost:3333/api/1.0.0/user/${userID}`, {
    method: 'get',
    headers: {
      'X-authorization': token,
    },
  })
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      }
    })
    .then((rjson) => {
      setfname(rjson.first_name);
      setsname(rjson.last_name);
      setEmail(rjson.email);
    })
    .catch((err) => (err));

  const updateUserData = (input) => {
    fetch(`http://localhost:3333/api/1.0.0/user/${userID}`, {
      method: 'PATCH',
      headers: {
        'X-authorization': token,
        'Content-Type': 'application/json',
      },
      body: (JSON.stringify(input)),
    }).then((response) => {
      if (response.status === 200) {
        return response.json();
      }
    }).then((rJson) => (rJson)).catch((err) => (err));
  };

  const patchHandler = (input) => {
    updateUserData(input);
    loadUserData();
  };

  useEffect(() => {
    LoadTokenID();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      loadUserPhoto();
      loadUserData();
    }, [token]),
  );

  return (
    <View style={styles.sProfileContainer}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={{ uri: photo }}
        />
      </View>
      <TouchableOpacity style={styles.sProfileButtonContainer} onPress={() => { navigation.navigate('Camera'); }}>
        <Text style={{ color: 'white' }}>Edit Profile picture</Text>
      </TouchableOpacity>
      <View style={styles.profileContainer}>
        <TextInput
          style={styles.eProfileInput}
          placeholderTextColor="grey"
          placeholder={fname}
          onChangeText={setfname}
        />
        <TouchableOpacity
          style={styles.sProfileButtonContainer}
          onPress={() => { const jsonFname = { first_name: fname }; patchHandler(jsonFname); }}
        >
          <Text style={{ color: 'white' }}>Edit Name</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.eProfileInput}
          placeholderTextColor="grey"
          placeholder={sname}
          onChangeText={setsname}
        />
        <TouchableOpacity
          style={styles.sProfileButtonContainer}
          onPress={() => { const jsonSname = { last_name: sname }; patchHandler(jsonSname); }}
        >
          <Text style={{ color: 'white' }}>Edit Last Name</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.eProfileInput}
          placeholderTextColor="grey"
          placeholder={email}
          onChangeText={setEmail}
        />
        <TouchableOpacity
          style={styles.sProfileButtonContainer}
          onPress={() => { const jsonEmail = { email }; patchHandler(jsonEmail); }}
        >
          <Text style={{ color: 'white' }}>Edit Email</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.eProfileInput}
          placeholderTextColor="grey"
          placeholder="password"
          onChangeText={setPass}
          secureTextEntry
        />
        <TouchableOpacity
          style={styles.sProfileButtonContainer}
          onPress={() => { const jsonEmail = { password: pass }; patchHandler(jsonEmail); }}
        >
          <Text style={{ color: 'white' }}>Edit Password</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}
