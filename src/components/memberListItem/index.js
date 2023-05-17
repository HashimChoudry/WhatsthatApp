/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable consistent-return */
/* eslint-disable eqeqeq */
/* eslint-disable react/prop-types */
import {
  Text, View, Pressable,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import { Swipeable } from 'react-native-gesture-handler';
import styles from '../../styles/styles';

function MemberItem({ member, isMem, memberEdit }) {
  const [token, setToken] = useState();
  const [userID, setUserID] = useState();
  const [chatId, setChatId] = useState();

  const LoadTokenID = () => {
    AsyncStorage.getItem('whatsthat_session_token').then((data) => {
      if (data !== null) {
        setToken(data);
      }
    }).catch(
      (error) => (error),
    );
    AsyncStorage.getItem('whatsthat_user_id').then((data) => {
      if (data !== null) {
        setUserID(data);
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

  const deleteMember = () => {
    if (member.user_id == userID) {
      return null;
    }
    return fetch(`http://localhost:3333/api/1.0.0/chat/${chatId}/user/${member.user_id}`, {
      method: 'DELETE',
      headers: {
        'X-authorization': token,
      },
    }).then((response) => {
      if (response.status == 200) {
        return response.json();
      }
    }).then((rjson) => (rjson)).catch((err) => (err));
  };

  const addMember = () => {
    if (member.user_id == userID) {
      return null;
    }
    return fetch(`http://localhost:3333/api/1.0.0/chat/${chatId}/user/${member.user_id}`, {
      method: 'POST',
      headers: {
        'X-authorization': token,
      },
    }).then((response) => {
      if (response.status == 200) {
        return response;
      }
    }).then((rjson) => (rjson)).catch((err) => (err));
  };
  const addHandler = () => {
    addMember();
    memberEdit(true);
  };

  const deleteHandler = () => {
    deleteMember();
    memberEdit(true);
  };

  const leftSwipeDelete = () => (
    <Pressable style={styles.mlDeleteBox} onPress={() => { deleteHandler(); }}>
      <Text>Delete</Text>
    </Pressable>
  );

  const leftSwipeAdd = () => (
    <Pressable style={styles.mlAddBox} onPress={() => { addHandler(); }}>
      <Text>Add</Text>
    </Pressable>
  );

  useFocusEffect(() => {
    LoadTokenID();
  });

  return (
    <Swipeable
      renderLeftActions={isMem ? leftSwipeDelete : leftSwipeAdd}
    >
      <View style={styles.mlContainer}>
        <View style={styles.content}>
          <View style={styles.mlRow}>
            <Text numberOfLines={1} style={styles.mlName}>
              {member.first_name}
              {' '}
              {member.last_name}
            </Text>
          </View>

          <Text numberOfLines={1} style={styles.subTitle}>{member.email}</Text>
        </View>
      </View>
    </Swipeable>
  );
}
export default MemberItem;
