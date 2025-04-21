import { iniciarSesion } from "../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const loginUser = async ({ username, password, navigation, onLoading }) => {
  if (!username || !password) {
    Alert.alert("Error", "Por favor, completa todos los campos.");
    return;
  }

  onLoading(true);
  try {
    const { access, refresh, role } = await iniciarSesion({ username, password });

    if (!role) {
      Alert.alert("Error", "El rol no está definido.");
      return;
    }

    await AsyncStorage.setItem("role", role);

    const screen = role === "admin" ? "AdminDashboard" : "MeseroDashboard";
    navigation.reset({ index: 0, routes: [{ name: screen, params: { role, token: access } }] });
  } catch (error) {
    const msg = error.response?.data?.error || "No se pudo conectar con el servidor.";
    Alert.alert("Error", msg);
    console.error("Error en login:", error);
  } finally {
    onLoading(false);
  }
};