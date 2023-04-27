import { Text, View, Image, StyleSheet, Pressable, TouchableOpacity} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";



const LoadToken = () =>{
    const [token, setToken] = useState("")
    AsyncStorage.getItem('whatsthat_session_token').then(data => {
        if(data !== null){
            setToken(data)
        }
    }).catch(
        (error) => console.log(error)
    )
    return token
} 

const getContactImage = (contactID) =>{
    const [contactPhoto, setContactPhoto] = useState()
    const token = LoadToken();

    fetch("http://localhost:3333/api/1.0.0/user/" + contactID + "/photo", {
      method:'get',
      headers:{
        'X-authorization': token
      }
    })
    .then((response) => {
      if(response.status === 200){
        return response.blob()
      }else if(response.status === 401){
        throw '	Unauthorised'
      }else if(response.status === 404){
        throw 'Not Found'
      }else if(response.status === 500){
        throw 'Server Error'
      }
    })
    .then((rblob) => {
      let data = URL.createObjectURL(rblob)
      setContactPhoto(data)
      console.log("photo recieved")
    })
    .catch((err) =>{
      console.log(err)
    })

    return contactPhoto
  }


const ContactsItem = ({contact}) => {

    return (
      
        <Pressable style = {styles.container} onPress = {() => console.warn(contact.user_id)}>
            <View style = {styles.content}>
                <View style = {styles.row}>
                    <Text numberOfLines={1} style = {styles.name}>{contact.first_name} {contact.last_name}</Text>
                    <TouchableOpacity onPress={() => {console.warn("remove")}}>
                        <Text style = {styles.removeContact} >Remove Contact</Text>
                    </TouchableOpacity>
                    
                </View>
  
                <Text numberOfLines={1} style = {styles.subTitle}>{contact.email}</Text>
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
      removeContact: {
        color: 'red'
      }
    });

export default ContactsItem

  