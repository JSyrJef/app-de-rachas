import { useState, useEffect } from "react";
import {
  agregarPromocion,
  editarPromocion,
  obtenerPromocionPorId,
} from "../services/api";

export const usePromocionForm = (promocionId, navigation) => {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [activa, setActiva] = useState(true);

  useEffect(() => {
    if (promocionId) {
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
        await editarPromocion(promocionId, promocion);
        alert("Promoción actualizada correctamente");
      } else {
        await agregarPromocion(promocion);
        alert("Promoción creada correctamente");
      }

      navigation.goBack();
    } catch (error) {
      alert("Hubo un problema al guardar la promoción.");
      console.error("Error al guardar promoción:", error);
    }
  };

  return {
    nombre,
    setNombre,
    descripcion,
    setDescripcion,
    activa,
    handleSubmit,
  };
};