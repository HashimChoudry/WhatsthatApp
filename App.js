import {Text, View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './src/screens/loginScreen';
import SignUpScreen from './src/screens/signUpScreen';
import ChatScreen from './src/screens/chatScreen';
import TextScreen from './src/screens/textScreen';
import contactsScreen from "./src/screens/contactsScreen";
import ProfileScreen from "./src/screens/profileScreen";

import Navigator from './src/navigation/index/'


export default function App() {
  return (
    <View style = {styles.container}>
      <Navigator></Navigator>

    </View>

  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,    
  },
  
})

