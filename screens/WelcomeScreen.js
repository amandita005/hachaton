
import React from "react"
import {Text, View} from "react-native"
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
export default function WelcomeScreen(){
    const navigation = useNavigation();

    return(
        <SafeAreaView style={styles.container} >
            <View> 
                <Text>inicio</Text>
            </View>
        </SafeAreaView>
    )
}

const style = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})