import { Text, View, Image, StyleSheet, Pressable, TouchableOpacity} from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";

const DraftItem = ({draft, token, draftArr, deleted}) => {

    const sendMessage = () => {
        let jsonMessage = {
            message:draft.message
        }
        return fetch('http://localhost:3333/api/1.0.0/chat/' + draft.chat_id + '/message', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'X-authorization':token
            },
            body:(JSON.stringify(jsonMessage))
        }).then((response) => {
            if (response.status == 200) {
                return response.json()
            }else if (response.status == 400) {
                throw 'bad request'
            }else if (response.status == 401){
                throw 'Unauthorized'
            }else if (response.status == 403) {
                throw 'Forbidden'
            }else if (response.status == 404) {
                throw 'Not Found';
            }else if (response.status == 500){
                throw 'Server Error';
            }
        }).then((rJson) => {
            console.log(rJson);
        }).catch((err) => {
            console.log(err);
        }) 
    }
    const deleteDraft = async () =>{
        const newArray = draftArr.filter(item => item !== draft);
        try {
            await AsyncStorage.setItem('Drafts', JSON.stringify(newArray))
        } catch (err){
            console.log(err)
        }
    }

    const sendHandler = () => {
        sendMessage();
        deleteDraft();
        deleted();
    }
    const leftSwipe = () => {
        return(
          <Pressable style = {styles.sendBox} onPress = {() => {sendHandler()}}>
            <Text style={styles.name}>Send Message</Text>
          </Pressable>
        )
      }

    return (
        <Swipeable
        renderRightActions={leftSwipe}>
            <View style = {styles.container} >
                <View style = {styles.content}>
                    <View style = {styles.row}>
                        <Text style = {styles.name}>Message: {draft.message}</Text>         
                    </View>
                    <Text numberOfLines={1} style = {styles.subTitle}>Chat Name: {draft.chat_name}</Text>
                </View>
            </View>
        </Swipeable>
    )
  }
  
const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "stretch",
        marginHorizontal: 15,
        marginVertical: 5,
        height: 70,
        backgroundColor:"black"
    },
    content: {
        flex: 1,
        borderBottomColor: "#232629",
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    row: {
        flexDirection: "row",
        marginBottom: 5,
    },
    name: {
        fontWeight: "bold",
        flex: 1,
        color:"white",
    },
    subTitle: {
        color: "grey",
    },
    sendBox: {
        backgroundColor:'lightblue',
        justifyContent:'center',
        alignItems:'center',
        padding: 10,
        marginHorizontal: 15,
        marginVertical: 5,
      },
});

export default DraftItem