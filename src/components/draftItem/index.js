/* eslint-disable react/jsx-filename-extension */
/* eslint-disable eqeqeq */
/* eslint-disable consistent-return */
/* eslint-disable react/prop-types */
import {
  Text, View, Pressable, Modal, TouchableHighlight,
} from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import {
  TimePickerModal, DatePickerModal, enGB, registerTranslation,
} from 'react-native-paper-dates';
import styles from '../../styles/styles';

registerTranslation('en-GB', enGB);

function DraftItem({
  draft, token, draftArr, deleted,
}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [time, setTime] = useState(new Date());
  const [date, setDate] = useState(new Date());
  const [dateTime, setDateTime] = useState(undefined);
  const [timeVisible, setTimeVisible] = useState(false);
  const [dateVisible, setDateVisible] = useState(false);
  const [scheduled, setScheduled] = useState();

  const sendMessage = () => {
    const jsonMessage = {
      message: draft.message,
    };
    return fetch(`http://localhost:3333/api/1.0.0/chat/${draft.chat_id}/message`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'X-authorization': token,
      },
      body: (JSON.stringify(jsonMessage)),
    }).then((response) => {
      if (response.status == 200) {
        return response.json();
      }
    }).then((rJson) => (rJson)).catch((err) => (err));
  };
  const deleteDraft = async () => {
    const newArray = draftArr.filter((item) => item !== draft);
    try {
      await AsyncStorage.setItem('Drafts', JSON.stringify(newArray));
    } catch (err) {
      return (err);
    }
  };

  const sendHandler = () => {
    sendMessage();
    deleteDraft();
    deleted();
  };
  const leftSwipe = () => (
    <Pressable style={styles.diSendBox} onPress={() => { sendHandler(); }}>
      <Text style={styles.mlName}>Send Message</Text>
    </Pressable>
  );

  const rightSwipe = () => (
    <Pressable style={styles.diSendBox} onPress={() => { setModalVisible(true); }}>
      <Text style={styles.mlName}>Send Message Later</Text>
    </Pressable>
  );

  const onConfirmTime = React.useCallback(
    ({ hours, minutes }) => {
      setTimeVisible(false);
      const inputTime = new Date();
      inputTime.setHours(hours);
      inputTime.setMinutes(minutes);
      setTime(inputTime);
    },
    [setTimeVisible],
  );

  const onConfirmDate = React.useCallback(
    (params) => {
      setDateVisible(false);
      setDate(params.date);
    },
    [setDateVisible, setDate],
  );

  const getCurrentHour = () => {
    const currentTime = new Date();
    const hour = currentTime.getHours();
    return hour;
  };

  const getCurrentMinute = () => {
    const currentTime = new Date();
    const minute = currentTime.getMinutes();
    return minute;
  };
  const onDismissDate = React.useCallback(() => {
    setDateVisible(false);
  }, [setDateVisible]);

  const formatTime = () => {
    const formattedTime = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return formattedTime;
  };

  const sendAtTime = () => {
    const currentDate = new Date();
    const combinedDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      time.getHours(),
      time.getMinutes(),
      time.getSeconds(),
    );
    setDateTime(combinedDate);
    const timeDifference = combinedDate.getTime() - currentDate.getTime();
    if (timeDifference > 0) {
      setScheduled(true);
      setTimeout(() => { sendHandler(); }, timeDifference);
    } else {
      return ('time has already passed');
    }
  };

  return (
    <View>
      <Swipeable
        renderRightActions={leftSwipe}
        renderLeftActions={rightSwipe}
      >
        <View style={styles.diContainer}>
          <View style={styles.content}>
            <View style={styles.mlRow}>
              <Text style={styles.mlName}>
                Message:
                {draft.message}
              </Text>
            </View>
            <Text numberOfLines={1} style={styles.subTitle}>
              Chat name:
              {draft.chat_name}
            </Text>
            {scheduled ? (
              <Text style={styles.subTitle}>
                Item will be sent at
                {dateTime.toLocaleString('en-GB')}
              </Text>
            ) : null}
          </View>

        </View>
      </Swipeable>
      <Modal
        transparent
        visible={modalVisible}
        animationType="fade"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={{ color: 'white' }}>
              {date.toLocaleDateString('en-GB')}
              {' '}
              {formatTime()}
            </Text>
            <TouchableHighlight
              style={styles.sProfileButtonContainer}
              onPress={() => { setTimeVisible(true); }}
            >
              <Text style={{ color: 'white' }}>set time</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={styles.sProfileButtonContainer}
              onPress={() => { setDateVisible(true); }}
            >
              <Text style={{ color: 'white' }}>set Date</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={styles.sProfileButtonContainer}
              onPress={() => { sendAtTime(); }}
            >
              <Text style={{ color: 'white' }}>Schedule Send</Text>
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
      <TimePickerModal
        locale="en"
        visible={timeVisible}
        onConfirm={onConfirmTime}
        onDismiss={() => { setTimeVisible(false); }}
        hours={getCurrentHour}
        minutes={getCurrentMinute}
      />
      <DatePickerModal
        locale="en-GB"
        mode="single"
        visible={dateVisible}
        onDismiss={onDismissDate}
        date={date}
        onConfirm={onConfirmDate}
      />
    </View>
  );
}

export default DraftItem;
