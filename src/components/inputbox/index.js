import { View, Text, StyleSheet, TextInput} from "react-native";
import {AntDesign, MaterialIcons} from "@expo/vector-icons"
import { useState } from "react";


export default function Inputbox() {
    const [message, setMessage] = useState('Hello');
    const sendMessage = () =>{
        console.warn("message Sent", message)

        setMessage('');
    }

    return(
        
        <View style = {styles.container}>
            <AntDesign
            name="plus" 
            size = {24}
            color="royalblue"
            />
            <TextInput
            style = {styles.input}
            placeholderTextColor={"white"}
            placeholder="Enter Your Message.. "
            value = {message}
            onChangeText = {setMessage}
            />
            <MaterialIcons 
            style = {styles.send}
            name = "send"
            size = {20}
            color = {"white"}
            onPress = {sendMessage}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        backgroundColor: "#242322",
        alignItems:"center",
        padding: 5,
    },
    input: {
        fontSize: 15,
        backgroundColor: "#2e2e2d",
        flex: 1,
        borderRadius: 50,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: "gray",
        padding: 5,
        paddingHorizontal: 10,
        marginHorizontal: 10,
        color: "white",
    },
    send:{
        backgroundColor:"royalblue",
        borderRadius:15,
        overflow:"hidden",
        padding:5,
    },
});