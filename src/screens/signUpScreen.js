import React from "react";
import {Text, View, Button, TextInput, TouchableOpacity, StyleSheet} from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";

export default function SignUpScreen () {
    const navigation = useNavigation();
    const [fname,SetFname] = useState('')
    const [sname,setSname] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    const sendData = () => {
        console.warn([fname,sname,email,password])
    }
    
    return(      
        <View style = {styles.container}>
            <View style = {styles.wrapper}>

                <TextInput
                style = {styles.input}
                placeholder ="First Name... "
                placeholderTextColor = "grey"
                value = {fname}
                onChangeText={(text) => SetFname(text)}               
                />

                <TextInput 
                style = {styles.input}
                placeholder = "Second Name... "
                placeholderTextColor = "grey"
                value = {sname}
                onChangeText={(text) => setSname(text)}               
                />

                <TextInput 
                style = {styles.input}
                placeholder = "E-mail... "
                placeholderTextColor = "grey"
                value = {email}
                onChangeText={(text) => setEmail(text)}              
                />

                <TextInput 
                style = {styles.input}
                placeholder = "Password... "
                placeholderTextColor = "grey"
                value = {password}
                onChangeText={(text) => setPassword(text)}   
                />

                <TouchableOpacity style = {styles.buttonContainer} onPress = {sendData}>
                    <Text style={{color:'white'}}>Sign Up</Text>
                </TouchableOpacity>

                <View style= {{flexDirection:'row'}}>
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