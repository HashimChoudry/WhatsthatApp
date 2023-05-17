/* eslint-disable no-use-before-define */
/* eslint-disable react/react-in-jsx-scope */
import {
  View, Text, Image, TouchableOpacity,
} from 'react-native';
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles/styles';

export default function BlockedProfileScreen() {
  const [token, setToken] = useState('');
  const [contactID, setContactID] = useState();
  const [fname, setfname] = useState();
  const [sname, setsname] = useState();
  const [email, setEmail] = useState();
  const [contactImage, setContactImage] = useState();

  const navigation = useNavigation();

  const loadTokenContactID = () => {
    AsyncStorage.getItem('whatsthat_session_token').then((data) => {
      if (data !== null) {
        setToken(data);
      }
    }).catch(
      (error) => (error),
    );
    AsyncStorage.getItem('whatsthat_contact_id').then((data) => {
      if (data !== null) {
        setContactID(data);
      }
    }).catch(
      (error) => (error),
    );
  };

  const loadContactInfo = () => fetch(`http://localhost:3333/api/1.0.0/user/${contactID}`, {
    method: 'GET',
    headers: {
      'X-authorization': token,
    },
  // eslint-disable-next-line consistent-return
  }).then((response) => {
    if (response.status === 200) {
      return response.json();
    }
  }).then((rjson) => {
    setfname(rjson.first_name);
    setsname(rjson.last_name);
    setEmail(rjson.email);
  })
    .catch((err) => (err));

  const loadContactImage = () => fetch(`http://localhost:3333/api/1.0.0/user/${contactID}/photo`, {
    method: 'GET',
    headers: {
      'X-authorization': token,
    },
  // eslint-disable-next-line consistent-return
  }).then((response) => {
    if (response.status === 200) {
      return response.blob();
    }
  })
    .then((rblob) => {
      const data = URL.createObjectURL(rblob);
      setContactImage(data);
    })
    .catch((err) => (err));

  const unBlockContact = () => fetch(`http://localhost:3333/api/1.0.0/user/${contactID}/block`, {
    method: 'DELETE',
    headers: {
      'X-authorization': token,
    },
  // eslint-disable-next-line consistent-return
  }).then((response) => {
    if (response.status === 200) {
      return response.json();
    }
  }).then((rjson) => rjson).catch((err) => (err));

  const UnblockHandler = () => {
    unBlockContact();
    navigation.navigate('Blocked');
  };

  useEffect(() => {
    loadTokenContactID();
  }, []);

  useEffect(() => {
    loadContactImage();
    loadContactInfo();
  }, [contactID]);

  return (
    // eslint-disable-next-line react/jsx-filename-extension
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
          onPress={() => { UnblockHandler(); }}
        >
          <Text style={{ color: 'white' }}>Unblock User</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
