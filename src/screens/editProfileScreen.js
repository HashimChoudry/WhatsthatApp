import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput} from "react-native";
import { useState } from "react";
import { useEffect } from "react";
import React from "react";
import { useFocusEffect,useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";





export default function EditProfileScreen() {

  const [isLoading, setIsLoading] = useState(true)
  const [token, setToken] = useState("")
  const [userID, setUserID] = useState()
  const [photo, setPhoto] = useState()
  const [fname, setfname] = useState()
  const [sname, setsname] = useState()
  const [email, setEmail] = useState()
  const [pass,setPass] = useState()
  const [hasPermission,setHasPermission] = useState(null)

  const navigation = useNavigation()

  const getCameraPermission = async () => {
    console.warn('')
  }

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

  const loadUserPhoto = () =>{
    return fetch("http://localhost:3333/api/1.0.0/user/" + userID + "/photo", {
      method:'get',
      headers:{
        'X-authorization': token
      }
    })
    .then((response) => {
      if(response.status === 200){
        return response.blob()
      }else if(response.status === 401){
        throw '	Unauthorised'
      }else if(response.status === 404){
        throw 'Not Found'
      }else if(response.status === 500){
        throw 'Server Error'
      }
    })
    .then((rblob) => {
      let data = URL.createObjectURL(rblob)
      setPhoto(data)
      console.log("photo recieved")
    })
    .catch((err) =>{
      console.log(err)
    })
  }

  const loadUserData = () =>{
    return fetch("http://localhost:3333/api/1.0.0/user/" + userID,{
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
      }else if(response.status === 404){
        throw 'Not Found'
      }else if(response.status === 500){
        throw 'Server Error'
      }
    })
    .then((rjson) => {
      setfname(rjson.first_name)
      setsname(rjson.last_name)
      setEmail(rjson.email)
      console.log("user data Loaded")
    })
    .catch((err) => {
      console.log(err)
    })
  }

  const updateUserData =(input) => {
    fetch("http://localhost:3333/api/1.0.0/user/" + userID,{
        method:'PATCH',
        headers:{
            'X-authorization': token,
            'Content-Type':'application/json'
        },
        body:(JSON.stringify(input))
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

  const patchHandler = (input) => {
    updateUserData(input)
    loadUserData()
  }

  
  useEffect(() => {
    LoadTokenID();    
  },[])


  useFocusEffect(
    React.useCallback(() => {
      loadUserPhoto();
      loadUserData();

    },[token])
    )

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image 
          style={styles.image} 
          source={{ uri: photo }} 
        />
      </View>
      <TouchableOpacity style = {styles.buttonContainer} onPress = {() => {getCameraPermission()}}>
                    <Text style = {{color:'white'}}>Edit Name</Text>
        </TouchableOpacity> 
      <View style={styles.profileContainer}>
      <TextInput
        style = {styles.input} 
        placeholderTextColor= "grey"
        placeholder={fname}
        onChangeText={setfname}
        />
        <TouchableOpacity style = {styles.buttonContainer} onPress = {() => {let jsonFname = {'first_name':fname};patchHandler(jsonFname)}}>
                    <Text style = {{color:'white'}}>Edit Name</Text>
        </TouchableOpacity> 
        <TextInput
        style = {styles.input} 
        placeholderTextColor= "grey"
        placeholder={sname}
        onChangeText={setsname}
        />
        <TouchableOpacity style = {styles.buttonContainer} onPress = {() => {let jsonSname= {'last_name':sname};patchHandler(jsonSname)}}>
                    <Text style = {{color:'white'}}>Edit Last Name</Text>
        </TouchableOpacity> 
        <TextInput
        style = {styles.input} 
        placeholderTextColor= "grey"
        placeholder={email}
        onChangeText={setEmail}
        />
        <TouchableOpacity style = {styles.buttonContainer} onPress = {() => {let jsonEmail = {'email':email};patchHandler(jsonEmail)}}>
                    <Text style = {{color:'white'}}>Edit Email</Text>
        </TouchableOpacity> 
        <TextInput
        style = {styles.input} 
        placeholderTextColor= "grey"
        placeholder={'password'}
        onChangeText={setPass}
        secureTextEntry={true}
        />
        <TouchableOpacity style = {styles.buttonContainer} onPress = {() => {let jsonEmail = {'password':pass};patchHandler(jsonEmail)}}>
                    <Text style = {{color:'white'}}>Edit Password</Text>
        </TouchableOpacity> 
      </View>
      
    </View>
  );
};
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor:'black'
    },
    profileContainer: {
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: '#2e2e2d',
      borderRadius: 10,
      padding: 20,
    },

    imageContainer: {
      width: 80,
      height: 80,
      borderRadius: 40,
      overflow: 'hidden',
      marginBottom: 50,
    },
    image: {
      flex: 1,
      width: null,
      height: null,
    },
    infoContainer: {
      alignItems: 'center',
    },
    name: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 5,
      color: 'white',
    },
    status: {
      fontSize: 18,
      color: '#777',
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
        fontSize: 20,
        borderRadius: 50,
        borderWidth: StyleSheet.hairlineWidth,
        padding:10,
        marginBottom:5,
        height:25,
        borderColor: "lightgray",
        backgroundColor:'white'
    },
  });