import { View, Text, FlatList } from "react-native";
import ListItem from "../components/chatListItem";
import chats from '../../assets/data/chats.json'
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Component } from "react";
import { useState, useEffect } from "react";

export default function ChatScreen (){
    const navigation = useNavigation();

    const [chat, sethats] = useState()
    const [isLoading,setIsLoading] = useState(true)

    const [token, setToken] = useState('')
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
    
    const checkLoggedIn = async() => {
        const value = await AsyncStorage.getItem('whatsthat_session_token')
        if (value === ""){
            navigation.navigate('Login')
        }
    }


    const get_chats = () => {
        return fetch("http://localhost:3333/api/1.0.0/chat",{
            method:'get',
            headers:{
                'X-Authorization':token
            }
        })
        .then((response) => {
            if(response.status === 200){
                return response.json()
            }else if(response.status === 401){
                throw 'Not Authenticated'
            }else if(response.status === 500){
                throw 'server error'
            }
        })
        .then((rjson) => {
            setMessages(rjson.messages)
            console.log('messages received')
        })
        .catch((err) =>{
            console.log(err)
        })
    }

    LoadTokenID();
    checkLoggedIn();
  
    return(

        <FlatList style= {{backgroundColor: "black"}}
        data = {chats}
        renderItem = {({item}) => <ListItem chat = {item} />}
        />

        

    );
};