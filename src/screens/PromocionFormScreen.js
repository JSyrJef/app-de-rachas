import React, { useState, useEffect } from "react";
import { View, TextInput, Button, StyleSheet, Alert } from "react-native";
import {
  agregarPromocion,
  editarPromocion,
  obtenerPromocionPorId,
} from "../services/api";

const PromocionFormScreen = ({ route, navigation }) => {
  const { promocionId } = route.params || {}; // Recibe el ID de la promoción si es edición
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [activa, setActiva] = useState(true);

  useEffect(() => {
    if (promocionId) {
      // Si estamos editando, obtenemos los datos de la promoción
      const fetchPromocion = async () => {
        try {
          const promocion = await obtenerPromocionPorId(promocionId);
          setNombre(promocion.nombre);
          setDescripcion(promocion.descripcion);
          setActiva(promocion.activa);
        } catch (error) {
          console.error("Error al obtener la promoción:", error);
        }
      };
      fetchPromocion();
    }
  }, [promocionId]);

  const handleSubmit = async () => {
    try {
      const promocion = { nombre, descripcion, activa };

      if (promocionId) {
        // Si hay ID, estamos editando
        await editarPromocion(promocionId, promocion);
        Alert.alert("Éxito", "Promoción actualizada correctamente");
      } else {
        // Si no hay ID, estamos agregando una nueva promoción
        await agregarPromocion(promocion);
        Alert.alert("Éxito", "Promoción creada correctamente");
      }

      navigation.goBack(); // Regresa a la lista de promociones
    } catch (error) {
      Alert.alert("Error", "Hubo un problema al guardar la promoción.");
      console.error("Error al guardar promoción:", error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Nombre de la promoción"
        value={nombre}
        onChangeText={setNombre}
        style={styles.input}
      />
      <TextInput
        placeholder="Descripción"
        value={descripcion}
        onChangeText={setDescripcion}
        style={styles.textArea}
        multiline
        numberOfLines={6}
        textAlignVertical="top"
      />
      <View style={styles.buttonContainer}>
        <Button title="Guardar" onPress={handleSubmit} color="#EE1D52" />
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
  textArea: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 15,
    borderRadius: 8,
    height: 120,
  },
  buttonContainer: {
    marginTop: 10,
    backgroundColor: "#EE1D52",
    borderRadius: 8,
    overflow: "hidden",
  },
});

export default PromocionFormScreen;