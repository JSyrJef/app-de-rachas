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
import { loginUser } from "../utils/authHelpers";
import CustomInput from "../components/CustomInput";

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    loginUser({ username, password, navigation, onLoading: setLoading });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.loginTitle}>
        <Text style={styles.partFucsia}>Log</Text>
        <Text style={styles.partCyan}>in</Text>
      </Text>
      <Text style={styles.title}>Promociones de racha 🔥</Text>

      <CustomInput
        placeholder="Usuario"
        value={username}
        onChangeText={setUsername}
      />

      <CustomInput
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={!showPassword}
        showToggle
        onTogglePress={() => setShowPassword(!showPassword)}
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
