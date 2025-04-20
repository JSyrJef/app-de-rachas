import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  StyleSheet,
  Image,
} from "react-native";
import { iniciarSesion } from "../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert("Error", "Por favor, completa todos los campos.");
      return;
    }
  
    setLoading(true);
    try {
      const { access, refresh, role } = await iniciarSesion({ username, password });
  
      if (!role) {
        Alert.alert("Error", "El rol no está definido.");
        return;
      }
  
      // Ya los guardaste en iniciarSesion, pero si quieres guardar role también:
      await AsyncStorage.setItem('role', role);
  
      if (role === "admin") {
        navigation.reset({
          index: 0,
          routes: [{ name: "AdminDashboard", params: { role, token: access } }],
        });
      } else if (role === "mesero") {
        navigation.reset({
          index: 0,
          routes: [{ name: "MeseroDashboard", params: { role, token: access } }],
        });
      }
    } catch (error) {
      const errorMessage = error.response?.data?.error || "No se pudo conectar con el servidor.";
      Alert.alert("Error", errorMessage);
      console.error("Error en login:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.loginTitle}>
        <Text style={styles.partFucsia}>Log</Text>
        <Text style={styles.partCyan}>in</Text>
      </Text>
      <Text style={styles.title}>Promociones de racha 🔥</Text>

      <TextInput
        placeholder="Usuario"
        placeholderTextColor="#aaa"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <TextInput
        placeholder="Contraseña"
        placeholderTextColor="#aaa"
        value={password}
        secureTextEntry
        onChangeText={setPassword}
        style={styles.input}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Iniciar Sesión</Text>
        )}
      </TouchableOpacity>

      {/* Nota con las credenciales para prueba */}
      <View style={styles.noteContainer}>
        <Text style={styles.noteText}>
          Para probar la app, usa las siguientes credenciales:
        </Text>
        <Text style={styles.credentialsText}>
          Admin: {"\n"}Usuario: admin {"\n"}Contraseña: admin20#25
        </Text>
        <Text style={styles.credentialsText}>
          Mesero: {"\n"}Usuario: mesero {"\n"}Contraseña: mesero20#25
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  loginTitle: {
    fontSize: 36,
    fontWeight: "bold",
    textAlign: "center",
    flexDirection: "row",
  },
  partFucsia: {
    color: "#ff0050", // rosa TikTok
  },
  partCyan: {
    color: "#00f2ea", // azul TikTok
  },
  container: {
    flex: 1,
    backgroundColor: "#000", // fondo negro estilo TikTok
    justifyContent: "center",
    padding: 24,
  },
  title: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 15,
  },
  input: {
    backgroundColor: "#1a1a1a",
    color: "#fff",
    borderColor: "#444",
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#ff0050", // color rosa tiktok
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  noteContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#333",
    borderRadius: 10,
    marginTop: 30,
  },
  noteText: {
    color: "#fff",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 10,
  },
  credentialsText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
});

export default LoginScreen;
