/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
/* eslint-disable no-throw-literal */
import {
  Text, View, Pressable,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../../styles/styles';

const setUserID = async (contactID) => {
  try {
    await AsyncStorage.setItem('whatsthat_contact_id', contactID);
  } catch {
    throw 'error with async';
  }
};

function SearchedItem({ contact }) {
  const navigation = useNavigation();

  const pressContact = () => {
    setUserID(contact.user_id);
    navigation.navigate('Search Profile');
  };

  return (

    <Pressable style={styles.slItemContainer} onPress={() => pressContact()}>
      <View style={styles.slContent}>
        <View style={styles.row}>
          <Text numberOfLines={1} style={styles.name}>
            {contact.given_name}
            {' '}
            {contact.family_name}
          </Text>
        </View>

        <Text numberOfLines={1} style={styles.subTitle}>{contact.email}</Text>
      </View>
    </Pressable>
  );
}

export default SearchedItem;
