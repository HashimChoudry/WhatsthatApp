import { View, Text, ImageBackground, StyleSheet, FlatList} from "react-native";

import DarkBG from "../../assets/images/DarkBG.png"
import Message from "../components/Message";
import messages from "../../assets/data/messages.json"

export default function TextScreen (){
    
    return(
        <ImageBackground source={DarkBG} style = {styles.bg}>
            <FlatList data={messages} renderItem = {({ item }) => <Message message={item} />} style = {styles.list} 
            />
        </ImageBackground>
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