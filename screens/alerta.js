import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Dimensions } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import * as Location from 'expo-location';
import axios from 'axios'; // Importação correta do Axios

export default function Alerta() {
    const navigation = useNavigation();
    const [errorMsg, setErrorMsg] = useState(null);
    const [location, setLocation] = useState(null);

    // Função para criar o pedido de socorro
    const createSOS = async (user_id, latitude, longitude, status = 'pendente') => {
      const currentTime = new Date().toISOString();
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

                    // Chamar createSOS com as coordenadas atuais
                    await createSOS(1, latitude, longitude);
                }
            );

            return () => subscription.remove();
        };

        watchLocation();
    }, []);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#009fff', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
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

                <Text style={{ color: '#fff', fontSize: 16, textAlign: 'center', marginBottom: 10 }}>
                    Descreva sua situação ou apenas clique no chamado de socorro
                </Text>
                <TextInput
                    style={{ backgroundColor: '#fff', width: '100%', height: 100, borderRadius: 8, padding: 10, textAlignVertical: 'top' }}
                    placeholder="Descreva sua situação"
                    placeholderTextColor="#aaa"
                    multiline={true}
                />
            </View>
        </SafeAreaView>
    );
}
