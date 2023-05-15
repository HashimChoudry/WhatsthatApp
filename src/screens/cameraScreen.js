
import { Camera, CameraType} from "expo-camera";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function CameraScreen()  {
    const [type, setType] = useState(CameraType.front)
    const [permission, getPermission] = Camera.useCameraPermissions()
    const [camera,setCamera] = useState(null)
    const [token, setToken] = useState(null)
    const [userID, setUserID] = useState(null)

    function toggleCamera() {
        setType(current => (current === CameraType.front ? CameraType.back : CameraType.front))
        console.log("camera:" , type)
    }

    async function takePicture (){
        if(camera){
            const options = {quality:0.5, base64:true, onPictureSaved: (data) => sendPicture(data)}
            const data = await camera.takePictureAsync(options)

            console.log(data.uri)
        }
    }

    async function sendPicture (data){
        console.log("here", data.uri)
        let res = await fetch(data.uri)
        let blob = await res.blob();

        return fetch("http://localhost:3333/api/1.0.0/user/" + userID + "/photo",{
            method:"POST",
            headers:{
                'X-authorization': token,
                "Content-Type":"image/png"
            },
            body:blob
        }).then((response) => {
            console.log('picture added: ',response)
        }).catch((err)=>{
            console.log(err)
        })
    }

    function LoadTokenID (){
        AsyncStorage.getItem('whatsthat_session_token').then(data => {
            if(data !== null){
                setToken(data)
            }
        }).catch(
            (error) => console.log(error)
        )
        AsyncStorage.getItem('whatsthat_user_id').then(data => {
            if(data !== null){
                setUserID(data)
            }
        }).catch(
            (error) => console.log(error)
        )
    } 

    useEffect(()=>{
        getPermission()
        LoadTokenID()
    })
    if(!permission || !permission.granted){
        return(<Text>No permission sad</Text>)
    }else{
        return(
            <View style = {styles.container}>
                <Camera style = {styles.camera} type = {type} ref = {ref => setCamera(ref)}>
                    <View>
                        <TouchableOpacity style = {styles.buttonContainer} onPress={() => {toggleCamera()}}>
                            <Text style = {{color:'white'}}>change toggle</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style = {styles.buttonContainer} onPress={() => {takePicture()}}>
                            <Text style={{color:'white'}}>take pic</Text>
                        </TouchableOpacity>
                    </View>
                </Camera>
            </View>
        )
    }

}

const styles = StyleSheet.create({
      buttonContainer: {
        alignItems:"center",
        justifyContent:"flex-end",
        paddingVertical:12,
        paddingHorizontal:42,
        marginTop:10,
        marginBottom: 10,
        borderRadius:4,
        backgroundColor:'#075E54',
        alignSelf:'flex-end'
      },
      container: {
        flex: 1,
        alignItems:'center',
        backgroundColor:'black',
      },
      camera: {
        width: '80%',
        height: '80%',
        aspectRatio: 2,
        justifyContent:'flex-end',
      },
})