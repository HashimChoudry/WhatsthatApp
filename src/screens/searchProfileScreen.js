/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable consistent-return */
import {
  View, Text, Image, TouchableOpacity,
} from 'react-native';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles/styles';

export default function SearchedProfileScreen() {
  const [token, setToken] = useState('');
  const [searchedID, setSearchedID] = useState();
  const [fname, setfname] = useState();
  const [sname, setsname] = useState();
  const [email, setEmail] = useState();
  const [contactImage, setContactImage] = useState();

  const loadTokenSearchedID = () => {
    AsyncStorage.getItem('whatsthat_session_token').then((data) => {
      if (data !== null) {
        setToken(data);
      }
    }).catch(
      (error) => (error),
    );
    AsyncStorage.getItem('whatsthat_contact_id').then((data) => {
      if (data !== null) {
        setSearchedID(data);
      }
    }).catch(
      (error) => (error),
    );
  };

  const loadContactInfo = () => fetch(`http://localhost:3333/api/1.0.0/user/${searchedID}`, {
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

  const loadContactImage = () => fetch(`http://localhost:3333/api/1.0.0/user/${searchedID}/photo`, {
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
      setContactImage(data);
    })
    .catch((err) => (err));

  const AddContact = (contactID) => fetch(`http://localhost:3333/api/1.0.0/user/${contactID}/contact`, {
    method: 'post',
    headers: {
      'X-authorization': token,
    },
  }).then((response) => {
    if (response.status === 200) {
      return response.json();
    }
  }).then((responsejson) => (`userAdded:${responsejson}`)).catch((err) => (err));

  useEffect(() => {
    loadTokenSearchedID();
  }, []);

  useEffect(() => {
    loadContactImage();
    loadContactInfo();
  }, [searchedID]);

  return (

    <View style={styles.sProfileContainer}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={{ uri: contactImage }}
        />
      </View>
      <View style={styles.profileContainer}>
        <Text style={styles.name}>{fname}</Text>
        <Text style={styles.name}>{sname}</Text>
        <Text style={styles.name}>{email}</Text>

        <TouchableOpacity
          style={styles.sProfileButtonContainer}
          onPress={() => { AddContact(searchedID); }}
        >
          <Text style={{ color: 'white' }}>Add User</Text>
        </TouchableOpacity>
      </View>
    </View>

  );
}
