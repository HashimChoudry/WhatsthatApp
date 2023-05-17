/* eslint-disable eqeqeq */
/* eslint-disable no-plusplus */

/* eslint-disable consistent-return */
/* eslint-disable react/jsx-filename-extension */
import {
  View, TextInput, Text, TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlatList } from 'react-native-gesture-handler';
import MemberItem from '../components/memberListItem';
import styles from '../styles/styles';

export default function EditChatScreen() {
  const [token, setToken] = useState('');
  const [chatID, setChatID] = useState('');
  const [newName, setNewName] = useState('');
  const [memberData, setMemberData] = useState('');
  const [contactData, setContactData] = useState('');
  const [memberIDArr, setMemberIDArr] = useState();
  const [edited, setEdited] = useState(false);

  const LoadTokenID = () => {
    AsyncStorage.getItem('whatsthat_session_token').then((data) => {
      if (data !== null) {
        setToken(data);
      }
    }).catch(
      (error) => (error),
    );
    AsyncStorage.getItem('whatsthat_chat_id').then((data) => {
      if (data !== null) {
        setChatID(data);
      }
    }).catch(
      (error) => (error),
    );
  };

  const sendName = (name) => {
    const jsonName = {
      name,
    };
    return fetch(`http://localhost:3333/api/1.0.0/chat/${chatID}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'X-authorization': token,
      },
      body: (JSON.stringify(jsonName)),
    }).then((response) => {
      if (response.status == 200) {
        return response.json();
      }
    }).then((rJson) => (`updated${rJson}`)).catch((err) => (err));
  };

  const loadChatMember = () => fetch(`http://localhost:3333/api/1.0.0/chat/${chatID}`, {
    method: 'get',
    headers: {
      'X-authorization': token,
    },
  })
    .then((response) => {
      if (response.status === 200) {
        setEdited(false);
        return response.json();
      }
    })
    .then((rjson) => {
      setMemberData(rjson.members);
    })
    .catch((err) => (err));

  const loadContacts = () => fetch('http://localhost:3333/api/1.0.0/contacts', {
    method: 'get',
    headers: {
      'X-authorization': token,
    },
  })
    .then((response) => {
      if (response.status === 200) {
        setEdited(false);
        return response.json();
      }
    })
    .then((rjson) => {
      setContactData(rjson);
    })
    .catch((err) => (err));

  const memberEdit = (editedItem) => {
    if (editedItem) {
      setEdited(true);
    }
  };

  useEffect(() => {
    LoadTokenID();
  }, []);

  useEffect(() => {
    loadChatMember();
    loadContacts();
  }, [token]);

  useEffect(() => {
    loadChatMember();
    loadContacts();
  }, [edited]);

  useEffect(() => {
    const memberIds = [];
    for (let i = 0; i < memberData.length; i++) {
      memberIds.push(memberData[i].user_id);
    }
    setMemberIDArr(memberIds);
  }, [memberData]);

  return (
    <View style={styles.eChatContainer}>
      <TextInput
        placeholder="Change Chat Name..."
        placeholderTextColor="grey"
        style={styles.eChatInput}
        value={newName}
        onChangeText={setNewName}
      />
      <TouchableOpacity style={styles.eChatButtonContainer} onPress={() => { sendName(newName); }}>
        <Text style={{ color: 'white' }}>Apply Change</Text>
      </TouchableOpacity>
      <Text style={{ color: 'white', marginTop: 10 }}>Members</Text>
      <FlatList
        data={memberData}
        renderItem={({ item }) => <MemberItem member={item} isMem memberEdit={memberEdit} />}
      />
      <Text style={{ color: 'white', marginTop: 10 }}>Contacts</Text>
      <FlatList
        data={contactData}
        renderItem={({ item }) => (memberIDArr.includes(item.user_id) ? null : (
          <MemberItem
            member={item}
            isMem={false}
            memberEdit={memberEdit}
          />
        ))}
      />

    </View>

  );
}
