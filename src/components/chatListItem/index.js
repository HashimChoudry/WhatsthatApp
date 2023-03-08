import { Text, View, Image, StyleSheet} from "react-native";

const ListItem = () => {
    return (
        <View style = {styles.container}>
            <Image
            source = {{uri: "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/lukas.jpeg",}}
            style = {styles.image}
             />
            <View style = {styles.content}>

                <View style = {styles.row}>
                    <Text style = {styles.name}>Anon User</Text>
                    <Text style = {styles.subTitle} >10:45</Text>
                </View>

                <Text style = {styles.subTitle}>Hello!</Text>
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