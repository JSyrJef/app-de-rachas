import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { clearTokens } from './storage';

export const logout = async (navigation) => {
  try {
    await AsyncStorage.multiRemove(['access', 'refresh', 'role']);
    delete axios.defaults.headers.common['Authorization'];
    await clearTokens(); // Limpiar tokens de AsyncStorage
    navigation.replace('Login'); // o navigation.navigate('Login')
  } catch (error) {
    console.error('Error al cerrar sesión:', error);
  }
};