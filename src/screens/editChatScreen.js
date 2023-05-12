import { View, TextInput, Text, TouchableOpacity, StyleSheet} from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import chatListMember from "../components/AddChatListItem";
import { FlatList } from "react-native-gesture-handler";


export default function EditChatScreen () {
    const [token, setToken] = useState("")
    const [chatID, setChatID] = useState('')
    const [newName, setNewName] = useState('')
    const [memberData, setMemberData] = useState('')

    const LoadTokenID = () =>{
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

    const sendName= (name) => {
        let jsonName = {
            'name': name
        }
        console.warn(jsonName)
        return fetch('http://localhost:3333/api/1.0.0/chat/' + chatID,{
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'X-authorization':token
            },
            body:(JSON.stringify(jsonName))
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
            console.log('updated'+rJson);
        }).catch((err) => {
            console.log(err);
        })
    } 

    useFocusEffect(() => {
        LoadTokenID()
    })

    return(
        <View style = {styles.container}>
            <TextInput
            placeholder="Change Chat Name..."
            placeholderTextColor={'grey'}
            style = {styles.input}
            value={newName}
            onChangeText={setNewName}
            />
            <TouchableOpacity style = {styles.buttonContainer} onPress={() => {sendName(newName)}}>
                <Text style = {{color:'white'}}>Apply Change</Text>
            </TouchableOpacity>
            <FlatList style = {{backgroundColor: 'black'}}
              data = {searchData}
              renderItem = {({item}) => <SearchedItem contact = {item} />}
              />
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
    },
    input: {
        fontSize:15,
        borderRadius: 50,
        borderWidth: StyleSheet.hairlineWidth,
        padding:10,
        marginBottom:10,
        height:30,
        borderColor: "lightgray",
    },
    buttonContainer: {
        alignItems:"center",
        justifyContent:"center",
        paddingVertical:12,
        paddingHorizontal:42,
        borderRadius:4,
        backgroundColor:'#075E54'
    }
})