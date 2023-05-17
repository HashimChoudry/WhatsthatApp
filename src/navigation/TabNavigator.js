/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/jsx-filename-extension */
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Ionicons } from '@expo/vector-icons';

import ChatScreen from '../screens/chatScreen';
import ContactsScreen from '../screens/contactsScreen';
import ProfileScreen from '../screens/profileScreen';
import SearchScreen from '../screens/searchScreen';

const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          paddingHorizontal: 5,
          paddingTop: 0,
          backgroundColor: 'black',
          position: 'absolute',
          borderTopWidth: 0,
        },
      }}
      initialRouteName="Chat"
    >
      <Tab.Screen
        name="contacts"
        component={ContactsScreen}
        options={{
          title: 'Contacts',
          headerTitleAlign: 'center',
          headerStyle: { backgroundColor: 'black' },
          headerTitleStyle: { color: 'white' },
          headerShadowVisible: false,
          headerLeft: null,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="body-sharp" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          title: 'Chats',
          headerTitleAlign: 'center',
          headerStyle: { backgroundColor: 'black' },
          headerTitleStyle: { color: 'white' },
          headerShadowVisible: false,
          headerLeft: null,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ios-chatbubbles-sharp" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'Profile',
          headerTitleAlign: 'center',
          headerStyle: { backgroundColor: 'black' },
          headerTitleStyle: { color: 'white' },
          headerShadowVisible: false,
          headerLeft: null,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="logo-whatsapp" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          title: 'Search',
          headerTitleAlign: 'center',
          headerStyle: { backgroundColor: 'black' },
          headerTitleStyle: { color: 'white' },
          headerShadowVisible: false,
          headerLeft: null,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default TabNavigator;
