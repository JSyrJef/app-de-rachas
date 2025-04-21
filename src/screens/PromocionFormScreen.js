import React from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import { usePromocionForm } from "../hooks/usePromocionForm"; 

const PromocionFormScreen = ({ route, navigation }) => {
  const promocionId = route.params?.promocionId;
  const {
    nombre,
    setNombre,
    descripcion,
    setDescripcion,
    handleSubmit,
  } = usePromocionForm(promocionId, navigation);

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