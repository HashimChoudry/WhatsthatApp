import React from "react";
import {Text, View, Button} from 'react-native';
import { useNavigation } from "@react-navigation/native";

export default function SignUpScreen () {
    const navigation = useNavigation();

    return(      
        <View>
            <Text>sign Up</Text>
        </View>
    );
}