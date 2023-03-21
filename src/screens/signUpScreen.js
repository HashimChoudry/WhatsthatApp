import React from "react";
import {Text, View, Button, TextInput, TouchableOpacity, StyleSheet} from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";

export default function SignUpScreen () {
    const navigation = useNavigation();

    const [fname,SetFname] = useState("")
    const [sname,setSname] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    const sendData = () => {
        
    }

    const sign_up = () => {
        let to_send = {
            "first_name":fname,
            "last_name":sname,
            "email":email,
            "password":password,
        }

        // SetFname('')
        // setSname('')
        // setEmail('')
        // setPassword('')
        console.warn(JSON.stringify(to_send))
        return fetch("http://localhost:3333/api/1.0.0/user", {
            method:'post',
            headers:{
                'Content-Type':'application/json'
            },
            body:(JSON.stringify(to_send))
        })
        .then((Response) => {
            if(Response.status == 201){
                return Response.json()
            }else if (Response.status == 400){
                throw'failed validation'
            }else{
                throw'something went wrong'
            }
        })
        .then((responseJson) => {
            console.log("user created with ID: " , responseJson);
            navigation.navigate('Login')
        })
        .catch((error) => {
            console.log(error);
        })
    }
    
    return(      
        <View style = {styles.container}>
            <View style = {styles.wrapper}>

                <TextInput
                style = {styles.input}
                placeholder ="First Name... "
                placeholderTextColor = "grey"
                value = {fname}
                onChangeText= {SetFname}              
                />

                <TextInput 
                style = {styles.input}
                placeholder = "Second Name... "
                placeholderTextColor = "grey"
                value = {sname}
                onChangeText= {setSname}               
                />

                <TextInput 
                style = {styles.input}
                placeholder = "E-mail... "
                placeholderTextColor = "grey"
                value = {email}
                onChangeText= {setEmail}            
                />

                <TextInput 
                style = {styles.input}
                placeholder = "Password... "
                placeholderTextColor = "grey"
                value = {password}
                onChangeText= {setPassword} 
                />

                <TouchableOpacity style = {styles.buttonContainer} onPress = {sign_up}>
                    <Text style={{color:'white'}}>Sign Up</Text>
                </TouchableOpacity>

                <View style= {{flexDirection:'row', marginTop:20}}>
                    <Text>Already Have an account? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text style = {styles.link}>Login</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems:'center',
        justifyContent:'center',

    },
    wrapper: {
        width:'80%',
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
    link: {
        color:"blue"
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