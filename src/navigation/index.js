/* eslint-disable react/jsx-filename-extension */
import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TabNavigator from './TabNavigator';

import TextScreen from '../screens/textScreen';
import LoginScreen from '../screens/loginScreen';
import SignUpScreen from '../screens/signUpScreen';
import ContactScreen from '../screens/contactProfileScreen';
import BlockedScreen from '../screens/blockedScreen';
import BlockedProfileScreen from '../screens/blockedProfileScreen';
import SearchProfileScreen from '../screens/searchProfileScreen';
import EditChatScreen from '../screens/editChatScreen';
import EditProfileScreen from '../screens/editProfileScreen';
import CameraScreen from '../screens/cameraScreen';
import DraftScreen from '../screens/draftScreen';

const stack = createNativeStackNavigator();

function Navigator() {
  return (
    <NavigationContainer>
      <stack.Navigator initialRouteName="Login">
        <stack.Screen
          name="main"
          component={TabNavigator}
          options={{
            headerShown: false,
          }}
        />
        <stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            headerShown: false,
          }}
        />
        <stack.Screen
          name="Signup"
          component={SignUpScreen}
          options={{
            headerTitleAlign: 'center',
            headerStyle: { backgroundColor: '#2e2e2d' },
            headerTitleStyle: { color: 'white' },
            headerShadowVisible: false,
            headerTintColor: 'white',
          }}
        />
        <stack.Screen
          name="Text"
          component={TextScreen}
          options={{
            headerTitleAlign: 'center',
            headerStyle: { backgroundColor: 'black' },
            headerTitleStyle: { color: 'white' },
            headerShadowVisible: false,
            headerTintColor: 'white',
          }}
        />
        <stack.Screen
          name="Contact Profile"
          component={ContactScreen}
          options={{
            headerTitleAlign: 'center',
            headerStyle: { backgroundColor: 'black' },
            headerTitleStyle: { color: 'white' },
            headerShadowVisible: false,
            headerTintColor: 'white',
          }}
        />
        <stack.Screen
          name="Blocked"
          component={BlockedScreen}
          options={{
            headerTitleAlign: 'center',
            headerStyle: { backgroundColor: 'black' },
            headerTitleStyle: { color: 'white' },
            headerShadowVisible: false,
            headerTintColor: 'white',
          }}
        />
        <stack.Screen
          name="Blocked Profile"
          component={BlockedProfileScreen}
          options={{
            headerTitleAlign: 'center',
            headerStyle: { backgroundColor: 'black' },
            headerTitleStyle: { color: 'white' },
            headerShadowVisible: false,
            headerTintColor: 'white',
          }}
        />
        <stack.Screen
          name="Search Profile"
          component={SearchProfileScreen}
          options={{
            headerTitleAlign: 'center',
            headerStyle: { backgroundColor: 'black' },
            headerTitleStyle: { color: 'white' },
            headerShadowVisible: false,
            headerTintColor: 'white',
          }}
        />
        <stack.Screen
          name="Edit Chats"
          component={EditChatScreen}
          options={{
            headerTitleAlign: 'center',
            headerStyle: { backgroundColor: 'black' },
            headerTitleStyle: { color: 'white' },
            headerShadowVisible: false,
            headerTintColor: 'white',
          }}
        />
        <stack.Screen
          name="Edit Profile"
          component={EditProfileScreen}
          options={{
            headerTitleAlign: 'center',
            headerStyle: { backgroundColor: 'black' },
            headerTitleStyle: { color: 'white' },
            headerShadowVisible: false,
            headerTintColor: 'white',
          }}
        />
        <stack.Screen
          name="Camera"
          component={CameraScreen}
          options={{
            headerTitleAlign: 'center',
            headerStyle: { backgroundColor: 'black' },
            headerTitleStyle: { color: 'white' },
            headerShadowVisible: false,
            headerTintColor: 'white',
          }}
        />
        <stack.Screen
          name="Drafts"
          component={DraftScreen}
          options={{
            headerTitleAlign: 'center',
            headerStyle: { backgroundColor: 'black' },
            headerTitleStyle: { color: 'white' },
            headerShadowVisible: false,
            headerTintColor: 'white',
          }}
        />
      </stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigator;
