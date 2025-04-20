import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  Alert,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { registrarCliente, verificarPromociones } from "../services/api";

const RegistarClienteScreen = () => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [usuarioTikTok, setUsuarioTikTok] = useState("");
  const [promocionSeleccionada, setPromocionSeleccionada] = useState(null);
  const [promocionesDisponibles, setPromocionesDisponibles] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleVerificarPromociones = async () => {
    if (!usuarioTikTok) {
      Alert.alert(
        "Error",
        "Por favor ingrese el usuario de TikTok para verificar."
      );
      return;
    }

    try {
      const response = await verificarPromociones(usuarioTikTok); // Llamada al backend
      if (response.promociones_disponibles.length === 0) {
        Alert.alert(
          "No hay promociones disponibles",
          "Este cliente no tiene promociones activas para canjear."
        );
      } else {
        setPromocionesDisponibles(response.promociones_disponibles); // Actualizar promociones disponibles
        Alert.alert("Éxito", "Promociones verificadas correctamente.");
      }
    } catch (error) {
      console.error("Error al verificar promociones:", error);
      Alert.alert(
        "Error",
        "No se pudieron cargar las promociones disponibles."
      );
    }
  };

  const handleSubmit = async () => {
    if (!nombre || !apellido || !usuarioTikTok || !promocionSeleccionada) {
      Alert.alert("Error", "Por favor complete todos los campos.");
      return;
    }

    setLoading(true);
    try {
      const cliente = {
        nombre,
        apellido,
        usuario_tiktok: usuarioTikTok,
        promocion_id: promocionSeleccionada,
      };
      await registrarCliente(cliente); // Registrar cliente en el backend
      Alert.alert("Éxito", "Cliente registrado exitosamente.");
      setNombre("");
      setApellido("");
      setUsuarioTikTok("");
      setPromocionSeleccionada(null);
      setPromocionesDisponibles([]); // Reiniciar promociones disponibles
    } catch (error) {
      Alert.alert("Error", "Ocurrió un error al registrar el cliente.");
      console.error("Error al registrar cliente:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Registro de Cliente</Text>

      <TextInput
        placeholder="Nombre"
        style={styles.input}
        value={nombre}
        onChangeText={setNombre}
      />
      <TextInput
        placeholder="Apellido"
        style={styles.input}
        value={apellido}
        onChangeText={setApellido}
      />
      <View style={styles.inputRow}>
        <Text style={styles.at}>@</Text>
        <TextInput
          placeholder="usuario de tiktok"
          style={styles.inputNoAt}
          value={usuarioTikTok}
          onChangeText={(text) => setUsuarioTikTok(text.toLowerCase())}
          autoCapitalize="none"
        />
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={handleVerificarPromociones}
        disabled={loading}
      >
        <Text style={styles.buttonText}>Verificar Promociones</Text>
      </TouchableOpacity>

      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={promocionSeleccionada}
          onValueChange={(itemValue) => setPromocionSeleccionada(itemValue)}
          enabled={promocionesDisponibles.length > 0}
        >
          <Picker.Item label="Selecciona una promoción" value={null} />
          {promocionesDisponibles.map((promo) => (
            <Picker.Item key={promo.id} label={promo.nombre} value={promo.id} />
          ))}
        </Picker>
      </View>

      <TouchableOpacity
        style={[
          styles.button,
          loading || promocionesDisponibles.length === 0
            ? styles.buttonDisabled
            : null,
        ]}
        onPress={handleSubmit}
        disabled={loading || promocionesDisponibles.length === 0}
      >
        <Text style={styles.buttonText}>
          {loading ? "Registrando..." : "Registrar Cliente"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: "#F9F9F9",
  },
  at: {
    fontSize: 16,
    color: "#555",
    marginRight: 5,
  },
  inputNoAt: {
    flex: 1,
    height: 40,
  },
  container: {
    padding: 20,
    backgroundColor: "#fff",
    flexGrow: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FF0059",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    marginBottom: 15,
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#F9F9F9",
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: "#F9F9F9",
    marginTop: 10,
  },
  button: {
    backgroundColor: "#FF0059",
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 10,
    alignItems: "center",
  },
  buttonDisabled: {
    backgroundColor: "#FF005980",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default RegistarClienteScreen;
