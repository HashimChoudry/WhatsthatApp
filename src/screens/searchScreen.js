import { Text, View, Image, StyleSheet, Pressable, FlatList, TextInput} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TouchableOpacity } from "react-native";
import SearchedItem from "../components/searchListItem";


export default function SearchScreen() {

    const [searchData, setSearchData] = useState('');
    const [token, setToken] = useState("");
    const [userInp, setUserInp] = useState('');

    const LoadTokenID = () =>{
        AsyncStorage.getItem('whatsthat_session_token').then(data => {
            if(data !== null){
                setToken(data)
            }
        }).catch(
            (error) => console.log(error)
        )
    };

    const loadSearch = (searchInp) => {
      return fetch('http://localhost:3333/api/1.0.0/search?q='+searchInp+'&search_in=all&limit=20&offset=0',{
      method:'get',
      headers:{
        'X-authorization': token
      }
    })
    .then((response) => {
      if(response.status === 200){
        return response.json()
      } else if(response.status === 401){
        throw 'Unauthorised'
      }else if(response.status === 404){
        throw 'Not Found'
      }else if(response.status === 500){
        throw 'Server Error'
      }
    })
    .then((rjson) => {
      setSearchData(rjson)
      console.log("Search data Loaded")
    })
    .catch((err) => {
      console.log(err)
    })
    };

    useEffect(() => {
        LoadTokenID()
    },[]);


    return (
        <View style = {styles.container}>
            <TextInput
                    style = { styles.input} 
                    placeholder = {"Search"} 
                    placeholderTextColor = "grey"
                    value ={userInp}
                    onChangeText = {(text) => setUserInp(text)}
                />
            <TouchableOpacity style = {styles.buttonContainer} onPress = {() => {loadSearch(userInp)}}>
                <Text style = {{color:'white'}}>Search Users</Text>
            </TouchableOpacity> 
              <FlatList style = {{backgroundColor: 'black'}}
              data = {searchData}
              renderItem = {({item}) => <SearchedItem contact = {item} />}
              />

        </View>
        
    );
};

const styles = StyleSheet.create({
  container: {
      flex:1,
      justifyContent: 'flex-start',
      backgroundColor: 'black',

     },
  input: {
      fontSize: 15,
      borderRadius: 50,
      borderWidth: StyleSheet.hairlineWidth,
      padding:10,
      marginBottom:5,
      marginTop:10,
      height:10,
      borderColor: "lightgray",
      backgroundColor:"white",
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