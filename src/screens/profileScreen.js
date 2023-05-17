/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-throw-literal */
/* eslint-disable consistent-return */
import {
  View, Text, Image, TouchableOpacity,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles/styles';

export default function ProfileScreen() {
  const [token, setToken] = useState('');
  const [userID, setUserID] = useState();
  const [photo, setPhoto] = useState();
  const [fname, setfname] = useState();
  const [sname, setsname] = useState();
  const [email, setEmail] = useState();

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

  const logoutUser = () => fetch('http://localhost:3333/api/1.0.0/logout', {
    method: 'post',
    headers: {
      'X-authorization': token,
    },
  })
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      }
    }).then(() => ('logged out'))
    .catch((err) => (err));

  const clearAsync = async () => {
    try {
      await AsyncStorage.setItem('whatsthat_user_id', '');
      await AsyncStorage.setItem('whatsthat_session_token', '');
      navigation.navigate('Login');
    } catch {
      throw 'something went wrong';
    }
  };

  const combinelogout = () => {
    logoutUser();
    clearAsync();
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
    <View style={styles.profileScreenContainer}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={{ uri: photo }}
        />
      </View>
      <View style={styles.profileContainer}>
        <Text style={styles.name}>{fname}</Text>
        <Text style={styles.name}>{sname}</Text>
        <Text style={styles.name}>{email}</Text>
        <TouchableOpacity style={styles.sProfileButtonContainer} onPress={combinelogout}>
          <Text style={{ color: 'white' }}>Log out</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sProfileButtonContainer} onPress={() => navigation.navigate('Blocked')}>
          <Text style={{ color: 'white' }}>Show Blocked Users</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sProfileButtonContainer} onPress={() => navigation.navigate('Edit Profile')}>
          <Text style={{ color: 'white' }}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sProfileButtonContainer} onPress={() => navigation.navigate('Drafts')}>
          <Text style={{ color: 'white' }}>See Drafts</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}
