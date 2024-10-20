import React from 'react';
import { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function WelcomeScreen ({navigation}) {
    const [nome, setNome] = useState('');
    const [telefone, setTelefone] = useState('');
    const [cpf, setCpf] = useState('');

    const handleNext = () => {
        navigation.navigate('Adress', { nome, telefone, cpf });
    }

    return (
        <LinearGradient colors={['#1A4887', '#2E9FC2']} style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                <View>
                    <Text style={{color: 'white', fontWeight: 'bold', fontSize: 25, textAlign: 'center'}}>Primeiros Passos</Text>

                    <Text style={{color: 'white', marginVertical: 5}}>Nome</Text>
                    <TextInput value={nome} onChangeText={setNome} style={{width: 300, height: 40, borderRadius: 5, padding: 10, borderColor: 'white', borderWidth: 1}} />
                    <Text style={{color: 'white', marginVertical: 5}}>Telefone</Text>
                    <TextInput value={telefone} onChangeText={setTelefone} style={{width: 300, height: 40, borderRadius: 5, padding: 10, borderColor: 'white', borderWidth: 1}} />
                    <Text style={{color: 'white', marginVertical: 5}}>CPF</Text>
                    <TextInput value={cpf} onChangeText={setCpf} style={{width: 300, height: 40, borderRadius: 5, padding: 10, borderColor: 'white', borderWidth: 1}} />
                    <TouchableOpacity onPress={handleNext} style={{backgroundColor: '#1F5596', width: 300, height: 40, borderRadius: 5, justifyContent: 'center', alignItems: 'center', marginTop: 10}}>
                        <Text style={{color: 'white', fontWeight: 'bold'}}>Entrar!</Text>
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

