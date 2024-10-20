
import React from "react"
import {Text, View, StyleSheet, Dimensions} from "react-native"
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import LinearGradient from "react-native-linear-gradient";
export default function Initial({route}){
    const data = route.params?.data;
    const navigation = useNavigation();

    return(
        
        <SafeAreaView style={styles.container} >
            <View >
                <Text style={styles.text}>Taquara</Text>
                <Text style={styles.text2}>  Rio Grande do Sul</Text>
                <Text style={styles.temperature}>18°C</Text>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-between", paddingTop: 30 }} > 
                <View style={{width: Dimensions.get("window").width * 0.40,  backgroundColor: '#D9D9D933', padding: 10}}>
                <Text style={styles.text}>Taquara</Text>
                <Text style={styles.text2}>  Rio Grande do Sul</Text>
                <Text style={styles.temperature}>18°C</Text>
                </View>
                <View style={{width: Dimensions.get("window").width * 0.40,  backgroundColor: '#D9D9D933', marginLeft: 10}}>
                <Text style={styles.text}>Taquara</Text>
                <Text style={styles.text2}>  Rio Grande do Sul</Text>
                <Text style={styles.temperature}>18°C</Text>
                </View>
            </View>
        </SafeAreaView>
     
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#009fff',
    },
    text: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center'
      },
      text2: {
        color: '#fff',
        fontSize: 17,
        textAlign: 'center',
      },
      temperature: {
        color: '#fff',
        fontSize: 60,
        fontWeight: 'bold',
        textAlign: 'center',
      },
})