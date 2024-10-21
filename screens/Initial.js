import React, { useState, useEffect } from "react";
import {
  Image,
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import Modal from "react-native-modal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";

export default function Initial({ route }) {
  const [isModalVisible, setModalVisible] = useState(false);
  const [data, setData] = useState(null);
  const [clima, setClima] = useState(null);
  const [loading, setLoading] = useState(true);
  const [socorro, setSocorro] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const dados = await AsyncStorage.getItem("@user_data");
      if (dados) {
        const parsedData = JSON.parse(dados);
        console.log(parsedData);
        setData(parsedData);
        console.log('requisicao')
        const response = await fetch(
          `http://api.weatherapi.com/v1/forecast.json?key=1ad146bd1fd948bb8d321303242110&q=${parsedData.cidade}&lang=pt&days=6`
        );
        const climaData = await response.json();
        setClima(climaData);
        console.log(clima.current.condition.icon)
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleSocorroToggle = async () => {
    console.log(socorro); // Log the current state before the update
    const newSocorroState = !socorro; // Calculate the new state
    setSocorro(newSocorroState); // Update the state
    console.log(newSocorroState); // Log the new state

    if (newSocorroState) {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permissão de localização não concedida");
        return;
      }

      const { coords } = await Location.getCurrentPositionAsync({});
      const sosRequest = {
        latitude: coords.latitude,
        longitude: coords.longitude,
        status: "pendente",
      };
      let resp = await fetch("https://192.168.2.108/sos_request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sosRequest),
      });
      let parsedResp = await resp.json();
      console.log(parsedResp);
    }
  };

  if (loading) {
    return (
      <LinearGradient
        colors={["#1B4987", "#30A2C5"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.loadingContainer}
      >
        <ActivityIndicator size="large" color="#fff" />
      </LinearGradient>
    );
  }

  return (
    <LinearGradient
      colors={["#1B4987", "#30A2C5"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <SafeAreaView style={styles.container}>
        <View>
          <Text style={styles.dateText}>Hoje</Text>
          {data?.cidade && (
            <>
              <Text style={styles.text}>{data.cidade}</Text>
              <Text style={styles.text2}>{data.estado}</Text>
              <Image source={{ uri: 'https:' + clima.current.condition.icon }}/>
              <Text style={styles.temperature}>
                {Math.round(clima.current.heatindex_c)} Cº
              </Text>
            </>
          )}
        </View>
        <View style={styles.windContainer}>
          <View style={styles.windBox}>
            <Text style={styles.windText}>Vento</Text>
            <Text style={styles.windValue}>
              {Math.round(clima.current.gust_kph)} km/h
            </Text>
          </View>
          <View style={styles.windBox}>
            <Text style={styles.windText}>Umidade</Text>
            <Text style={styles.windValue}>
              {Math.round(clima.current.humidity)}%
            </Text>
          </View>
        </View>
        <View style={styles.todayContainer}>
          <View style={styles.todayCard}>
            <Text style={styles.todayText}>Hoje</Text>
            <Text style={styles.tempRange}>
              {Math.round(clima.forecast.forecastday[0].day.mintemp_c)}º -{" "}
              {Math.round(clima.forecast.forecastday[0].day.maxtemp_c)}º{" "}
            </Text>
          </View>
          <View style={styles.barContainer}>
            <View style={styles.tempStart}>
              <Text style={styles.barText}>
                {Math.round(clima.forecast.forecastday[0].day.mintemp_c)}º
              </Text>
            </View>
            <View style={styles.barFill} />
            <View style={styles.tempEnd}>
              <Text style={styles.barText}>
                {Math.round(clima.forecast.forecastday[0].day.maxtemp_c)}º
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.nextDaysContainer}>
          <Text style={styles.nextDaysText}>Próximos 5 dias</Text>
          <View style={styles.daysForecast}>
            {clima.forecast.forecastday.slice(1, 6).map((day, i) => (
              <View key={i} style={styles.dayBox}>
                <View style={styles.dayCard}>
                  <Image source={day.day.condition.icon}/>
                  <Text style={styles.dayText}>{day.date.split("-")[2]}</Text>
                  <Text style={styles.dayTemp}>{day.day.avgtemp_c}º</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
        <TouchableOpacity onPress={toggleModal} style={styles.openButton}>
          <Text style={styles.openButtonText}>Open Modal</Text>
        </TouchableOpacity>
        <Modal
          isVisible={isModalVisible}
          onBackdropPress={toggleModal}
          style={styles.modal}
        >
          <LinearGradient
            colors={["#1B4987", "#30A2C5"]}
            style={styles.modalGradient}
          >
            <View style={styles.modalContent}>
              <Text style={styles.sheetTitle}>ALERTA DE ALAGAMENTO!</Text>
              <Text style={styles.modalText}>
                Os níveis dos rios estão saindo do controle, procure uma área
                segura o mais rápido possível!
              </Text>
              <View style={styles.alertBox}>
                <Text style={styles.alertText}>Alerta para os bairros:</Text>
                <Text style={styles.alertNeighborhood}>Celeste</Text>
              </View>
              <TouchableOpacity
                onPress={handleSocorroToggle}
                style={styles.sosButton}
              >
                <Text style={styles.sosButtonText}>
                  {socorro ? "Cancelar" : "Pedido de Socorro"}
                </Text>
              </TouchableOpacity>
              <Text style={styles.textalert}>
                Clique para{" "}
                {socorro
                  ? "cancelar o pedido de resgate. A defesa civil não"
                  : "pedir resgate. A defesa civil"}{" "}
                terá acesso à sua localização para te resgatar.
              </Text>
              <TouchableOpacity
                onPress={toggleModal}
                style={styles.closeButton}
              >
                <Text>Fechar</Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </Modal>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  textalert: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
  dateText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
  text: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
  },
  text2: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
  },
  temperature: {
    color: "#fff",
    fontSize: 60,
    fontWeight: "bold",
    textAlign: "center",
  },
  windContainer: {
    flexDirection: "row",
    justifyContent: "center",
    paddingTop: 30,
    gap: 30,
    width: Dimensions.get("window").width * 0.4,
  },
  windBox: {
    width: Dimensions.get("window").width * 0.4,
    backgroundColor: "#D9D9D933",
    padding: 20,
    borderRadius: 20,
    alignItems: "center",
  },
  windText: {
    color: "#fff",
    fontSize: 17,
  },
  windValue: {
    color: "#fff",
    fontSize: 27,
    fontWeight: "bold",
    textAlign: "center",
  },
  todayContainer: {
    paddingTop: 20,
    alignItems: "center",
    justifyContent: "center",
    width: Dimensions.get("window").width * 0.9,
  },
  todayCard: {
    width: "100%",
    padding: 15,
    backgroundColor: "#D9D9D933",
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  todayText: {
    color: "#fff",
    fontSize: 20,
  },
  tempRange: {
    color: "#fff",
    fontSize: 20,
  },
  barContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 10,
  },
  tempStart: {
    flex: 1,
    alignItems: "flex-start",
  },
  barFill: {
    flex: 2,
    height: 5,
    backgroundColor: "#fff",
    borderRadius: 5,
  },
  tempEnd: {
    flex: 1,
    alignItems: "flex-end",
  },
  barText: {
    color: "#fff",
    marginLeft: 15,
    marginRight: 15,
  },
  nextDaysContainer: {
    paddingTop: 20,
  },
  nextDaysText: {
    color: "#fff",
    fontSize: 20,
    marginBottom: 10,
    textAlign: "center",
  },
  daysForecast: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: Dimensions.get("window").width * 0.9,
  },
  dayBox: {
    alignItems: "center",
  },
  dayCard: {
    backgroundColor: "#D9D9D933",
    padding: 15,
    borderRadius: 15,
    gap: 2,
  },
  dayText: {
    color: "#fff",
    fontSize: 16,
  },
  dayTemp: {
    color: "#fff",
    fontSize: 16,
  },
  openButton: {
    marginTop: 20,
    backgroundColor: "#D9D9D933",
    padding: 15,
    borderRadius: 10,
  },
  openButtonText: {
    color: "#fff",
    fontSize: 18,
  },
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalGradient: {
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalContent: {
    alignItems: "center",
    justifyContent: "center",
  },
  sheetTitle: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalText: {
    color: "#fff",
    textAlign: "center",
    marginBottom: 20,
  },
  alertBox: {
    marginVertical: 15,
    alignItems: "center",
  },
  alertText: {
    color: "#fff",
    fontSize: 18,
  },
  alertNeighborhood: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  sosButton: {
    backgroundColor: "#FF3D00",
    padding: 10,
    borderRadius: 10,
    marginVertical: 20,
    width: "80%",
    alignItems: "center",
  },
  sosButtonText: {
    color: "#fff",
    fontSize: 18,
  },
  closeButton: {
    color: "#fff",
    fontSize: 18,
  },
});
