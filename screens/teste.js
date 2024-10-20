import React, { useRef, useMemo, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';

export default function PullUpPanel() {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [isOpen, setIsOpem] = useState(true)
  // Define os pontos de snap
  const snapPoints = useMemo(() => ['50%'], []);

  return (
   <View style={styles.container}>
      {/* Conteúdo fixo no topo */}
      <View style={styles.topContent}/>
        <Text style={styles.title}>Informações Principais</Text>
        PullUpPane     </View>

      {/* Bottom Sheet */}
      <BottomSheet
        ref={bottomSheetRef}
        index={0} // Estado inicial do painel (snap point inicial)
        snapPoints={snapPoints}
      >
        <View style={styles.bottomSheetContent}>
          <Text style={styles.subtitle}>Puxar para cima para ver mais detalhes</Text>
          {/* Adicione o conteúdo aqui */}
        </View>
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  bottomSheetContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subtitle: {
    fontSize: 18,
  },
});
