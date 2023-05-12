import { Text, View, Image, StyleSheet, Pressable, TouchableOpacity} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";


const setUserID = async (contactID) => {
    try{
        await AsyncStorage.setItem('whatsthat_contact_id', contactID)
    }catch{
        throw 'error with async'
    }
}

const chatListMember = ({member}) => {
    const navigation = useNavigation();

    const pressContact = () => {
        setUserID(contact.user_id);
    }

    return (
      <Pressable style = {styles.container} onPress = {() => pressContact()}>
          <View style = {styles.content}>
              <View style = {styles.row}>
                  <Text numberOfLines={1} style = {styles.name}>{member.first_name} {member.last_name}</Text>
              </View>

              <Text numberOfLines={1} style = {styles.subTitle}>{member.email}</Text>
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

export default chatListMember