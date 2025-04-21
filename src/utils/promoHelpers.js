import { Alert } from "react-native";
import { obtenerPromociones, togglePromocion } from "../services/api";

export const fetchPromocionesPorRol = async (token, role) => {
  const data = await obtenerPromociones(token, role);
  return role === "mesero" ? data.filter(p => p.activa) : data;
};

export const cambiarEstadoPromocion = async (id, estadoActual, promociones, setPromociones) => {
  await togglePromocion(id, estadoActual);
  Alert.alert(
    "Éxito",
    `Promoción ${estadoActual ? "desactivada" : "activada"} correctamente.`
  );
  const updatedPromos = promociones.map((promo) =>
    promo.id === id ? { ...promo, activa: !estadoActual } : promo
  );
  setPromociones(updatedPromos);
};