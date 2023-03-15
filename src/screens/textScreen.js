import { View, Text, ImageBackground, StyleSheet, FlatList, KeyboardAvoidingView, Platform} from "react-native";

import DarkBG from "../../assets/images/DarkBG.png"
import Message from "../components/Message";
import messages from "../../assets/data/messages.json"
import Inputbox from "../components/inputbox";


export default function TextScreen (){
   
    return(
        <KeyboardAvoidingView behavior={Platform.OS === "android" ? "padding":"height"} style = {styles.bg}>
            <ImageBackground source={DarkBG} style = {styles.bg}>
                <FlatList data={messages} renderItem = {({ item }) => <Message message={item} />} style = {styles.list} 
                />
                <Inputbox />
            </ImageBackground>
        </KeyboardAvoidingView>


    );
};

const styles = StyleSheet.create({
    bg:{
        flex:1,
    },
    list:{
        padding:10,
        
    },
})