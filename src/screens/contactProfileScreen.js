import { View, Text, Image, StyleSheet, TouchableOpacity, Modal, Button, TouchableHighlight, Alert } from "react-native";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TextInput } from "react-native-gesture-handler";



export default function ContactProfileScreen() {
  const [token, setToken] = useState('');
  const [contactID, setContactID] = useState();
  const [fname, setfname] = useState()
  const [sname, setsname] = useState()
  const [email, setEmail] = useState()
  const [contactImage, setContactImage] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [chatName, setChatName] = useState('')

  const navigation = useNavigation()

  const loadTokenContactID = () => {
    AsyncStorage.getItem('whatsthat_session_token').then(data => {
      if(data !== null){
          setToken(data)
      }
    }).catch(
        (error) => console.log(error)
    )
    AsyncStorage.getItem('whatsthat_contact_id').then(data => {
        if(data !== null){
            setContactID(data)
        }
    }).catch(
        (error) => console.log(error)
    )
  }

  const loadContactInfo = () => {
    return fetch("http://localhost:3333/api/1.0.0/user/" + contactID,{
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
  return fetch("http://localhost:3333/api/1.0.0/user/" + contactID + "/photo", {
      method:'get',
      headers:{
        'X-authorization': token
      }
    })
    .then((response) => {
      if(response.status === 200){
        return response.blob()
      }else if(response.status === 401){
        throw 'Unauthorised'
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

  const removeContact = () =>{
    return fetch("http://localhost:3333/api/1.0.0/user/" + contactID + "/contact",{
        method:'delete',
        headers:{
          'X-authorization':token
        }
      })
      .then((response) => {
        if(response.status === 200){
          return response.json()
        }else if(response.status === 400){
            throw 'cant remove yourself lol'
        }else if(response.status === 401){
          throw 'Unauthorised'
        }else if(response.status === 404){
          throw 'Not Found'
        }else if(response.status === 500){
          throw 'Server Error'
        }
      }).then(() =>{
        console.log('contact Deleted')
      })
      .catch((err) => {
        console.log(err)
      })
  
  }

  const blockUser = () =>{
    return fetch("http://localhost:3333/api/1.0.0/user/" + contactID + "/block",{
        method:'post',
        headers:{
          'X-authorization':token
        }
      })
      .then((response) => {
        if(response.status === 200){
          return 'Blocked'
        }else if(response.status === 400){
            throw 'cant block yourself lol'
        }else if(response.status === 401){
          throw 'Unauthorised'
        }else if(response.status === 404){
          throw 'Not Found'
        }else if(response.status === 500){
          throw 'Server Error'
        }
      }).then(() =>{
        console.log('contact Deleted')
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
          return response.json
        }else if (response.status === 400){
          throw 'Bad Request'
        }else if(response === 401){
          throw 'unauthorized'
        }else if(response === 500){
          throw 'server error'
        }
      }).then ((rjson) => {
        consosole.warn('created lol')
      }).catch((err) => {
        console,log(err)
      })
    }

  }

  const createNewChatHandler = (name) => {
    newChat(name)
    setModalVisible(false)
    navigation.navigate('main')
  }



  const removeHandler = () => {
    removeContact();
    navigation.navigate('main');
  }

  const blockHandler = () => {
    blockUser();
    navigation.navigate('main');
  }

  useEffect(() => {
    loadTokenContactID();
  },[])

  useEffect(() => {
    loadContactImage();
    loadContactInfo();
  },[contactID])



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
        <TouchableOpacity style = {styles.buttonContainer} onPress={() => {setModalVisible(true)}}>
                    <Text style = {{color:'white'}}>Create Chat</Text>
        </TouchableOpacity> 

        <TouchableOpacity style = {styles.buttonContainer} onPress={() => {blockHandler()}}>
                        <Text style = {{color:'white'}}>Block User</Text>
        </TouchableOpacity> 

        <TouchableOpacity style = {styles.buttonContainer} onPress={() => {removeHandler()}}>
                        <Text style = {{color:'white'}}>Remove User</Text>
        </TouchableOpacity> 
      </View>
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
  });
  