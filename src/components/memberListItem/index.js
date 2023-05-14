import { Text, View, Image, StyleSheet, Pressable, TouchableOpacity} from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { Swipeable } from "react-native-gesture-handler";


const setContactID = async (contactID) => {
    try{
        await AsyncStorage.setItem('whatsthat_contact_id', contactID)
    }catch{
        throw 'error with async'
    }
}

const MemberItem = ({member,isMem,memberEdit}) => {
    const navigation = useNavigation();
    const [token, setToken] = useState()
    const [userID, setUserID] = useState()
    const [chatId, setChatId] = useState()
    const [isntUsr,setIsntUsr] = useState(true)

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
      AsyncStorage.getItem('whatsthat_chat_id').then(data => {
        if(data !== null){
            setChatId(data)
        }
    }).catch(
        (error) => console.log(error)
    )
  } 

    const deleteMember = () => {
      if(member.user_id == userID){
        console.warn('Cant remove yourself')
        return null
      }else{
        return fetch('http://localhost:3333/api/1.0.0/chat/' + chatId + '/user/' + member.user_id,{
          method: 'DELETE',
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
      
    }

    const addMember = () => {
      if(member.user_id == userID){
        console.warn('Cant remove yourself')
        return null
      }else{
        return fetch('http://localhost:3333/api/1.0.0/chat/' + chatId + '/user/' + member.user_id,{
          method: 'POST',
            headers:{   
                'X-authorization': token,
            }
        }).then ((response) => {
            if (response.status == 200) {
                return response
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
      
    }
    const addHandler = () => {
      addMember()
      memberEdit(true)
    }

    const deleteHandler = () => {
      deleteMember()
      memberEdit(true)
    }

    const leftSwipeDelete = () => {
      return(
        <Pressable style = {styles.deleteBox} onPress = {() => {deleteHandler()}}>
          <Text>Delete</Text>
        </Pressable>
      )
    }

    const leftSwipeAdd= () => {
      return(
        <Pressable style = {styles.addBox} onPress = {() => {addHandler()}}>
          <Text>Add</Text>
        </Pressable>
      )
    }

    useFocusEffect(()=>{
      LoadTokenID()
    })


    return (
      <Swipeable
      renderLeftActions={isMem ? leftSwipeDelete : leftSwipeAdd}
      >
        <View style = {styles.container}>
            <View style = {styles.content}>
                <View style = {styles.row}>
                    <Text numberOfLines={1} style = {styles.name}>{member.first_name} {member.last_name}</Text>
                </View>
  
                <Text numberOfLines={1} style = {styles.subTitle}>{member.email}</Text>
            </View>
        </View>
      </Swipeable>
    )
  }
  
  const styles = StyleSheet.create({
      container: {
        flexDirection: "row",
        alignItems: "stretch",
        marginHorizontal: 15,
        marginVertical: 5,
        height: 70,
        backgroundColor:"black"
      },
      content: {
        flex: 1,
        borderBottomColor: "#232629",
        borderBottomWidth: StyleSheet.hairlineWidth,
      },
      row: {
        flexDirection: "row",
        marginBottom: 5,
      },
      name: {
        fontWeight: "bold",
        flex: 1,
        color:"white"
      },
      subTitle: {
        color: "grey",
      },
      deleteBox: {
        backgroundColor:'red',
        justifyContent:'center',
        alignItems:'center',
        padding: 10,
        marginHorizontal: 15,
        marginVertical: 5,
      },
      addBox: {
        backgroundColor:'#075E54',
        justifyContent:'center',
        alignItems:'center',
        padding: 10,
        marginHorizontal: 15,
        marginVertical: 5,
      },
    });

export default MemberItem