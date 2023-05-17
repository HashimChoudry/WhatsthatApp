/* eslint-disable react/jsx-filename-extension */
/* eslint-disable eqeqeq */
/* eslint-disable consistent-return */
/* eslint-disable react/prop-types */
import {
  View, Text, TextInput, Pressable, Modal, TouchableHighlight,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import styles from '../../styles/styles';

export default function Message({ messages, messageDeleted }) {
  const [token, setToken] = useState();
  const [userId, setUserId] = useState(0);
  const [chatId, setChatId] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [message, setMessage] = useState('');

  const loadTokenID = () => {
    AsyncStorage.getItem('whatsthat_session_token').then((data) => {
      if (data !== null) {
        setToken(data);
      }
    }).catch(
      (error) => (error),
    );
    AsyncStorage.getItem('whatsthat_user_id').then((data) => {
      if (data !== null) {
        setUserId(data);
      }
    }).catch(
      (error) => (error),
    );
    AsyncStorage.getItem('whatsthat_chat_id').then((data) => {
      if (data !== null) {
        setChatId(data);
      }
    }).catch(
      (error) => (error),
    );
  };

  const isUsrMessage = () => messages.author.user_id == userId;

  const deleteMessage = () => fetch(`http://localhost:3333/api/1.0.0/chat/${chatId}/message/${messages.message_id}`, {
    method: 'delete',
    headers: {
      'X-authorization': token,
    },
  }).then((response) => {
    if (response.status == 200) {
      return response.json();
    }
  }).then((rjson) => (rjson)).catch((err) => (err));

  const updateMessage = (input) => fetch(`http://localhost:3333/api/1.0.0/chat/${chatId}/message/${messages.message_id}`, {
    method: 'PATCH',
    headers: {
      'X-authorization': token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  }).then((response) => {
    if (response.status == 200) {
      return response.json();
    }
  }).then((rjson) => (rjson)).catch((err) => (err));

  const deleteHandler = () => {
    deleteMessage();
    messageDeleted();
  };

  const EditHandler = (input) => {
    updateMessage(input);
    messageDeleted();
  };

  const time = new Date(messages.timestamp).toLocaleTimeString('en-UK');

  const leftSwipe = () => (
    <Pressable style={styles.msgDeleteBox} onPress={() => { deleteHandler(); }}>
      <Text>Delete</Text>
    </Pressable>
  );

  useEffect(() => {
    loadTokenID();
  }, []);

  return (
    <View>
      <Swipeable
        renderRightActions={isUsrMessage() ? leftSwipe : null}
      >
        <Pressable
          style={[styles.msgContainer, {
            backgroundColor: isUsrMessage() ? '#075E54' : '#2e2e2d',
            alignSelf: isUsrMessage() ? 'flex-end' : 'flex-start',
          }]}
          onPress={() => { setModalVisible(true); }}
        >
          <Text style={{ color: 'white' }}>{messages.message}</Text>
          <Text style={styles.time}>{time}</Text>
        </Pressable>

      </Swipeable>
      <Modal
        transparent
        visible={modalVisible}
        animationType="fade"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.editText}>Edit Message</Text>
            <TextInput
              style={styles.signUpInput}
              placeholder={messages.message}
              placeholderTextColor="grey"
              value={message}
              onChangeText={setMessage}
            />
            <TouchableHighlight
              style={styles.sProfileButtonContainer}
              onPress={() => { const jsonMessage = { message }; EditHandler(jsonMessage); }}
            >
              <Text style={{ color: 'white' }}>Edit Chat</Text>
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
