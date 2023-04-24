import { View, Text } from 'react-native'
import React from 'react'

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TabNavigator from './TabNavigator'

import ChatScreen from '../screens/chatScreen';
import TextScreen from '../screens/textScreen';
import LoginScreen from '../screens/loginScreen';
import SignUpScreen from '../screens/signUpScreen';

const stack = createNativeStackNavigator(
    );

const Navigator =() =>{
  return (
    <NavigationContainer> 
        <stack.Navigator initialRouteName="Login">
            <stack.Screen 
            name = 'main'
            component = {TabNavigator}
            options = {{
              headerShown:false,
            }}
            />
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
            name = 'Text' 
            component={TextScreen} 
            options={{ 
              headerTitleAlign:"center",
              headerStyle:{backgroundColor:"black"},
              headerTitleStyle:{color:"white"},
              headerShadowVisible:false,
              headerTintColor:"white",
              }}/>
        </stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigator;