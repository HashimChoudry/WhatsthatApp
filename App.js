
import {Text, View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './src/screens/loginScreen';
import SignUpScreen from './src/screens/signUpScreen';
import ChatScreen from './src/screens/chatScreen';



export default function App() {
  return (
    <View style = {styles.container}>
      <ChatScreen />
    </View>

  );
}

const styles = StyleSheet.create({
  container:{
    backgroundColor:"black",
    flex:1,

    
  },
})

