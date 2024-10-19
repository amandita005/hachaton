import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import axios from 'axios';
import * as Location from 'expo-location';

export default function MapComponent() {
  const [properties, setProperties] = useState([]); // Propriedades do backend
  const [location, setLocation] = useState(null); // Localização atual do dispositivo
  const [errorMsg, setErrorMsg] = useState(null);

  // Função para pegar e enviar localização do dispositivo
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
          timeInterval: 5000,
          distanceInterval: 5,
        },
        (newLocation) => {
          const { latitude, longitude } = newLocation.coords;
          setLocation(newLocation);
  
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
    <View style={styles.container}>
      {errorMsg ? (
        <Text>{errorMsg}</Text>
      ) : (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location ? location.coords.latitude : -30.0346, // Localização inicial (POA)
            longitude: location ? location.coords.longitude : -51.2177,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {/* Marcadores das propriedades */}
          {properties.length > 0 && properties.map(property => (
            <Marker
              key={property.id}
              coordinate={{
                latitude: property.lat,
                longitude: property.lng,
              }}
              title={property.name}
              description={property.location}
              pinColor="red"
            />
          ))}

          {/* Marcador da localização atual do usuário */}


          {/* Marcador da localização atual do usuário */}
          {location && (
            <Marker
              coordinate={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              }}
              title="Minha Localização"
              description="Você está aqui"
              pinColor="blue" // Define a cor do marcador
            />
          )}
        </MapView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject, // Ocupa a tela inteira
  },
  map: {
    ...StyleSheet.absoluteFillObject, // Faz o mapa ocupar todo o espaço disponível
  }
  ,
});
