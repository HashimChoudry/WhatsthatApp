import { View, TextInput, Text, TouchableOpacity, StyleSheet} from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import MemberItem from "../components/memberListItem";
import { FlatList } from "react-native-gesture-handler";



export default function EditChatScreen () {
    const [token, setToken] = useState("")
    const [chatID, setChatID] = useState('')
    const [newName, setNewName] = useState('')
    const [memberData, setMemberData] = useState('')
    const [contactData, setContactData] = useState('')
    const [memberIDArr, setMemberIDArr] = useState()
    const [edited, setEdited] = useState(false)

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

    const loadChatMember = () => {
      return fetch('http://localhost:3333/api/1.0.0/chat/'+ chatID,{
      method:'get',
      headers:{
        'X-authorization': token
      }
    })
    .then((response) => {
      if(response.status === 200){
        setEdited(false)
        return response.json()
      } else if(response.status === 401){
        throw 'Unauthorised'
      }else if(response.status === 404){
        throw 'Not Found'
      }else if(response.status === 500){
        throw 'Server Error'
      }
    })
    .then((rjson) => {
      setMemberData(rjson.members)
      console.log("member data Loaded")
    })
    .catch((err) => {
      console.log(err)
    })
    };

    const loadContacts = () => {
        return fetch('http://localhost:3333/api/1.0.0/contacts',{
        method:'get',
        headers:{
          'X-authorization': token
        }
      })
      .then((response) => {
        if(response.status === 200){
          setEdited(false)
          return response.json()
        } else if(response.status === 401){
          throw 'Unauthorised'
        }else if(response.status === 404){
          throw 'Not Found'
        }else if(response.status === 500){
          throw 'Server Error'
        }
      })
      .then((rjson) => {
        setContactData(rjson)
        console.log("user data Loaded")
      })
      .catch((err) => {
        console.log(err)
      })
      }
    const memberEdit = (edited) => {
      if(edited){
        setEdited(true)
      }
    }


    useEffect(() => {
        LoadTokenID()
    },[]);

    useEffect(() => {
        loadChatMember();
        loadContacts();
    },[token])

    useEffect(() => {
      loadChatMember();
      loadContacts();
    },[edited])


    useEffect(() => {
      const memberIds = [];
      for (let i = 0; i <memberData.length;i++){
        memberIds.push(memberData[i].user_id)
      }
      setMemberIDArr(memberIds);
    }, [memberData]);

    return(
            <View style = {styles.container}>
                <TextInput
                placeholder="Change Chat Name..."
                placeholderTextColor={'grey'}
                style = {styles.input}
                value={newName}
                onChangeText={setNewName}
                />
                <TouchableOpacity style = {styles.buttonContainer} onPress={() => {loadChatMember()}}>
                    <Text style = {{color:'white'}}>Apply Change</Text>
                </TouchableOpacity>
                <Text style= {{color:'white', marginTop:10}}>Members</Text>
                <FlatList 
                data = {memberData}
                renderItem = {({item}) => <MemberItem member = {item} isMem={true} memberEdit={memberEdit}/>}
                />
                <Text style= {{color:'white',marginTop:10}}>Contacts</Text>
                <FlatList 
                data = {contactData}
                renderItem = {({item}) => memberIDArr.includes(item.user_id) ? null : <MemberItem member = {item} isMem={false} memberEdit={memberEdit}/>}
                />
                    
            </View>
            
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'black',
        paddingHorizontal: 20,
        paddingVertical: 10,
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
    buttonContainer: {
        alignItems:"center",
        justifyContent:"center",
        paddingVertical:12,
        paddingHorizontal:42,
        borderRadius:4,
        backgroundColor:'#075E54'
    }
})