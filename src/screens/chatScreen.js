import { View, Text, FlatList } from "react-native";
import ListItem from "../components/chatListItem";
import chats from '../../assets/data/chats.json'


export default function ChatScreen (){
    return(
        <FlatList style= {{backgroundColor: "black"}}
        data = {chats}
        renderItem = {({item}) => <ListItem chat = {item} />}
        />

    );
};