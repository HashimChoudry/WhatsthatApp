import { View, TextInput, ImageBackground, StyleSheet, FlatList, KeyboardAvoidingView, Platform, Button, TouchableOpacity} from "react-native";
import { useRoute,useNavigation, useFocusEffect } from "@react-navigation/native";
import {AntDesign, MaterialIcons} from "@expo/vector-icons"

import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";

import DarkBG from "../../assets/images/DarkBG.png"
import Message from "../components/Message";


export default function TextScreen (){
    const route = useRoute();
    const navigation = useNavigation();
    const [chatId, setChatId] = useState('');
    const [chatData, setChatData] = useState("");
    const [token, setToken] = useState('');
    const [message, setMessage] = useState('');
    const [sent, setSent] = useState(false)
    const [msgDelete, setMsgDelete] = useState(false)

    const getTokenChatID = () =>{
        AsyncStorage.getItem('whatsthat_chat_id').then(data => {
            if(data !== null){
                setChatId(data)
            }
        }).catch(
            (error) => console.log(error)
        )
        AsyncStorage.getItem('whatsthat_session_token').then(data => {
            if(data !== null){
                setToken(data)
            }
        }).catch(
            (error) => console.log(error)
        )
    }

    const loadChatData = () => {
        return fetch('http://localhost:3333/api/1.0.0/chat/' + chatId,{
            method:'get',
            headers:{
            'X-authorization': token
            }
            })
            .then((response) => {
                if(response.status === 200){
                 return response.json()
                } else if(response.status === 401){
                 throw 'Unauthorised'
                }else if(response.status === 500){
                 throw 'Server Error'
                }
            })
            .then((rjson) => {
                setChatData(rjson);
                setSent(false);
                setMsgDelete(false)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const sendMessage = (Text) => {
        if (Text != '' || Text !=' '){
            let jsonMessage = {
                message:Text
            }

            return fetch('http://localhost:3333/api/1.0.0/chat/' + chatId + '/message', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'X-authorization':token
                },
                body:(JSON.stringify(jsonMessage))
            }).then((response) => {
                if (response.status == 200) {
                    return response.json()
                }else if (response.status == 400) {
                    throw 'bad request'
                }else if (response.status == 401){
                    throw 'Unauthorized'
                }else if (response.status == 403) {
                    throw 'Forbidden'
                }else if (response.status == 404) {
                    throw 'Not Found';
                }else if (response.status == 500){
                    throw 'Server Error';
                }
            }).then((rJson) => {
                console.log(rJson);
            }).catch((err) => {
                console.log(err);
            })
        }
    }

    const sendHandler = () => {
        setMessage('');
        sendMessage(message);
        setSent(true);
    }

    const messageDeleted = () =>{
        setMsgDelete(true);
    }

   useFocusEffect(
    React.useCallback(() => {
      getTokenChatID();
    },[])
    )

    useFocusEffect(
        React.useCallback(() => {
          navigation.setOptions({
            title:chatData.name,
          })
        },[chatData])
    )
    
   useFocusEffect(
        React.useCallback(() => {
        loadChatData();
        },[token])
    )

    useFocusEffect(
        React.useCallback(() => {
            if(sent || msgDelete){
                loadChatData();
            }
        },[sent,msgDelete])
    )

    return(
        <KeyboardAvoidingView behavior={Platform.OS === "android" ? "padding":"height"} style = {styles.bg}>
            <ImageBackground source={DarkBG} style = {styles.bg}>
                <FlatList
                data = {chatData.messages}
                renderItem = {({item}) => <Message messages = {item} messageDeleted = {messageDeleted}/>}
                inverted
                />
                 <View style = {styles.container}>
                    <TextInput
                    style = {styles.input}
                    placeholderTextColor={"white"}
                    placeholder="Enter Your Message.. "
                    value = {message}
                    onChangeText = {setMessage}
                    />
                    <MaterialIcons 
                    style = {styles.send}
                    name = "send"
                    size = {20}
                    color = {"white"}
                    onPress = {sendHandler}
                    />
                </View>
            </ImageBackground>
        </KeyboardAvoidingView>


    );
};

const styles = StyleSheet.create({
    bg:{
        flex:1,
    },
    list:{
        padding:10,
        
    },
    container: {
        flexDirection: "row",
        backgroundColor: "#242322",
        alignItems:"center",
        justifyContent: 'flex-end',
        padding: 5,
    },
    input: {
        fontSize: 15,
        backgroundColor: "#2e2e2d",
        flex: 1,
        borderRadius: 50,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: "gray",
        padding: 5,
        paddingHorizontal: 10,
        marginHorizontal: 10,
        color: "white",
    },
    send:{
        backgroundColor:"royalblue",
        borderRadius:15,
        overflow:"hidden",
        padding:5,
    },
})