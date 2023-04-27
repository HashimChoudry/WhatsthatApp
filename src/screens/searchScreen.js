import { Text, View, Image, StyleSheet, Pressable, FlatList, TextInput} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ContactsItem from "../components/contactsListItem";

const loadContacts = (searchInp) => {
    return fetch('http://localhost:3333/api/1.0.0/contacts',{
  method:'get',
  headers:{
    'X-authorization': token
  }
})
.then((response) => {
  if(response.status === 200){
    return response.json()
  } else if(response.status === 401){
    throw '	Unauthorised'
  }else if(response.status === 404){
    throw 'Not Found'
  }else if(response.status === 500){
    throw 'Server Error'
  }
})
.then((rjson) => {
  setUserData(rjson)
  console.log("user data Loaded")
})
.catch((err) => {
  console.log(err)
})
}

export default function SearchScreen() {

    const [userData, setUserData] = useState('')
    const [token, setToken] = useState("")
    const [userID, setUserID] = useState()

    const LoadTokenID = () =>{
        AsyncStorage.getItem('whatsthat_session_token').then(data => {
            if(data !== null){
                setToken(data)
            }
        }).catch(
            (error) => console.log(error)
        )
        AsyncStorage.getItem('whatsthat_user_id').then(data => {
            if(data !== null){
                setUserID(data)
            }
        }).catch(
            (error) => console.log(error)
        )
    } 

    const loadSearch = (searchInp) => {
        return fetch('http://localhost:3333/api/1.0.0/search?q='+searchInp+'&search_in=all&limit=20&offset=0',{
      method:'get',
      headers:{
        'X-authorization': token
      }
    })
    .then((response) => {
      if(response.status === 200){
        return response.json()
      } else if(response.status === 401){
        throw '	Unauthorised'
      }else if(response.status === 404){
        throw 'Not Found'
      }else if(response.status === 500){
        throw 'Server Error'
      }
    })
    .then((rjson) => {
      setUserData(rjson)
      console.log("user data Loaded")
    })
    .catch((err) => {
      console.log(err)
    })
    }

    useEffect(() => {
        LoadTokenID()
    },[])

    return (
        <View style={{backgroundColor: 'black'}}>
            <TextInput></TextInput>
            <FlatList style = {{backgroundColor: 'black'}}
            data = {userData}
            renderItem = {({item}) => <ContactsItem contact = {item} />}
            />
        </View>
        
    );
}