/* eslint-disable react/jsx-filename-extension */
/* eslint-disable consistent-return */
import {
  View, Text, FlatList, TouchableOpacity, TextInput, TouchableHighlight, Modal,
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';

import ListItem from '../components/chatListItem';
import styles from '../styles/styles';

export default function ChatScreen() {
  const navigation = useNavigation();

  const [chat, setChats] = useState();
  const [token, setToken] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [created, setCreated] = useState(false);
  const [chatName, setChatName] = useState('');

  const LoadTokenID = () => {
    AsyncStorage.getItem('whatsthat_session_token').then((data) => {
      if (data !== null) {
        setToken(data);
      }
    }).catch(
      (error) => (error),
    );
  };

  const checkLoggedIn = async () => {
    const value = await AsyncStorage.getItem('whatsthat_session_token');
    if (value === '') {
      navigation.navigate('Login');
    }
  };

  const loadChats = () => fetch('http://localhost:3333/api/1.0.0/chat', {
    method: 'get',
    headers: {
      'X-authorization': token,
    },
  })
    .then((response) => {
      if (response.status === 200) {
        setCreated(false);
        return response.json();
      }
    })
    .then((rjson) => {
      setChats(rjson);
    })
    .catch((err) => (err));

  const newChat = (name) => {
    if (name !== '') {
      let jsonName = {
        name,
      };
      jsonName = JSON.stringify(jsonName);
      return fetch('http://localhost:3333/api/1.0.0/chat', {
        method: 'post',
        headers: {
          'X-authorization': token,
          'Content-Type': 'application/json',
        },
        body: jsonName,
      }).then((response) => {
        if (response.status === 201) {
          setCreated(true);
          return response.json;
        }
      }).then((rjson) => (`created${rjson}`)).catch((err) => (err));
    }
  };

  const createNewChatHandler = (name) => {
    newChat(name);
    setModalVisible(false);
  };

  useEffect(() => {
    LoadTokenID();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      checkLoggedIn();
      loadChats();
    }, [token]),
  );

  useEffect(() => {
    loadChats();
  }, [created]);

  return (
    <View style={styles.chatScreenContainer}>
      <TouchableOpacity
        style={styles.sProfileButtonContainer}
        onPress={() => { setModalVisible(true); }}
      >
        <Text style={{ color: 'white' }}>Create Chat</Text>
      </TouchableOpacity>
      <FlatList
        style={{ backgroundColor: 'black' }}
        data={chat}
        renderItem={({ item }) => <ListItem chat={item} />}
      />
      <Modal
        transparent
        visible={modalVisible}
        animationType="fade"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              style={styles.eChatInput}
              placeholder="Enter Chat Name..."
              placeholderTextColor="grey"
              value={chatName}
              onChangeText={setChatName}
            />
            <TouchableHighlight
              style={styles.sProfileButtonContainer}
              onPress={() => { createNewChatHandler(chatName); }}
            >
              <Text style={{ color: 'white' }}>Create Chat</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={styles.sProfileButtonContainer}
              onPress={() => { setModalVisible(false); }}
            >
              <Text style={{ color: 'white' }}>Go Away</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    </View>
  );
}
