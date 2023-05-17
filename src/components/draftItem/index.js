import { Text, View, TextInput, StyleSheet, Pressable, TouchableOpacity, Modal, TouchableHighlight, Alert} from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import { TimePickerModal, DatePickerModal, enGB, registerTranslation, } from "react-native-paper-dates";
registerTranslation('en-GB', enGB)



const DraftItem = ({draft, token, draftArr, deleted}) => {
    const [modalVisible, setModalVisible] = useState(false)
    const [time, setTime] = useState(new Date())
    const [date, setDate] = useState(new Date())
    const [dateTime, setDateTime] = useState(undefined)
    const [timeVisible, setTimeVisible] = useState(false)
    const [dateVisible, setDateVisible] = useState(false)
    const [scheduled, setScheduled] = useState()
    

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

    const rightSwipe = () => {
    return(
        <Pressable style = {styles.sendBox} onPress = {() => {setModalVisible(true)}}>
            <Text style={styles.name}>Send Message Later</Text>
        </Pressable>
    )
    }
    
    const onConfirmTime = React.useCallback(
        ({ hours, minutes }) => {
          setTimeVisible(false);
          let time = new Date();
          time.setHours(hours)
          time.setMinutes(minutes)
          setTime(time)
        },
        [setTimeVisible]
      );

    const onConfirmDate = React.useCallback(
    (params) => {
        setDateVisible(false);
        setDate(params.date);
    },
    [setDateVisible, setDate]
    );

    const getCurrentHour = () => {
        const currentTime = new Date();
        const hour = currentTime.getHours();
        return hour;
    }   

    const getCurrentMinute = () => {
        const currentTime = new Date();
        const minute = currentTime.getMinutes();
        return minute;
    }
    const onDismissDate = React.useCallback(() => {
        setDateVisible(false);
      }, [setDateVisible]);

    const formatTime = () => {
        const formattedTime = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        return formattedTime
    }

    const sendAtTime = () => {
        const currentDate = new Date();
        const combinedDate = new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate(),
            time.getHours(),
            time.getMinutes(),
            time.getSeconds()
          );
        setDateTime(combinedDate)
        const timeDifference = combinedDate.getTime() - currentDate.getTime()
        if (timeDifference > 0) {
          setScheduled(true)
          setTimeout(()=>{sendHandler()}, timeDifference)
        } else {
          console.warn('time has already passed')
        }
    }

    return (
        <View>
            <Swipeable
            renderRightActions={leftSwipe}
            renderLeftActions={rightSwipe}>
                <View style = {styles.container} >
                    <View style = {styles.content}>
                        <View style = {styles.row}>
                            <Text style = {styles.name}>Message: {draft.message}</Text>         
                        </View>
                        <Text numberOfLines={1} style = {styles.subTitle}>Chat Name: {draft.chat_name}</Text>
                        {scheduled ? <Text style={styles.subTitle}>Item will be sent at {dateTime.toLocaleString('en-GB')}</Text> : null}
                    </View>
                    
                </View>
            </Swipeable>
            <Modal
                transparent = {true}
                visible = {modalVisible}
                animationType = {"fade"}
            >
                <View style = {styles.modalContainer}>
                <View style = {styles.modalContent}>
                    <Text style={{color:'white'}}>{date.toLocaleDateString('en-GB')} {formatTime()}</Text>
                    <TouchableHighlight style = {styles.buttonContainer} onPress={()=>{setTimeVisible(true)}}>
                        <Text style = {{color:'white'}}>set time</Text>
                    </TouchableHighlight>
                    <TouchableHighlight style = {styles.buttonContainer} onPress={()=>{setDateVisible(true)}}>
                        <Text style = {{color:'white'}}>set Date</Text>
                    </TouchableHighlight>
                    <TouchableHighlight style = {styles.buttonContainer} onPress={()=>{sendAtTime()}}>
                        <Text style = {{color:'white'}}>Schedule Send</Text>
                    </TouchableHighlight>
                    <TouchableHighlight style = {styles.buttonContainer} onPress={()=>{setModalVisible(false)}}>
                        <Text style = {{color:'white'}}>Go Away</Text>
                    </TouchableHighlight>
                </View>
                </View>
            </Modal>
            <TimePickerModal
            locale="en"
            visible={timeVisible}
            onConfirm={onConfirmTime}
            onDismiss={()=>{setTimeVisible(false)}}
            hours={getCurrentHour}
            minutes={getCurrentMinute}
            />
            <DatePickerModal
            locale="en-GB"
            mode="single"
            visible={dateVisible}
            onDismiss={onDismissDate}
            date={date}
            onConfirm={onConfirmDate}
            />
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
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
    modalContent: {
        width: 400,
        height: 400,
        backgroundColor: '#2e2e2d',
        borderRadius:40,
        justifyContent: 'center',
        alignItems: 'center',
      },
    buttonContainer: {
        alignItems:"center",
        justifyContent:"flex-end",
        paddingVertical:12,
        paddingHorizontal:42,
        marginTop:10,
        marginBottom: 10,
        borderRadius:4,
        backgroundColor:'#075E54'
      },
    input: {
        fontSize:15,
        borderRadius: 50,
        borderWidth: StyleSheet.hairlineWidth,
        padding:10,
        marginBottom:10,
        height:30,
        borderColor: "lightgray",
        backgroundColor:'white',
    },
});

export default DraftItem