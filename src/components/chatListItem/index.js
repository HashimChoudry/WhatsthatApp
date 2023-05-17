/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-throw-literal */
/* eslint-disable react/prop-types */
import {
  Text, View, Pressable, TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../../styles/styles';

function ListItem({ chat }) {
  const navigation = useNavigation();

  const time = new Date(chat.last_message.timestamp).toLocaleTimeString('en-UK');

  const setChatID = async () => {
    try {
      await AsyncStorage.setItem('whatsthat_chat_id', chat.chat_id);
    } catch {
      throw 'error with async';
    }
  };

  const chatNavigationHandler = () => {
    setChatID();
    navigation.navigate('Text');
  };

  const editChatHandler = () => {
    setChatID();
    navigation.navigate('Edit Chats');
  };

  if (Object.keys(chat.last_message).length !== 0) {
    return (
      <Pressable
        style={styles.diContainer}
        onPress={() => { chatNavigationHandler(chat.chat_id); }}
      >
        <View style={styles.content}>

          <View style={styles.row}>
            <Text numberOfLines={1} style={styles.clname}>{chat.name}</Text>
            <Text style={styles.subTitle}>{time}</Text>
          </View>
          <Text numberOfLines={2} style={styles.subTitle}>
            {chat.last_message.author.first_name}
            :
            {' '}
            {chat.last_message.message}
          </Text>
          <TouchableOpacity style={styles.editButton} onPress={() => { editChatHandler(); }}>
            <Text style={{ color: 'white' }}>Edit Chat</Text>
          </TouchableOpacity>
        </View>
      </Pressable>
    );
  }
  return (
    <View>
      <Pressable
        style={styles.diContainer}
        onPress={() => { chatNavigationHandler(chat.chat_id); }}
      >
        <View style={styles.content}>

          <View style={styles.row}>
            <Text numberOfLines={1} style={styles.clname}>{chat.name}</Text>
          </View>
          <TouchableOpacity style={styles.editButton} onPress={() => { editChatHandler(); }}>
            <Text style={{ color: 'white' }}>Edit Chat</Text>
          </TouchableOpacity>
        </View>
      </Pressable>
    </View>

  );
}

export default ListItem;
