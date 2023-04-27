import { Text, View, Image, StyleSheet, Pressable} from "react-native";
import { useNavigation } from "@react-navigation/native";


import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

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

export default ContactsItem