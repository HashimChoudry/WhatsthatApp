import { Text, View, Image, StyleSheet} from "react-native";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

const ListItem = ({chat}) => {
    return (
        <View style = {styles.container}>
            <Image
            source = {{uri: chat.user.image,}}
            style = {styles.image}
             />
            <View style = {styles.content}>

                <View style = {styles.row}>
                    <Text numberOfLines={1} style = {styles.name}>{chat.user.name}</Text>
                    <Text style = {styles.subTitle} >{dayjs(chat.lastMessage.createdAt).fromNow(true)}</Text>
                </View>

                <Text numberOfLines={2} style = {styles.subTitle}>{chat.lastMessage.text}</Text>
            </View>
        </View>
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
    image: {
      width: 70,
      borderRadius: 35,
      marginRight: 10,
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
      color:"white"
    },
    subTitle: {
      color: "grey",
    },
  });


export default ListItem;