import React, { useState, useEffect } from "react";
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';

const AdressScreen = ({ route, navigation }) => {
  const { nome, telefone, cpf } = route.params || {};
  console.log('Dados recebidos:', nome, telefone, cpf);
  const [cep, setCep] = useState('');
  const [rua, setRua] = useState('');
  const [numero, setNumero] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [bairros, setBairros] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Erro ao armazenar dados no AsyncStorage:', error);
    }
  };

  const getCep = async () => {
    let resp = await fetch('http://192.168.2.108:3001/pegarcep', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cep }),
    });

    if (resp.ok) {
      let data = await resp.json();
      console.log('Dados:', data.bairros.result);
      setBairros(data.bairros.result);
      setCidade(data.cidade);
      setEstado(data.estado);
    } else {
      console.error('Erro ao buscar dados do CEP:', resp.status);
    }
  };

  const removeAccents = (str) => {
      let normalizada = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      console.log('String normalizada:', normalizada);
      return normalizada
  };

  const sendAddressData = async () => {
    if (!nome || !telefone || !cpf) {
      console.error('Dados do usuário não encontrados');
      navigation.navigate('Welcome');
      return;
    }
    if (!cep || !rua || !numero || !bairro || !cidade || !estado) {
      console.error('Todos os campos são obrigatórios');
      return;
    }

    try {
      const userData = {
        nome: removeAccents(nome),
        telefone: removeAccents(telefone),
        cpf: removeAccents(cpf),
        cep: removeAccents(cep),
        rua: removeAccents(rua),
        numero: removeAccents(numero),
        bairro: removeAccents(bairro),
        cidade: removeAccents(cidade),
        estado: removeAccents(estado)
      };
      const response = await fetch('http://192.168.2.108:3001/usuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      await storeData('@user_data', userData);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      if (response.ok) {
        navigation.navigate('Initial');
      }

      const data = await response.json();
      console.log('Response:', data);
    } catch (error) {
      console.error('Error:', error);
    }
    navigation.navigate('Initial');
  };

  useEffect(() => {
    if (cep.length === 8) {
      getCep();
      console.log('CEP tem 8 dígitos:', cep);
      // Você pode adicionar qualquer lógica adicional aqui
    }
  }, [cep]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <LinearGradient colors={['#1A4887', '#2E9FC2']} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View>
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 25, textAlign: 'center' }}>Quase lá...</Text>
          <Text style={{ color: 'white', marginVertical: 5 }}>CEP</Text>
          <TextInput value={cep} keyboardType="numeric" onChangeText={setCep} style={{ width: 300, height: 40, borderRadius: 5, padding: 10, borderColor: 'white', borderWidth: 1 }} />
          <Text style={{ color: 'white', marginVertical: 5 }}>Rua</Text>
          <TextInput value={rua} onChangeText={setRua} style={{ width: 300, height: 40, borderRadius: 5, padding: 10, borderColor: 'white', borderWidth: 1 }} />
          <Text style={{ color: 'white', marginVertical: 5 }}>Número</Text>
          <TextInput value={numero} keyboardType="numeric" onChangeText={setNumero} style={{ width: 300, height: 40, borderRadius: 5, padding: 10, borderColor: 'white', borderWidth: 1 }} />
          <Text style={{ color: 'white', marginVertical: 5 }}>Bairro</Text>
          <TouchableOpacity onPress={() => setModalVisible(true)} style={{ width: 300, height: 40, borderRadius: 5, padding: 10, borderColor: 'white', borderWidth: 1, justifyContent: 'center' }}>
            <Text style={{ color: 'white' }}>{bairro || 'Selecione um bairro'}</Text>
          </TouchableOpacity>
          <Text style={{ color: 'white', marginVertical: 5 }}>Cidade</Text>
          <TextInput value={cidade} onChangeText={setCidade} style={{ width: 300, height: 40, borderRadius: 5, padding: 10, borderColor: 'white', borderWidth: 1 }} />
          <Text style={{ color: 'white', marginVertical: 5 }}>Estado</Text>
          <TextInput value={estado} onChangeText={setEstado} style={{ width: 300, height: 40, borderRadius: 5, padding: 10, borderColor: 'white', borderWidth: 1 }} />
          <TouchableOpacity onPress={sendAddressData} style={{ backgroundColor: '#1F5596', width: 300, height: 40, borderRadius: 5, justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
            <Text style={{ color: 'white', fontWeight: 'bold' }}>Enviar!</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        } }
      >
        <View style={styles.modalView}>
          <Picker
            selectedValue={bairro}
            onValueChange={(itemValue) => {
              setBairro(itemValue);
              setModalVisible(false);
            } }
            style={{ width: 300, height: 40, borderRadius: 5, padding: 10, borderColor: 'white', borderWidth: 1, color: 'black' }}
          >
            {bairros.map((bairroItem, index) => (
              <Picker.Item key={index} label={bairroItem.name} value={bairroItem.name} />
            ))}
          </Picker>
        </View>
      </Modal>
      </LinearGradient>
    </TouchableWithoutFeedback>);
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
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,1)',
  }
});

export default AdressScreen;
