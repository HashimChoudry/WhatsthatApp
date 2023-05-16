import { View, Text, FlatList, StyleSheet, TouchableOpacity, TextInput, TouchableHighlight} from "react-native";
import ListItem from "../components/chatListItem";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";
import React from "react";
import { useFocusEffect } from "@react-navigation/native";
import { Modal } from "react-native";


export default function ChatScreen (){
    const navigation = useNavigation();

    const [chat, setChats] = useState()
    const [token, setToken] = useState('')
    const [nameChange, setNameChange] = useState(false)
    const [modalVisible, setModalVisible] = useState(false);
    const [created, setCreated] = useState(false)
    const [chatName, setChatName] = useState("")


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
            setCreated(false)
            return response.json()
            } else if(response.status === 401){
            throw 'Unauthorised'
            }else if(response.status === 500){
            throw 'Server Error'
            }
        })
        .then((rjson) => {
            setChats(rjson)
            setNameChange(false)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    const newChat = (name) => {
        if (name !== ''){
          let jsonName = {
            "name": name
          }
          jsonName = JSON.stringify(jsonName)
          return fetch('http://localhost:3333/api/1.0.0/chat', {
            method:'post',
            headers:{
              'X-authorization': token,
              'Content-Type': 'application/json',
            },
            body:jsonName
          }).then((response) =>{
            if(response.status === 201){
              setCreated(true)
              return response.json
            }else if (response.status === 400){
              throw 'Bad Request'
            }else if(response === 401){
              throw 'unauthorized'
            }else if(response === 500){
              throw 'server error'
            }
          }).then ((rjson) => {
            console.warn('created' + rjson)
          }).catch((err) => {
            console.log(err)
          })
        }
      }

      const createNewChatHandler = (name) => {
        newChat(name)
        setModalVisible(false)
      }

    useEffect(() => {
        LoadTokenID();
    }, [])

    useFocusEffect(
        React.useCallback(() => {
          checkLoggedIn();
          loadChats();
        },[token])
    )

    useEffect(()=>{
        loadChats()
    },[created])


    return(
        <View style = {styles.container}>
            <TouchableOpacity style = {styles.buttonContainer} onPress={() => {setModalVisible(true)}}>
                        <Text style = {{color:'white'}}>Create Chat</Text>
            </TouchableOpacity> 
            <FlatList style= {{backgroundColor: "black"}}
            data = {chat}
            renderItem = {({item}) => <ListItem chat = {item} />}
            />
            <Modal
                transparent = {true}
                visible = {modalVisible}
                animationType = {"fade"}
            >
                <View style = {styles.modalContainer}>
                <View style = {styles.modalContent}>
                    <TextInput
                    style = {styles.input}
                    placeholder="Enter Chat Name..."
                    placeholderTextColor={'grey'}
                    value = {chatName}
                    onChangeText={setChatName}
                    />
                    <TouchableHighlight style = {styles.buttonContainer} onPress={()=>{createNewChatHandler(chatName)}}>
                    <Text style = {{color:'white'}}>Create Chat</Text>
                    </TouchableHighlight>
                    <TouchableHighlight style = {styles.buttonContainer} onPress={()=>{setModalVisible(false)}}>
                    <Text style = {{color:'white'}}>Go Away</Text>
                    </TouchableHighlight>
                </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'black'
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
    
})