import { View, Text, StyleSheet } from "react-native";
import { useState } from "react";

import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import React from "react";
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { Pressable } from "react-native";
import { Modal, TouchableOpacity, TouchableHighlight } from "react-native-web";
import { TextInput } from "react-native-web";

export default function Message({messages, messageDeleted, messageEdited}) {
    const [token, setToken] = useState()
    const [userId, setUserId] = useState(0)
    const [chatId, setChatId] = useState(0)
    const [modalVisible, setModalVisible] = useState(false)
    const [message,setMessage] = useState("")
    
    const loadTokenID = () => {
        AsyncStorage.getItem('whatsthat_session_token').then(data => {
            if(data !== null){
                setToken(data)
            }
        }).catch(
            (error) => console.log(error)
        )
        AsyncStorage.getItem('whatsthat_user_id').then(data => {
            if(data !== null){
                setUserId(data)
            }
        }).catch(
            (error) => console.log(error)
        )
        AsyncStorage.getItem('whatsthat_chat_id').then(data => {
            if(data !== null){
                setChatId(data)
            }
        }).catch(
            (error) => console.log(error)
        )
    }

    const isUsrMessage = () =>{
        return messages.author.user_id == userId
    }

    const deleteMessage = () => {
        return fetch("http://localhost:3333/api/1.0.0/chat/" + chatId + "/message/" + messages.message_id,{
            method: 'delete',
            headers:{   
                'X-authorization': token,
            }
        }).then ((response) => {
            if (response.status == 200) {
                return response.json()
            }else if (response.status == 401){
                throw 'Unauthorized'
            }else if (response.status == 403) {
                throw 'Forbidden'
            }else if (response.status == 404) {
                throw 'Not Found';
            }else if (response.status == 500){
                throw 'Server Error';
            }
        }).then((rjson) => {
            console.warn(rjson)
        }).catch((err) => {
            console.log(err)
        })
    }

    const updateMessage = (input) => {
        return fetch("http://localhost:3333/api/1.0.0/chat/" + chatId + "/message/" + messages.message_id,{
            method: 'PATCH',
            headers:{   
                'X-authorization': token,
                'Content-Type':'application/json',
            },
            body:JSON.stringify(input)
        }).then ((response) => {
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
        }).then((rjson) => {
            console.warn(rjson)
        }).catch((err) => {
            console.log(err)
        })
    }
    

    const deleteHandler =  () => {
        deleteMessage();
        messageDeleted();
    }

    const EditHandler = (input) =>{
        updateMessage(input)
        messageDeleted()
    }

    const time =  new Date(messages.timestamp).toLocaleTimeString('en-UK')

    const leftSwipe = () => {
        return(
          <Pressable style = {styles.deleteBox} onPress = {() => {deleteHandler()}}>
            <Text>Delete</Text>
          </Pressable>
        )
      }

    const rightSwipe = () => {
        return(
            <Pressable style = {styles.editBox} onPress={console.warn('editing')}>
                <Text>Edit Chat</Text>
            </Pressable>
        )
    }

    useEffect(()=>{
        loadTokenID()
    },[])

    return(
        <View>
            <Swipeable
            renderRightActions={isUsrMessage() ? leftSwipe: null}
            >
                <Pressable style = {[styles.container,{
                    backgroundColor:isUsrMessage() ? "#075E54" : "#2e2e2d",
                    alignSelf:isUsrMessage() ? "flex-end" : "flex-start"
                    } ]} onPress={() => {setModalVisible(true)}}>
                    <Text style = {{color:"white"}}>{messages.message}</Text>
                    <Text style = {styles.time}>{time}</Text>
                </Pressable>
            
            </Swipeable>
            <Modal
                transparent = {true}
                visible = {modalVisible}
                animationType = {"fade"}
            >
                <View style = {styles.modalContainer}>
                <View style = {styles.modalContent}>
                    <Text style = {styles.editText}>Edit Message</Text>
                    <TextInput
                    style = {styles.input}
                    placeholder={messages.message}
                    placeholderTextColor={'grey'}
                    value = {message}
                    onChangeText={setMessage}
                    />
                    <TouchableHighlight style = {styles.buttonContainer} onPress={()=>{let jsonMessage = {"message": message}; EditHandler(jsonMessage)}}>
                        <Text style = {{color:'white'}}>Edit Chat</Text>
                    </TouchableHighlight>
                    <TouchableHighlight style = {styles.buttonContainer} onPress={()=>{setModalVisible(false)}}>
                        <Text style = {{color:'white'}}>Go Away</Text>
                    </TouchableHighlight>
                </View>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        margin:5,
        padding:10,
        maxWidth:"80%",
        borderRadius:10,
        alignSelf:"flex-end",
        shadowColor: "#000000",
        shadowOffset: {
        width: 0,
        height: 3,
        },
        shadowOpacity:  0.18,
        shadowRadius: 4.59,
        elevation: 5
    },
    time:{
        color:"gray",
        alignSelf:"flex-end",
    },
    deleteBox: {
        backgroundColor:'red',
        justifyContent:'center',
        alignItems:'center',
        padding: 10,
        marginHorizontal: 15,
        marginVertical: 5,
        borderRadius: 10,
      },
    editBox: {
        backgroundColor:'#2e2e2d',
        justifyContent:'center',
        alignItems:'center',
        padding: 10,
        marginHorizontal: 15,
        marginVertical: 5,
        borderRadius: 10,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
      modalContent: {
        width: 400,
        height: 400,
        backgroundColor: '#2e2e2d',
        borderRadius:40,
        justifyContent: 'center',
        alignItems: 'center',
      },
      buttonContainer: {
        alignItems:"center",
        justifyContent:"flex-end",
        paddingVertical:12,
        paddingHorizontal:42,
        marginTop:10,
        marginBottom: 10,
        borderRadius:4,
        backgroundColor:'#075E54'
      },
      input: {
        fontSize:15,
        borderRadius: 50,
        borderWidth: StyleSheet.hairlineWidth,
        padding:10,
        marginBottom:10,
        height:30,
        borderColor: "lightgray",
        backgroundColor:'white',
    },
    editText: {
        fontSize:20,
        marginBottom:10,
        color:'white',
    },
})