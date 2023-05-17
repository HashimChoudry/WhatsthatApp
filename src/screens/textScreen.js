/* eslint-disable react/jsx-filename-extension */
/* eslint-disable eqeqeq */
/* eslint-disable consistent-return */
/* eslint-disable no-throw-literal */
/* eslint-disable import/no-extraneous-dependencies */
import {
  View, TextInput, ImageBackground, FlatList, KeyboardAvoidingView, Platform,
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import DarkBG from '../../assets/images/DarkBG.png';
import Message from '../components/Message';
import styles from '../styles/styles';

export default function TextScreen() {
  const navigation = useNavigation();
  const [chatId, setChatId] = useState('');
  const [chatData, setChatData] = useState('');
  const [token, setToken] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);
  const [msgDelete, setMsgDelete] = useState(false);
  const [msgEdit, setMsgEdit] = useState(false);

  const getTokenChatID = () => {
    AsyncStorage.getItem('whatsthat_chat_id').then((data) => {
      if (data !== null) {
        setChatId(data);
      }
    }).catch((error) => (error));
    AsyncStorage.getItem('whatsthat_session_token').then((data) => {
      if (data !== null) {
        setToken(data);
      }
    }).catch((error) => (error));
  };

  const loadChatData = () => fetch(`http://localhost:3333/api/1.0.0/chat/${chatId}`, {
    method: 'get',
    headers: {
      'X-authorization': token,
    },
  })
    .then((response) => {
      if (response.status === 200) {
        setSent(false);
        setMsgDelete(false);
        setMsgEdit(false);
        return response.json();
      } if (response.status === 401) {
        throw 'Unauthorised';
      } else if (response.status === 500) {
        throw 'Server Error';
      }
    })
    .then((rjson) => {
      setChatData(rjson);
    })
    .catch((err) => (err));

  const sendMessage = (Text) => {
    if (Text !== '' || Text !== ' ') {
      const jsonMessage = {
        message: Text,
      };
      return fetch(`http://localhost:3333/api/1.0.0/chat/${chatId}/message`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'X-authorization': token,
        },
        body: (JSON.stringify(jsonMessage)),
      }).then((response) => {
        if (response.status == 200) {
          return response.json();
        } if (response.status == 400) {
          throw 'bad request';
        } else if (response.status == 401) {
          throw 'Unauthorized';
        } else if (response.status == 403) {
          throw 'Forbidden';
        } else if (response.status == 404) {
          throw 'Not Found';
        } else if (response.status == 500) {
          throw 'Server Error';
        }
      }).then((rJson) => rJson).catch((err) => (err));
    }
  };

  const makeDraft = async () => {
    if (message !== '') {
      const draftObject = {
        chat_id: chatId,
        chat_name: chatData.name,
        message,
      };
      try {
        const draftArr = await AsyncStorage.getItem('Drafts');
        let newArr = [];
        if (draftArr) {
          newArr = JSON.parse(draftArr);
        }
        newArr.push(draftObject);
        await AsyncStorage.setItem('Drafts', JSON.stringify(newArr));
        setMessage('');
      } catch (err) {
        return err;
      }
    }
  };

  const sendHandler = () => {
    setMessage('');
    sendMessage(message);
    setSent(true);
  };

  const messageDeleted = () => {
    setMsgDelete(true);
  };

  useFocusEffect(
    React.useCallback(() => {
      getTokenChatID();
    }, []),
  );

  useFocusEffect(
    React.useCallback(() => {
      navigation.setOptions({
        title: chatData.name,
      });
    }, [chatData]),
  );

  useEffect(() => {
    loadChatData();
  }, [sent, msgDelete, msgEdit]);

  useFocusEffect(
    React.useCallback(() => {
      loadChatData();
    }, [token]),
  );

  useFocusEffect(
    React.useCallback(() => {
      if (msgDelete || msgEdit) {
        loadChatData();
      }
    }, [msgDelete, msgEdit]),
  );

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'android' ? 'padding' : 'height'} style={styles.bg}>
      <ImageBackground source={DarkBG} style={styles.bg}>
        <FlatList
          data={chatData.messages}
          renderItem={({ item }) => <Message messages={item} messageDeleted={messageDeleted} />}
          inverted
        />
        <View style={styles.textContainer}>
          <AntDesign
            name="plus"
            size={20}
            color="royalblue"
            onPress={() => { makeDraft(); }}
          />
          <TextInput
            style={styles.textInput}
            placeholderTextColor="white"
            placeholder="Enter Your Message.. "
            value={message}
            onChangeText={setMessage}
          />
          <MaterialIcons
            style={styles.send}
            name="send"
            size={20}
            color="white"
            onPress={sendHandler}
          />
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
}
