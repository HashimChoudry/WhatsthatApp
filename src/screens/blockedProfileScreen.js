/* eslint-disable no-use-before-define */
/* eslint-disable react/react-in-jsx-scope */
import {
  View, Text, Image, StyleSheet, TouchableOpacity,
} from 'react-native';
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
    <View style={styles.container}>
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
        <TouchableOpacity style={styles.buttonContainer} onPress={() => { UnblockHandler(); }}>
          <Text style={{ color: 'white' }}>Unblock User</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  profileContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#2e2e2d',
    borderRadius: 10,
    padding: 20,
  },
  imageContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    overflow: 'hidden',
    marginBottom: 20,
  },
  image: {
    flex: 1,
    width: null,
    height: null,
  },
  infoContainer: {
    alignItems: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'white',
  },
  status: {
    fontSize: 18,
    color: '#777',
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingVertical: 12,
    paddingHorizontal: 42,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 4,
    backgroundColor: '#075E54',
  },
});
