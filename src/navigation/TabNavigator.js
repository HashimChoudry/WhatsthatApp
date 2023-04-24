import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import ChatScreen from '../screens/chatScreen';
import ContactsScreen from "../screens/contactsScreen";
import ProfileScreen from "../screens/profileScreen"


const Tab = createBottomTabNavigator();

const TabNavigator = () =>{
    return(
        <Tab.Navigator initialRouteName = 'Chat'>
            <Tab.Screen 
            name = 'contacts'
            component = {ContactsScreen}
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
            <Tab.Screen name = 'profile' component = {ProfileScreen}/>
              
        </Tab.Navigator>
    )
}

export default TabNavigator