/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable consistent-return */
import {
  Text, View, TouchableOpacity, FlatList, TextInput,
} from 'react-native';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SearchedItem from '../components/searchListItem';
import styles from '../styles/styles';

export default function SearchScreen() {
  const [searchData, setSearchData] = useState('');
  const [token, setToken] = useState('');
  const [userInp, setUserInp] = useState('');

  const LoadTokenID = () => {
    AsyncStorage.getItem('whatsthat_session_token').then((data) => {
      if (data !== null) {
        setToken(data);
      }
    }).catch(
      (error) => (error),
    );
  };

  const loadSearch = (searchInp) => fetch(`http://localhost:3333/api/1.0.0/search?q=${searchInp}&search_in=all&limit=20&offset=0`, {
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
      setSearchData(rjson);
    })
    .catch((err) => (err));

  useEffect(() => {
    LoadTokenID();
  }, []);

  return (
    <View style={styles.searchContainer}>
      <TextInput
        style={styles.input}
        placeholder="Search"
        placeholderTextColor="grey"
        value={userInp}
        onChangeText={(text) => setUserInp(text)}
      />
      <TouchableOpacity
        style={styles.signUpButtonContainer}
        onPress={() => { loadSearch(userInp); }}
      >
        <Text style={{ color: 'white' }}>Search Users</Text>
      </TouchableOpacity>
      <FlatList
        style={{ backgroundColor: 'black' }}
        data={searchData}
        renderItem={({ item }) => <SearchedItem contact={item} />}
      />

    </View>

  );
}
