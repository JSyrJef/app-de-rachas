import AsyncStorage from '@react-native-async-storage/async-storage';

const storeTokens = async (accessToken, refreshToken) => {
  try {
    await AsyncStorage.setItem('access', accessToken);
    await AsyncStorage.setItem('refresh', refreshToken);
  } catch (e) {
    console.error("Error al guardar los tokens", e);
  }
};

const getAccessToken = async () => {
  try {
    return await AsyncStorage.getItem('access');
  } catch (e) {
    console.error("Error al obtener el access token", e);
  }
  return null;
};

const getRefreshToken = async () => {
  try {
    return await AsyncStorage.getItem('refresh');
  } catch (e) {
    console.error("Error al obtener el refresh token", e);
  }
  return null;
};

const clearTokens = async () => {
  try {
    await AsyncStorage.removeItem('access');
    await AsyncStorage.removeItem('refresh');
  } catch (e) {
    console.error("Error al borrar los tokens", e);
  }
};

export { storeTokens, getAccessToken, getRefreshToken, clearTokens };