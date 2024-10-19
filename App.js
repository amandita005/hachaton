import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { AuthProvider } from './authContext';
import AppNavigation from './navigation/AppNavigation';

export default function App() {
  return (
    <AuthProvider> 
      <AppNavigation/>
    </AuthProvider>
  
  );
}

