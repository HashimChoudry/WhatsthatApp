import { Text, View, Image, StyleSheet, Pressable} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Swipeable from 'react-native-gesture-handler/Swipeable';

const ListItem = ({chat}) => {
  const navigation = useNavigation();
  let time = new Date(chat.last_message.timestamp).toLocaleTimeString('en-UK')

  const setChatID = async() => {
    try{
      await AsyncStorage.setItem('whatsthat_chat_id', chat.chat_id);
  }catch{
      throw 'error with async';
  }
  }

  const chatNavigationHandler = () => {
    setChatID();
    navigation.navigate('Text')
  }

 

  return (
    <Pressable style = {styles.container} onPress = {() => {chatNavigationHandler(chat.chat_id)}}>
        <View style = {styles.content}>

            <View style = {styles.row}>
                <Text numberOfLines={1} style = {styles.name}>{chat.name}</Text>
                <Text style = {styles.subTitle} >{time}</Text>
                
            </View>

            <Text numberOfLines={2} style = {styles.subTitle}>{chat.last_message.author.first_name}: {chat.last_message.message}</Text>
        </View>
    </Pressable>
)
}

const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "stretch",
      marginHorizontal: 15,
      marginVertical: 5,
      height: 70,
      backgroundColor:"black"
    },
    image: {
      width: 70,
      borderRadius: 35,
      marginRight: 10,
    },
    content: {
      flex: 1,
      borderBottomColor: "#232629",
      borderBottomWidth: StyleSheet.hairlineWidth,
    },
    row: {
      flexDirection: "row",
      marginBottom: 5,
    },
    name: {
      fontWeight: "bold",
      flex: 1,
      color:"white"
    },
    subTitle: {
      color: "grey",
    },
  });


export default ListItem;