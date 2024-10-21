import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput } from 'react-native';
import { LinearGradient } from "expo-linear-gradient"; 
import axios from 'axios';

const EmitirAlerta = () => {
  const [tipoAlerta, setTipoAlerta] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [cidade, setCidade] = useState('');
  const [bairro, setBairro] = useState('');
  const [enviadoPor, setEnviadoPor] = useState('');

  const emitirAlerta = async () => {
    try {
      const response = await axios.post('http://192.168.1.9:3001/alerts', {  
        tipo_alerta: tipoAlerta,
        mensagem: mensagem,
        cidade: cidade,
        bairro: bairro,
        enviado_por: enviadoPor,
      });
      timeout: 10000,
      console.log('Alerta enviado com sucesso:', response.data);
    } catch (error) {
      console.error('Erro ao enviar alerta:', error);
    }
  };

  return (
    <LinearGradient
      colors={["#1B4987", "#30A2C5"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1, alignItems: "center", justifyContent: "center", padding: 20 }}
    >
      <View style={styles.logoContainer}>
        <Image source={require('../assets/LOGO.png')} style={styles.logoImage} />
      </View>
      <View style={styles.logoContainer}>
        <Image source={require('../assets/defesa_civil-removebg-preview.png')} style={styles.logoImage2} />
      </View>

      <TouchableOpacity style={styles.alertButton} onPress={emitirAlerta}>
        <Text style={styles.alertButtonText}>EMITIR ALERTA</Text>
      </TouchableOpacity>

      <View style={styles.optionsContainer}>
        <TextInput
          style={styles.optionButton}
          placeholder="Tipo do Alerta"
          placeholderTextColor="#fff"
          value={tipoAlerta}
          onChangeText={setTipoAlerta}
        />
        <TextInput
          style={styles.optionButton}
          placeholder="Mensagem"
          placeholderTextColor="#fff"
          value={mensagem}
          onChangeText={setMensagem}
        />
        <TextInput
          style={styles.optionButton}
          placeholder="Cidade"
          placeholderTextColor="#fff"
          value={cidade}
          onChangeText={setCidade}
        />
        <TextInput
          style={styles.optionButton}
          placeholder="Bairro"
          placeholderTextColor="#fff"
          value={bairro}
          onChangeText={setBairro}
        />
        <TextInput
          style={styles.optionButton}
          placeholder="Enviado Por (Defesa Civil)"
          placeholderTextColor="#fff"
          value={enviadoPor}
          onChangeText={setEnviadoPor}
        />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      logoContainer: {
        alignItems: 'center',
      },
      headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginBottom: 20,
        paddingHorizontal: 20,
      },
      alertButton: {
        backgroundColor: 'transparent',
        borderColor: '#fff',
        borderWidth: 1,
        paddingVertical: 15,
        paddingHorizontal: 60,
        borderRadius: 10,
      
      },
      alertButtonText: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
      },
      filterButton: {
        backgroundColor: '#30A2C5',
        padding: 12,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 8,
      },
      optionsContainer: {
        width: '100%',
        marginBottom: 30,
        paddingHorizontal: 20,
      },
      optionButton: {
        backgroundColor: '#30A2C5',
        paddingVertical: 15,
        borderRadius: 10,
        marginVertical: 12,
      },

      optionButtonText: {
        fontSize: 14,
        color: '#fff',
        textAlign: 'center',
      },
      logoImage: {
        width: 350,
        height: 150,
      },
      logoImage2: {
        width: 150,
        height: 90,
        marginBottom: 100,
      },
    
  });

export default EmitirAlerta;