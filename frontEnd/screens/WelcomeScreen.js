import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Alert, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

export default function WelcomeScreen({ navigation }) {
    const [nome, setNome] = useState('');
    const [telefone, setTelefone] = useState('');
    const [cpf, setCpf] = useState('');

    const formatInput = (input) => input.replace(/\D/g, '');

    const storeData = async (key, value) => {
        try {
          await AsyncStorage.setItem(key, value);
          console.log('Dados salvos com sucesso');
        } catch (error) {
          console.error('Erro ao salvar os dados', error);
        }
      };
      const getData = async (key) => {
        try {
          const value = await AsyncStorage.getItem(key);
          if (value !== null) {
            return value;
          }
          console.log('Nenhum dado encontrado');
        } catch (error) {
          console.error('Erro ao buscar os dados', error);
        }
      };

    const showAlert = (message) => {
        Alert.alert('Aviso', message, [{ text: 'OK' }]);
    };

    const handleNext = async () => {
        if (!nome || !telefone || !cpf) {
            showAlert('Todos os campos são obrigatórios.');
            return;
        }

        const formattedCpf = formatInput(cpf);
        const formattedTelefone = formatInput(telefone);

        try {
            const response = await fetch('http://192.168.1.56:3001/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ cpf: formattedCpf, telefone: formattedTelefone }),
            });

            if (response.status === 404) {
                navigation.navigate('Adress', { nome, cpf: formattedCpf, telefone: formattedTelefone });
               
            } else if (response.status === 500) {
                showAlert('Erro interno do servidor. Tente novamente mais tarde.');
            } else {
                const data = await response.json();
                console.log('Success:');
                await storeData('@user_data', JSON.stringify(data));
                navigation.navigate('Initial');

            }
        } catch (error) {
            console.error('Error:', error);
            showAlert('Erro de conexão. Verifique sua internet.');
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <LinearGradient colors={['#1A4887', '#2E9FC2']} style={styles.container}>
                <SafeAreaView style={styles.safeArea}>
                    <View>
                        <Text style={styles.title}>Primeiros Passos</Text>

                        <Text style={styles.label}>Nome</Text>
                        <TextInput value={nome} onChangeText={setNome} style={styles.input} />

                        <Text style={styles.label}>Telefone</Text>
                        <TextInput value={telefone} onChangeText={setTelefone} style={styles.input} keyboardType="phone-pad" />

                        <Text style={styles.label}>CPF</Text>
                        <TextInput value={cpf} onChangeText={setCpf} style={styles.input} keyboardType="numeric" />

                        <TouchableOpacity onPress={handleNext} style={styles.button}>
                            <Text style={styles.buttonText}>Entrar!</Text>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </LinearGradient>
        </TouchableWithoutFeedback>
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
    },
    title: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 25,
        textAlign: 'center',
    },
    label: {
        color: 'white',
        marginVertical: 5,
    },
    input: {
        width: 300,
        height: 40,
        borderRadius: 5,
        padding: 10,
        borderColor: 'white',
        borderWidth: 1,
    },
    button: {
        backgroundColor: '#1F5596',
        width: 300,
        height: 40,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});
