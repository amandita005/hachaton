import React from "react";
import { useState } from "react";
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const AdressScreen = ({route, navigation}) => {
    const { nome, telefone, cpf } = route.params;
    const [cep, setCep] = useState('');
    const [rua, setRua] = useState('');
    const [numero, setNumero] = useState('');
    const [bairro, setBairro] = useState('');
    const [cidade, setCidade] = useState('');
    const [estado, setEstado] = useState('');  
    
    const sendAddressData = async () => {
        try {
          const response = await fetch('http://192.168.1.20:3000/usuarios', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              nome,
              telefone,
              cpf,
              cep,
              rua,
              numero,
              bairro,
              cidade,
              estado
            }),
          });
    
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          if(response.ok){
            navigation.navigate('Teste');
          }
    
          const data = await response.json();
          console.log('Response:', data);
        } catch (error) {
          console.error('Error:', error);
        }
      };

    return (
      <LinearGradient colors={['#1A4887', '#2E9FC2']} style={styles.container}>
        <SafeAreaView style={styles.safeArea}>
            <View>
              <Text style={{color: 'white', fontWeight: 'bold', fontSize: 25, textAlign: 'center'}}>Quase lá...</Text>

              <Text style={{color: 'white', marginVertical: 5}}>CEP</Text>
              <TextInput value={cep} onChangeText={setCep} style={{width: 300, height: 40, borderRadius: 5, padding: 10, borderColor: 'white', borderWidth: 1}} />
              <Text style={{color: 'white', marginVertical: 5}}>Rua</Text>
              <TextInput value={rua} onChangeText={setRua} style={{width: 300, height: 40, borderRadius: 5, padding: 10, borderColor: 'white', borderWidth: 1}} />
              <Text style={{color: 'white', marginVertical: 5}}>Número</Text>
              <TextInput value={numero} onChangeText={setNumero} style={{width: 300, height: 40, borderRadius: 5, padding: 10, borderColor: 'white', borderWidth: 1}} />
              <Text style={{color: 'white', marginVertical: 5}}>Bairro</Text>
              <TextInput value={bairro} onChangeText={setBairro} style={{width: 300, height: 40, borderRadius: 5, padding: 10, borderColor: 'white', borderWidth: 1}} />
              <Text style={{color: 'white', marginVertical: 5}}>Cidade</Text>
              <TextInput value={cidade} onChangeText={setCidade} style={{width: 300, height: 40, borderRadius: 5, padding: 10, borderColor: 'white', borderWidth: 1}} />
              <Text style={{color: 'white', marginVertical: 5}}>Estado</Text>
              <TextInput value={estado} onChangeText={setEstado} style={{width: 300, height: 40, borderRadius: 5, padding: 10, borderColor: 'white', borderWidth: 1}} />
              <TouchableOpacity onPress={sendAddressData} style={{backgroundColor: '#1F5596', width: 300, height: 40, borderRadius: 5, justifyContent: 'center', alignItems: 'center', marginTop: 10}}>
                <Text style={{color: 'white', fontWeight: 'bold'}}>Enviar!</Text>
              </TouchableOpacity>
            </View>
        </SafeAreaView>
      </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    safeArea: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
}); 
export default AdressScreen;