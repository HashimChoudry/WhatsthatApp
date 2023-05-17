/* eslint-disable consistent-return */
/* eslint-disable react/jsx-filename-extension */
import { FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ContactsItem from '../components/contactsListItem';

export default function ContactsScreen() {
  const [userData, setUserData] = useState('');
  const [token, setToken] = useState('');

  const LoadTokenID = () => {
    AsyncStorage.getItem('whatsthat_session_token').then((data) => {
      if (data !== null) {
        setToken(data);
      }
    }).catch(
      (error) => (error),
    );
  };

  const loadContacts = () => fetch('http://localhost:3333/api/1.0.0/contacts', {
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
      setUserData(rjson);
    })
    .catch((err) => (err));

  useEffect(() => {
    LoadTokenID();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      loadContacts();
    }, [token]),
  );

  return (
    <FlatList
      style={{ backgroundColor: 'black' }}
      data={userData}
      renderItem={({ item }) => <ContactsItem contact={item} />}
    />
  );
}
