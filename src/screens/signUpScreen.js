import React from "react";
import {Text, View, Button} from 'react-native';

export default function signUpScreen ({navigation}) {
    return(
        <View>
            <Text>sign Up</Text>
            <Button 
            title = "go Back" 
            onPress = {() => navigation.goBack()}
            />
        </View>
    );
}