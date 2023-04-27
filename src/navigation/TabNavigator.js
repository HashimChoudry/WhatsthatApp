import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import ChatScreen from '../screens/chatScreen';
import ContactsScreen from "../screens/contactsScreen";
import ProfileScreen from "../screens/profileScreen"
import SearchScreen from '../screens/searchScreen';


const Tab = createBottomTabNavigator();

const TabNavigator = () =>{
    return(
        <Tab.Navigator initialRouteName = 'Chat' activeBackgroundcolor = 'black'>
            <Tab.Screen 
            name = 'contacts'
            component = {ContactsScreen}
            options={{
                title: "Contacts", 
                headerTitleAlign:"center",
                headerStyle:{backgroundColor:"black"},
                headerTitleStyle:{color:"white"},
                headerShadowVisible:false,
                headerLeft:null,
                }}
            />
            <Tab.Screen 
            name = 'Chat' 
            component={ChatScreen} 
            options={{
              title: "Chats", 
              headerTitleAlign:"center",
              headerStyle:{backgroundColor:"black"},
              headerTitleStyle:{color:"white"},
              headerShadowVisible:false,
              headerLeft:null,
              }}/> 
            <Tab.Screen
            name = 'profile'
            component = {ProfileScreen}
            options={{
                title: "Profile", 
                headerTitleAlign:"center",
                headerStyle:{backgroundColor:"black"},
                headerTitleStyle:{color:"white"},
                headerShadowVisible:false,
                headerLeft:null,
                }}
            />
            <Tab.Screen 
            name = 'Search'
            component= {SearchScreen}
            options={{
                title: "Search", 
                headerTitleAlign:"center",
                headerStyle:{backgroundColor:"black"},
                headerTitleStyle:{color:"white"},
                headerShadowVisible:false,
                headerLeft:null,
                }}
            />
              
        </Tab.Navigator>
    )
}

export default TabNavigator