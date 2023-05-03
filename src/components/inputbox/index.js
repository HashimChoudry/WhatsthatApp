import { View, Text, StyleSheet, TextInput} from "react-native";
import {AntDesign, MaterialIcons} from "@expo/vector-icons"
import { useState } from "react";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function Inputbox() {
    const [message, setMessage] = useState('');
    const [token, setToken] = useState();
    const [chatID, setChatID] = useState()

    const loadTokenID = () => {
        AsyncStorage.getItem('whatsthat_session_token').then(data => {
            if(data !== null){
                setToken(data)
            }
        }).catch(
            (error) => console.log(error)
        )
        AsyncStorage.getItem('whatsthat_chat_id').then(data => {
            if(data !== null){
                setChatID(data)
            }
        }).catch(
            (error) => console.log(error)
        )
    }


    const sendMessage = () =>{
        const jsonMessage = {
            message:message
        }
        setMessage('')
        if(!jsonMessage.message ==''){
            return fetch("http://localhost:3333/api/1.0.0/chat/" + chatID + '/message', {
                method:'post',
                headers:{
                    'Content-Type':'application/json',
                    'X-authorization': token
                },
                body:(JSON.stringify(jsonMessage))
            })
            .then((Response) => {
                if(Response.status == 200){
                    return Response.json()
                }else if (Response.status == 400){
                    throw'failed validation'
                }else if (Response.status == 401){
                    throw'Unauthorized'
                }else if (Response.status == 403){
                    throw'Forbidden'
                }else if (Response.status == 404){
                    throw'Not Found'
                }else if (Response.status == 500){
                    throw'Server Error'
                }else{
                    throw'something went wrong'
                }
            })
            .then((responseJson) => {
                console.warn(responseJson.json());
            })
            .catch((error) => {
                console.log(error);
            })
        }  
    }

    const sendHandler = async () => {
        
        sendMessage();
        
    }

    useEffect(() => {
      loadTokenID()
    
    }, [])

    

    return(
        
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
            onPress = {sendMessage}
            />
        </View>
    );
};

const styles = StyleSheet.create({
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
});