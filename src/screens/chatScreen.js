import { View, Text, FlatList } from "react-native";
import ListItem from "../components/chatListItem";
import chats from '../../assets/data/chats.json'
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Component } from "react";
import { useState, useEffect } from "react";
import React from "react";
import { useFocusEffect } from "@react-navigation/native";

export default function ChatScreen (){
    const navigation = useNavigation();

    const [chat, setchats] = useState()

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
        return fetch
    }

    useEffect(() => {
        LoadTokenID();
    },[])

    useFocusEffect(
        React.useCallback(() => {
          checkLoggedIn();
        },[token])
    )



    return(

        <FlatList style= {{backgroundColor: "black"}}
        data = {chats}
        renderItem = {({item}) => <ListItem chat = {item} />}
        />

        

    );
};