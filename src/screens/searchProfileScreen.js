import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";



export default function SearchedProfileScreen() {
  const [token, setToken] = useState('');
  const [searchedID, setSearchedID] = useState();
  const [fname, setfname] = useState()
  const [sname, setsname] = useState()
  const [email, setEmail] = useState()
  const [contactImage, setContactImage] = useState();

  const loadTokenSearchedID = () => {
    AsyncStorage.getItem('whatsthat_session_token').then(data => {
      if(data !== null){
          setToken(data)
      }
    }).catch(
        (error) => console.log(error)
    )
    AsyncStorage.getItem('whatsthat_contact_id').then(data => {
        if(data !== null){
            setSearchedID(data)
        }
    }).catch(
        (error) => console.log(error)
    )
  }

  const loadContactInfo = () => {
    return fetch("http://localhost:3333/api/1.0.0/user/" + searchedID,{
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
      console.log("contact data Loaded")
    })
    .catch((err) => {
      console.log(err)
    })
  }

const loadContactImage = () => {
  return fetch("http://localhost:3333/api/1.0.0/user/" + searchedID + "/photo", {
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
      setContactImage(data)
      console.log("photo recieved")
    })
    .catch((err) =>{
      console.log(err)
    })
  }

  const AddContact=(contactID) =>{
    return fetch("http://localhost:3333/api/1.0.0/user/" + contactID + "/contact", {
        method:'post',
        headers: {
            'X-authorization' : token
        }
        }).then((response) => {
            if(response.status === 200){
                return response.json()
              }else if (response.status === 400){
                return 'cant add yourself LOL'
              }else if(response.status === 401){
                throw '	Unauthorised'
              }else if(response.status === 404){
                throw 'Not Found'
              }else if(response.status === 500){
                throw 'Server Error'
              }
        }).then((responsejson) => {
            console.log('userAdded:'+ responsejson)
        }).catch((err) =>{
            console.log(err)
        })
  }


  useEffect(() => {
    loadTokenSearchedID();
  },[])

  useEffect(() => {
    loadContactImage();
    loadContactInfo();
  },[searchedID])



  return (
    
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image 
          style={styles.image} 
          source={{ uri: contactImage }} 
        />
      </View>
      <View style={styles.profileContainer}>
        <Text style={styles.name}>{fname}</Text>
        <Text style={styles.name}>{sname}</Text>
        <Text style={styles.name}>{email}</Text>

        <TouchableOpacity style = {styles.buttonContainer} onPress = {() => {AddContact(searchedID)}}>
                        <Text style = {{color:'white'}}>Add User</Text>
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
      marginBottom: 20,
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

  });
  