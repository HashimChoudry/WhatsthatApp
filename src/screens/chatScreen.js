import { View, Text, FlatList } from "react-native";
import ListItem from "../components/chatListItem";

import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Component } from "react";
import { useState, useEffect } from "react";
import React from "react";
import { useFocusEffect } from "@react-navigation/native";

export default function ChatScreen (){
    const navigation = useNavigation();

    const [chat, setChats] = useState()

    const [token, setToken] = useState('')


    const LoadTokenID = () =>{
        AsyncStorage.getItem('whatsthat_session_token').then(data => {
            if(data !== null){
                setToken(data)
            }
        }).catch(
            (error) => console.log(error)
        )
    } 
    
    const checkLoggedIn = async() => {
        const value = await AsyncStorage.getItem('whatsthat_session_token')
        if (value === ""){
            navigation.navigate('Login')
        }
    }


    const loadChats = () => {

        return fetch('http://localhost:3333/api/1.0.0/chat',{
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
            }else if(response.status === 500){
            throw 'Server Error'
            }
        })
        .then((rjson) => {
            setChats(rjson)
        })
        .catch((err) => {
            console.log(err)
        })
        
    }

    useEffect(() => {
        LoadTokenID();
    },[])

    useFocusEffect(
        React.useCallback(() => {
          checkLoggedIn();
          loadChats();
        },[token])
    )

    return(

        <FlatList style= {{backgroundColor: "black"}}
        data = {chat}
        renderItem = {({item}) => <ListItem chat = {item} />}
        />

        

    );
};