import { View, Text } from 'react-native'
import React from 'react'

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import chatScreen from '../screens/chatScreen';
import textScreen from '../screens/textScreen';
import LoginScreen from '../screens/loginScreen';
import SignUpScreen from '../screens/signUpScreen';

const stack = createNativeStackNavigator(
    );

export default function Navigator() {
  return (
    <NavigationContainer > 
        <stack.Navigator>
            <stack.Screen 
            name = 'Login' 
            component={LoginScreen} 
            options ={{
              headerShown:false,
            }}
            />
            <stack.Screen 
            name = 'Signup' 
            component ={SignUpScreen}
            options ={{
              
            }}
            />
            <stack.Screen 
            name = 'Chat' 
            component={chatScreen} 
            options={{
              title: "Chats", 
              headerTitleAlign:"center",
              headerStyle:{backgroundColor:"black"},
              headerTitleStyle:{color:"white"},
              headerShadowVisible:false}}/>
            <stack.Screen 
            name = 'Text' 
            component={textScreen} 
            options={{ 
              headerTitleAlign:"center",
              headerStyle:{backgroundColor:"black"},
              headerTitleStyle:{color:"white"},
              headerShadowVisible:false}}/>
        </stack.Navigator>
    </NavigationContainer>
  )
}