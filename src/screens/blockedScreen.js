/* eslint-disable react/jsx-filename-extension */
/* eslint-disable consistent-return */
import { FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BlockedItem from '../components/BlockedListItem';

export default function BlockedScreen() {
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

  const loadBlocked = () => fetch('http://localhost:3333/api/1.0.0/blocked', {
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
      return ('user data Loaded');
    })
    .catch((err) => (err));

  useEffect(() => {
    LoadTokenID();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      loadBlocked();
    }, [token]),
  );

  return (
    <FlatList
      style={{ backgroundColor: 'black' }}
      data={userData}
      renderItem={({ item }) => <BlockedItem contact={item} />}
    />
  );
}
