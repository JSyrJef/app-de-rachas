import AsyncStorage from '@react-native-async-storage/async-storage';

const storeTokens = async (accessToken, refreshToken) => {
  try {
    await AsyncStorage.setItem('accessToken', accessToken);
    await AsyncStorage.setItem('refreshToken', refreshToken);
  } catch (e) {
    console.error("Error al guardar los tokens", e);
  }
};

const getAccessToken = async () => {
  try {
    return await AsyncStorage.getItem('accessToken');
  } catch (e) {
    console.error("Error al obtener el access token", e);
  }
  return null;
};

const getRefreshToken = async () => {
  try {
    return await AsyncStorage.getItem('refreshToken');
  } catch (e) {
    console.error("Error al obtener el refresh token", e);
  }
  return null;
};

const clearTokens = async () => {
  try {
    await AsyncStorage.removeItem('accessToken');
    await AsyncStorage.removeItem('refreshToken');
  } catch (e) {
    console.error("Error al borrar los tokens", e);
  }
};

export { storeTokens, getAccessToken, getRefreshToken, clearTokens };