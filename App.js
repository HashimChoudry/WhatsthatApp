
import {Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import loginScreen from './src/screens/loginScreen';
import signUpScreen from './src/screens/signUpScreen';
const stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <stack.Navigator>
        <stack.Screen
        name = "loginScreen"
        component = {loginScreen}
        options = {{headerShown: false}} />
        <stack.Screen
        name = "signUpScreen"
        component={signUpScreen} />
      </stack.Navigator>
    </NavigationContainer>
  );
}


