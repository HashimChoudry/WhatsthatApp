import React from "react";
import {Text, View, Button} from 'react-native';

export default function loginScreen ({navigation}) {
    return(
        <View>
            <Text>log in Screen</Text>
            <Button 
            title = "sign Up" 
            onPress = {() => navigation.navigate('signUpScreen')}
            />
        </View>
    );
}