import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, Image, Dimensions } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

export default function SOSmodal() {
    const [modalVisible, setModalVisible] = useState(true);

    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                
            >
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)'
                }}>
                    <View style={{
                        width: Dimensions.get('window').width * 0.8,
                        padding: 20,
                        backgroundColor: '#fff',
                        borderRadius: 10,
                        alignItems: 'center'
                    }}>
                        <Image
                            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/196/196394.png' }}
                            style={{ width: 80, height: 80, marginBottom: 20 }}
                        />
                        <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 }}>
                            Seu pedido foi enviado para a Defesa Civil!
                        </Text>
                        <TouchableOpacity
                            onPress={() => setModalVisible(!modalVisible)}
                            style={{
                                backgroundColor: '#ff3333',
                                paddingVertical: 10,
                                paddingHorizontal: 20,
                                borderRadius: 10
                            }}>
                            <Text style={{ color: '#fff', fontSize: 16 }}>Fechar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}
