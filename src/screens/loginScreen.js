import React from "react";
import {Text, View, Button, TextInput, StyleSheet, TouchableOpacity, Pressable, ImageBackground} from 'react-native';
import { useNavigation } from "@react-navigation/native";
import DarkBG from "../../assets/images/DarkBG.png"
import { useState } from "react";


export default function LoginScreen () {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const navigation = useNavigation();

    const sendData = () =>{
        console.warn([email,password])
        setEmail("")
        setPassword("")
    }


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

                <TouchableOpacity style = {styles.buttonContainer} onPress={navigation.navigate('Chat')}>
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