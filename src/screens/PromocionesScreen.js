import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";
import { obtenerPromociones, togglePromocion } from "../services/api";
import { useFocusEffect } from "@react-navigation/native";
import { logout } from "../services/auth";
import Icon from "react-native-vector-icons/Ionicons";

const PromocionesScreen = ({ navigation, route }) => {
  const { role, token } = route.params || {}; // Recibir el rol del usuario (admin o mesero)
  const [promociones, setPromociones] = useState([]);

  useEffect(() => {
    if (!role) {
      Alert.alert("Error", "No se pudo determinar el rol del usuario.");
      navigation.goBack(); // Redirige al login
    }
  }, [role]);

  useFocusEffect(
    useCallback(() => {
      const fetchPromociones = async () => {
        try {
          const data = await obtenerPromociones(token, role);
          const filteredPromos =
            role === "mesero" ? data.filter((promo) => promo.activa) : data;
          setPromociones(filteredPromos);
        } catch (error) {
          console.error("Error al obtener promociones:", error);
        }
      };
      fetchPromociones();
    }, [role])
  );

  const handleAgregarPromocion = () => {
    navigation.navigate("Agregar Promoción");
  };

  const editarPromocion = (id) => {
    navigation.navigate("Editar Promoción", { promocionId: id });
  };

  const handleRegistrarCliente = (promocionId) => {
    navigation.navigate("Registrar Cliente", { promocionId }); // Pasar la promoción elegida
  };

  const handleTogglePromocion = async (id, estadoActual) => {
    try {
      await togglePromocion(id, estadoActual);
      Alert.alert(
        "Éxito",
        `Promoción ${estadoActual ? "desactivada" : "activada"} correctamente.`
      );
      const updatedPromos = promociones.map((promo) =>
        promo.id === id ? { ...promo, activa: !estadoActual } : promo
      );
      setPromociones(updatedPromos);
    } catch (error) {
      console.error("Error al cambiar el estado de la promocion:", error);
    }
  };

  const renderPromocion = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.nombre}>{item.nombre}</Text>
      <Text>{item.descripcion}</Text>
      <Text style={styles.estado}>{item.activa ? "Activa" : "Inactiva"}</Text>
      {role === "admin" && (
        <>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => editarPromocion(item.id)}
          >
            <Icon name="create-outline" size={24} color="#FF0059" />
            <Text style={styles.buttonText}>Editar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => handleTogglePromocion(item.id, item.activa)}
          >
            <Icon
              name={
                item.activa ? "pause-circle-outline" : "play-circle-outline"
              }
              size={24}
              color="#FF0059"
            />
            <Text style={styles.buttonText}>
              {item.activa ? "Desactivar" : "Activar"}
            </Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          Promociones <Text style={styles.username}>{role}</Text>
        </Text>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => logout(navigation)}
        >
          <Icon name="log-out-outline" size={24} color="#fff" />
          <Text style={styles.logoutText}>Salir</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.titulo}>
        {role === "admin" ? "Administrar Promociones" : "Promociones Activas"}
      </Text>
      <FlatList
        data={promociones}
        renderItem={renderPromocion}
        keyExtractor={(item) => item.id.toString()}
      />
      <TouchableOpacity
        style={styles.registrarButton}
        onPress={() => handleRegistrarCliente()}
      >
        <Text style={styles.registrarText}>Registrar Cliente</Text>
      </TouchableOpacity>
      {role === "admin" && (
        <>
          <TouchableOpacity
            style={styles.addButton}
            onPress={handleAgregarPromocion}
          >
            <Text style={styles.addText}>Agregar Promoción</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => navigation.navigate("Registrar Mesero")}
          >
            <Text style={styles.addText}>Registrar Mesero</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    marginTop: 10,
    padding: 10,
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  username: {
    color: "#FF0059", // rojo
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  titulo: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#FF0059", // Color de TikTok
  },
  card: {
    backgroundColor: "#f9f9f9",
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  nombre: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  estado: {
    marginTop: 5,
    color: "#666",
  },
  iconButton: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    marginLeft: 8,
    fontSize: 14,
    color: "#FF0059",
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FF0059",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  logoutText: {
    color: "#fff",
    marginLeft: 5,
  },
  registrarButton: {
    backgroundColor: "#FF0059",
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 10,
  },
  registrarText: {
    color: "#fff",
    fontSize: 16,
  },
  addButton: {
    backgroundColor: "#FF0059",
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 10,
  },
  addText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default PromocionesScreen;
