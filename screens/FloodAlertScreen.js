import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, Modal, TextInput, Alert } from 'react-native';
import { LinearGradient } from "expo-linear-gradient"; 
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios'; // Importando axios

const FloodAlertScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [alertas, setAlertas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cidade, setCidade] = useState('');
  const [bairro, setBairro] = useState('');

  const fetchAlertas = async () => {
    try {
      const response = await axios.get('http://192.168.1.9:3001/alerts');
      setAlertas(response.data);
    } catch (error) {
      console.error('Erro ao buscar alertas:', error);
      Alert.alert('Erro', 'Não foi possível carregar os alertas.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlertas();
  }, []);

  const handleFilter = async () => {
    try {
      setLoading(true); // Inicia o loading enquanto busca os dados
      const response = await axios.get('http://192.168.1.9:3001/alerts/address', {
        params: {
          cidade: cidade.trim() || undefined, // Envia parâmetros somente se não estiver vazio
          bairro: bairro.trim() || undefined,
        },
      });
      setAlertas(response.data); // Atualiza a lista de alertas filtrados
      setModalVisible(false); // Fecha o modal após aplicar o filtro
    } catch (error) {
      console.error('Erro ao filtrar alertas:', error);
      Alert.alert('Erro', 'Não foi possível aplicar o filtro.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient
      colors={["#1B4987", "#30A2C5"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1, alignItems: "center", justifyContent: "center", padding: 20 }}
    >
      <ScrollView style={{ flex: 1, width: '100%' }}>
        <View style={styles.logoContainer}>
        
        </View>

        {/* Botão de Histórico de Alertas e Filtrar */}
        <View style={styles.headerContainer}>
          <TouchableOpacity style={styles.alertButton}>
            <Text style={styles.alertButtonText}>Histórico de Alertas</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.filterButton}
            onPress={() => setModalVisible(true)}
          >
            <Icon name="filter-outline" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Lista de alertas */}
        <View style={styles.optionsContainer}>
          {loading ? (
            <Text style={styles.loadingText}>Carregando alertas...</Text>
          ) : (
            alertas.map((alerta, index) => (
              <TouchableOpacity key={index} style={styles.optionButton}>
                <Text style={styles.optionButtonText}>
                {`Tipo: ${alerta.tipo_alerta}\n${alerta.mensagem}\nCidade: ${alerta.cidade}`}
                </Text>
              </TouchableOpacity>
            ))
          )}
        </View>
      </ScrollView>

      {/* Modal de filtro */}
      <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Filtrar por:</Text>
          <TextInput 
            placeholder="Cidade" 
            style={styles.input} 
            placeholderTextColor="#fff"
            onChangeText={text => setCidade(text)} // Adicione um estado para cidade
          />
          <TextInput 
            placeholder="Bairro" 
            style={styles.input} 
            placeholderTextColor="#fff"
            onChangeText={text => setBairro(text)} // Adicione um estado para bairro
          />
          <TouchableOpacity 
            style={styles.filterButton} // Crie um botão para aplicar o filtro
            onPress={handleFilter}
          >
            <Text style={styles.filterButtonText}>Filtrar</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.closeButton} 
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.closeButtonText}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
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
    margin: '8'
  },
  filterButtonText: {
    color: '#fff',
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
    alignItems: 'center',
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
  
  // Estilos do modal
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#1B4987',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    color: '#fff',
  },
  closeButton: {
    backgroundColor: '#30A2C5',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  loadingText: {
    color: '#fff',
    textAlign: 'center',
    marginVertical: 20,
  },
});

export default FloodAlertScreen;