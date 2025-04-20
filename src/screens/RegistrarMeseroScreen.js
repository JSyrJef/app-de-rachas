import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Alert } from "react-native";
import { registrarUsuario } from "../services/api";

const RegistrarMeseroScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!username || !password) {
      Alert.alert("Error", "Por favor completa todos los campos.");
      return;
    }

    setLoading(true);
    try {
      const usuario = { username, password, role: "mesero" };
      await registrarUsuario(usuario);
      Alert.alert("Éxito", "Mesero registrado correctamente");
      setUsername("");
      setPassword("");
      navigation.goBack(); // Regresar al dashboard
    } catch (error) {
      Alert.alert("Error", "No se pudo registrar el mesero.");
      console.error("Error al registrar mesero:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Usuario"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <TextInput
        placeholder="Contraseña"
        value={password}
        secureTextEntry
        onChangeText={setPassword}
        style={styles.input}
      />
      <View style={styles.buttonContainer}>
        <Button
          title={loading ? "Registrando..." : "Registrar Mesero"}
          onPress={handleRegister}
          color="#EE1D52"
          disabled={loading}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 15,
    borderRadius: 8,
  },
  buttonContainer: {
    marginTop: 10,
    backgroundColor: "#EE1D52",
    borderRadius: 8,
    overflow: "hidden",
  },
});

export default RegistrarMeseroScreen;
