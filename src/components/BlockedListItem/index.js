/* eslint-disable no-throw-literal */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */
import {
  Text, View, Pressable,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../../styles/styles';

const setUserID = async (userID) => {
  try {
    await AsyncStorage.setItem('whatsthat_contact_id', userID);
  } catch {
    throw 'error with async';
  }
};

function BlockedItem({ contact }) {
  const navigation = useNavigation();

  const pressContact = () => {
    setUserID(contact.user_id);
    navigation.navigate('Blocked Profile');
  };

  return (

    <Pressable style={styles.diContainer} onPress={() => pressContact()}>
      <View style={styles.content}>
        <View style={styles.row}>
          <Text numberOfLines={1} style={styles.name}>
            {contact.first_name}
            {' '}
            {contact.last_name}
          </Text>
        </View>

        <Text numberOfLines={1} style={styles.subTitle}>{contact.email}</Text>
      </View>
    </Pressable>
  );
}

export default BlockedItem;
