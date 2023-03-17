import React from "react";
import {Text, View, Button, TextInput, StyleSheet, TouchableOpacity, Pressable, ImageBackground} from 'react-native';
import { useNavigation } from "@react-navigation/native";
import DarkBG from "../../assets/images/DarkBG.png"
import { useState } from "react";


export default function LoginScreen () {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const navigation = useNavigation();

    const sendEmail = () =>{
        console.warn("message Sent", email)

        setEmail('');
    }
    const sendPassword = () =>{
        console.warn("message Sent", password)

        setPassword('');
    }

    return(
        <View style= {styles.container}>
            <Text style= {{padding:10}}>Login</Text>
            <TextInput
                style = { styles.input} 
                placeholder = {"Email"} 
                placeholderTextColor= "grey"
                value ={email}
                onChangeText = {setEmail}
            />

            <TextInput 
                style= {styles.input} 
                placeholder = {"Password"} 
                placeholderTextColor = "grey"
                value = {password}
                onChangeText = {setPassword}
                secureTextEntry
            />

            <TouchableOpacity style = {styles.buttonContainer} onPress={sendEmail}>
                <Text>Log In</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
                <Text style = {{color: "grey"}}>Sign Up</Text>
            </TouchableOpacity>
        </View>
        
    );
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',

       },
    input: {
        fontSize: 15,
        borderRadius: 50,
        borderWidth: StyleSheet.hairlineWidth,
        padding:10,
        marginBottom:5,
        height:10,
        borderColor: "gray",
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