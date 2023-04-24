import React from "react";
import {Text, View, Button, TextInput, StyleSheet, TouchableOpacity, Pressable, ImageBackground} from 'react-native';
import { useNavigation } from "@react-navigation/native";
import DarkBG from "../../assets/images/DarkBG.png"
import { useState } from "react";
import { Validator } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function LoginScreen () {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');




    const navigation = useNavigation();
    const validator = require('validator');

    const checkLoggedIn = async() => {
        const value = await AsyncStorage.getItem('whatsthat_session_token')
        if (value != null){
            navigation.navigate('main')
        }
    }

    const sendData = () =>{
        console.warn(validator.isEmail(email));

        let to_send ={
            "email":email,
            "password":password,
        }
        console.warn(JSON.stringify(to_send));

        setEmail("");
        setPassword("");
    }

    const Login = () =>{
        let to_send ={
            "email":email,
            "password":password,
        }
        console.warn(JSON.stringify(to_send));

        return fetch("http://localhost:3333/api/1.0.0/login",{
            method:'post',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(to_send)
        })
        .then((response) => {
            if (response.status === 200){
                return response.json();
            }else if (response === 400){
                throw 'invalid password or email';
            }else if (response === 500){
                throw 'Server Error';
            }else {
                throw 'something went wrong'
            }
        })
        .then(async (responseJson) =>{
            try{
                await AsyncStorage.setItem('whatsthat_user_id', responseJson.id)
                await AsyncStorage.setItem('whatsthat_session_token', responseJson.token);              
                navigation.navigate('main')
            }catch{
                throw 'something went wrong'
            }

        })
        .catch ((error) => {
            console.log(error)
        })

    }


    checkLoggedIn();
    return(
        <View style= {styles.container}>
            <View>
                

                <TextInput
                    style = { styles.input} 
                    placeholder = {"Email"} 
                    placeholderTextColor= "grey"
                    value ={email}
                    onChangeText = {(text) => setEmail(text)}
                />

                <TextInput 
                    style= {styles.input} 
                    placeholder = {"Password"} 
                    placeholderTextColor = "grey"
                    value = {password}
                    onChangeText = {(text) => setPassword(text)}
                    secureTextEntry
                />

                <TouchableOpacity style = {styles.buttonContainer} onPress={Login}>
                    <Text style = {{color:'white'}}>Log In</Text>
                </TouchableOpacity>   

                <View style={{flexDirection:'row',marginTop:20}} m>
                    <Text>Dont have an account </Text>
                    <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
                        <Text style={styles.link}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </View>        
        </View>
        
        
    );
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',

       },
    wrapper: {
        width:'80%',
    },
    input: {
        fontSize: 15,
        borderRadius: 50,
        borderWidth: StyleSheet.hairlineWidth,
        padding:10,
        marginBottom:5,
        height:10,
        borderColor: "lightgray",
    },
    link: {
        color:'blue',
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