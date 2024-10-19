import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import * as Location from 'expo-location';

export default function LocPermissions() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    const watchLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permissão de localização não concedida');
        return;
      }

      // Se a permissão for concedida, comece a assistir a localização
      const subscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 5s000, // 50 segundos
          distanceInterval: 10, // 10 metros
        },
        (newLocation) => {
          setLocation(newLocation);
          console.log("Localização atual: " + JSON.stringify(newLocation)); // Logando a nova localização
        }
      );

      // Limpeza ao desmontar o componente
      return () => {
        subscription.remove();
      };
    };

    watchLocation();
  }, []);

  return (
    <View>
      <Text>{errorMsg ? errorMsg : JSON.stringify(location)}</Text>
    </View>
  );
}
