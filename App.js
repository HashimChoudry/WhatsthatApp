
import {Text, View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import loginScreen from './src/screens/loginScreen';
import signUpScreen from './src/screens/signUpScreen';

import ListItem from './src/components/chatListItem';



export default function App() {
  return (
    <View style = {styles.container}>
          <ListItem />
          <ListItem />
    </View>

  );
}

const styles = StyleSheet.create({
  container:{
    backgroundColor:"black",
    flex:1
    
  },
})

