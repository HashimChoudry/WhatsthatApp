import { View, TextInput, Text, TouchableOpacity, StyleSheet} from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { FlatList } from "react-native-gesture-handler";
import DraftItem from "../components/draftItem";
import { Button } from "react-native";

export default function DraftScreen() {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [drafts, setDrafts] = useState(null);
  const [draftDeleted, setDraftDeleted] = useState(false)

  const LoadTokenIDdrafts = () =>{
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
    AsyncStorage.getItem('Drafts').then(data => {
        if(data !== null){
          setDrafts(JSON.parse(data))
          setDraftDeleted(false)
        }
      }).catch(
        (error) => console.log(error)
      )
  }

  const deleted = () => {
    setDraftDeleted(true)
  }

  useEffect(()=>{
    LoadTokenIDdrafts()
  },[])

  useEffect(()=> {
    console.warn(drafts)
  },[token])

  useEffect(()=> {
    LoadTokenIDdrafts()
  },[draftDeleted])

  return(
        <FlatList style = {{backgroundColor: 'black'}}
        data = {drafts}
        renderItem = {({item}) => <DraftItem draft = {item} token={token} draftArr={drafts} deleted = {deleted}/>}
        />
  )
}