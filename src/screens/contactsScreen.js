import { Text, View, Image, StyleSheet, Pressable, FlatList} from "react-native";
import { useEffect, useState } from "react";
import React from "react";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ContactsItem from "../components/contactsListItem";


export default function ContactsScreen() {
    const [userData, setUserData] = useState('')
    const [token, setToken] = useState("")


    const LoadTokenID = () =>{
        AsyncStorage.getItem('whatsthat_session_token').then(data => {
            if(data !== null){
                setToken(data)
            }
        }).catch(
            (error) => console.log(error)
        )
    } 

    const loadContacts = () => {
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

    

    useEffect(() => {
        LoadTokenID()
      },[])


    useFocusEffect(
      React.useCallback(() => {
        loadContacts();
      },[token])
      )

      

    return (
        <FlatList style = {{backgroundColor: 'black'}}
        data = {userData}
        renderItem = {({item}) => <ContactsItem contact = {item} />}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      name: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
      },
      email: {
        fontSize: 16,
        marginBottom: 8,
      },
      phone: {
        fontSize: 16,
      },
      loading: {
        fontSize: 16,
        fontStyle: 'italic',
      },
  });
  