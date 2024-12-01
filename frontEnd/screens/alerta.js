import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Dimensions, Modal,  StyleSheet} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import * as Location from 'expo-location';
import axios from 'axios'; // Importação correta do Axios
import AsyncStorage from '@react-native-async-storage/async-storage';
import SOSmodal from '../components/SOSmodalAlert';
import { LinearGradient } from 'expo-linear-gradient';

const storeData = async (value) => {

  try {
      await AsyncStorage.setItem('@storage_Key', JSON.stringify(value));
  } catch (e) {
      // salvar erro
      console.error('Erro ao armazenar dados:', e);
  }
};

const getData = async () => {
  try {
      const jsonValue = await AsyncStorage.getItem('@storage_Key');
      return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
      // erro ao ler os dados
      console.error('Erro ao recuperar dados:', e);
  }
};


export default function Alerta() {
    const [modalVisible, setModalVisible] = useState(false);

    const navigation = useNavigation();
    const [errorMsg, setErrorMsg] = useState(null);
    const [location, setLocation] = useState(null);
    const [userData, setUserData] = useState(null);
    // Função para criar o pedido de socorro
        
        // Função para buscar os dados do AsyncStorage
        const getUserData = async () => {
          try {
            const jsonValue = await AsyncStorage.getItem('@user_address'); // Mesma chave usada para salvar
            if (jsonValue != null) {
              setUserData(JSON.parse(jsonValue)); // Converte de volta para objeto JSON
            }
          } catch (error) {
            console.error('Erro ao recuperar dados do AsyncStorage:', error);
          }
        };
        // UseEffect para buscar os dados ao carregar a página
        useEffect(() => {
          getUserData();
        }, []);

        console.log("estorage" + userData.nome)


    const createSOS = async (user_id, latitude, longitude, status = 'pendente') => {
      const currentTime = new Date().toISOString();
      setModalVisible(true);
      console.log(modalVisible)
      let Data = {
          "user_id": 11,
          "latitude": latitude.toString(),
          "longitude": longitude.toString(),
          "data_solicitacao": currentTime,
          "status": status
      };
  
      try {
          console.log('Dados a serem enviados no try:', Data);
          const response = await axios.post('http://192.168.1.56:3000/sos_requests', Data);
  
          console.log('SOS request created:');
          
      } catch (error) {
          console.error('Error creating SOS request:', error.message);
      }
  };

    useEffect(() => {
        const watchLocation = async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permissão de localização não concedida');
                return;
            }

            const subscription = await Location.watchPositionAsync(
                {
                    accuracy: Location.Accuracy.High,
                    timeInterval: 180000, // 3 minutos em milissegundos
                    distanceInterval: 5,
                },
                async (newLocation) => {
                    const { latitude, longitude } = newLocation.coords;
                    setLocation(newLocation);

                    // Enviar a localização
                    axios.post('http://192.168.1.56:5000/api/location', {
                        lat: latitude,
                        lng: longitude
                    }).then(() => {
                        console.log('Localização enviada:', latitude, longitude);
                    }).catch(error => {
                        console.error('Erro ao enviar localização:', error);
                    });

                }
            );

            return () => subscription.remove();
        };

        watchLocation();
    }, []);

    return (
        <LinearGradient colors={['#1A4887', '#2E9FC2']} style={{ flex: 1, backgroundColor: '#009fff', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
        <SafeAreaView >
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', width: Dimensions.get("window").width * 0.70 }}>
                <Image
                    source={{ uri: 'https://img.icons8.com/ios-filled/100/ffffff/alarm.png' }} // Imagem de alarme
                    style={{ width: 100, height: 100, marginBottom: 20 }}
                />

                <Text style={{ color: '#fff', fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 }}>
                    ALERTA DE ALAGAMENTO!
                </Text>
                <Text style={{ color: '#fff', fontSize: 17, textAlign: 'center', marginBottom: 20, fontWeight: 'bold' }}>
                    Os níveis dos rios estão saindo do controle, procure uma área segura o mais rápido possível!
                </Text>

                <View style={{ backgroundColor: '#005f99', padding: 15, borderRadius: 10, marginBottom: 20, width: Dimensions.get("window").width * 0.70 }}>
                    <Text style={{ color: '#fff', textAlign: 'center', fontSize: 16, padding: 5 }}>
                        Alerta para os bairros:
                    </Text>
                    <Text style={{ color: '#fff', textAlign: 'center', fontSize: 20, fontWeight: 'bold' }}>
                        Celeste
                    </Text>
                </View>

                <TouchableOpacity onPress={() => createSOS(1, location?.coords.latitude, location?.coords.longitude)} style={{ backgroundColor: '#ff3333', paddingVertical: 15, paddingHorizontal: 40, borderRadius: 10, marginBottom: 20 }}>
                    <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold', textAlign: 'center' }}>Pedido de Socorro</Text>
                </TouchableOpacity>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Image
                                source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/2/29/Defesa_Civil.svg' }} // Logo da Defesa Civil
                                style={styles.defesaCivilLogo}
                            />
                            <Text style={styles.modalText}>Seu pedido foi enviado para a Defesa Civil.</Text>

                            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
                                <Text style={styles.closeButtonText}>Fechar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                

                <Text style={{ color: '#fff', fontSize: 16, textAlign: 'center', marginBottom: 10 }}>
                    Descreva sua s/ituação ou apenas clique no chamado de socorro
                </Text>
                <TextInput
                    style={{ backgroundColor: '#fff', width: '100%', height: 100, borderRadius: 8, padding: 10, textAlignVertical: 'top' }}
                    placeholder="Descreva sua situação"
                    placeholderTextColor="#aaa"
                    multiline={true}
                />
            </View>
        </SafeAreaView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    sosButton: {
        backgroundColor: '#ff3333',
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 10,
        marginBottom: 20
    },
    sosButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fundo transparente escuro
    },
    modalContent: {
        width: '80%',
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    defesaCivilLogo: {
        width: 100,
        height: 100,
        marginBottom: 20,
        resizeMode: 'contain'
    },
    modalText: {
        color: '#000',
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 20
    },
    closeButton: {
        backgroundColor: '#ff3333',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5
    },
    closeButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold'
    },
    openButton: {
        backgroundColor: '#005f99',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5
    },
    openButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold'
    }
});
