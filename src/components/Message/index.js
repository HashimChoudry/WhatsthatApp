import { View, Text, StyleSheet } from "react-native";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

export default function Message({message}) {
    const isUsrMessage = () =>{
        return message.user.id === 'u1'
    }
    return(
        <View style = {[styles.container,{
            backgroundColor:isUsrMessage() ? "#075E54" : "#2e2e2d",
            alignSelf:isUsrMessage() ? "flex-end" : "flex-start"
            } ]}>
            <Text style = {{color:"white"}}>{message.text}</Text>
            <Text style = {styles.time}>{dayjs(message.createdAt).fromNow(true)}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        margin:5,
        padding:10,
        maxWidth:"80%",
        borderRadius:10,
        alignSelf:"flex-end",
        shadowColor: "#000000",
        shadowOffset: {
        width: 0,
        height: 3,
        },
        shadowOpacity:  0.18,
        shadowRadius: 4.59,
        elevation: 5
    },
    text:{},
    time:{
        color:"gray",
        alignSelf:"flex-end",
    },
})