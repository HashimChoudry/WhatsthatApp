/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable consistent-return */
import {
  View, Text, Image, TouchableOpacity,
} from 'react-native';
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles/styles';

export default function ContactProfileScreen() {
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

  const loadContactImage = () => fetch(`http://localhost:3333/api/1.0.0/user/${contactID}/photo`, {
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

  const removeContact = () => fetch(`http://localhost:3333/api/1.0.0/user/${contactID}/contact`, {
    method: 'delete',
    headers: {
      'X-authorization': token,
    },
  })
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      }
    }).then(() => ('contact Deleted'))
    .catch((err) => (err));

  const blockUser = () => fetch(`http://localhost:3333/api/1.0.0/user/${contactID}/block`, {
    method: 'post',
    headers: {
      'X-authorization': token,
    },
  })
    .then((response) => {
      if (response.status === 200) {
        return 'Blocked';
      }
    }).then(() => ('contact Deleted'))
    .catch((err) => (err));

  const removeHandler = () => {
    removeContact();
    navigation.navigate('main');
  };

  const blockHandler = () => {
    blockUser();
    navigation.navigate('main');
  };

  useEffect(() => {
    loadTokenContactID();
  }, []);

  useEffect(() => {
    loadContactImage();
    loadContactInfo();
  }, [contactID]);

  return (
    <View style={styles.profileScreenContainer}>
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
          onPress={() => { blockHandler(); }}
        >
          <Text style={{ color: 'white' }}>Block User</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.sProfileButtonContainer}
          onPress={() => { removeHandler(); }}
        >
          <Text style={{ color: 'white' }}>Remove Contact</Text>
        </TouchableOpacity>
      </View>
    </View>

  );
}
