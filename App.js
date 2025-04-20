import React, { useEffect } from 'react';
import AppNavigator from './src/AppNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { obtenerNuevoAccessToken } from './src/services/api';


export default function App() {
  useEffect(() => {
    const checkAndSetToken = async () => {
      let access = await AsyncStorage.getItem('access');

      if (!access) {
        try {
          access = await obtenerNuevoAccessToken(); // Intenta renovar el token
        } catch (err) {
          console.log('No se pudo renovar el token, usuario debe iniciar sesión.');
          delete axios.defaults.headers.common['Authorization'];
          return;
        }
      }

      // Si hay token, establecerlo en axios
      axios.defaults.headers.common['Authorization'] = `Bearer ${access}`;
    };

    checkAndSetToken();
  }, []);

  return <AppNavigator />;
}