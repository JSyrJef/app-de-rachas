import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { storeTokens } from "./storage";

// Configuracion base para conectarse al backend
const API = axios.create({
  baseURL: "https://backend-app-rachas.onrender.com/api", // URL del backend
  headers: {
    "Content-Type": "application/json",
  },
});

API.interceptors.request.use(
  async (config) => {
    console.log("Haciendo solicitud a:", config.url);
    const token = await AsyncStorage.getItem("access");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Si el token expiró y no es un reintento
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refresh = await AsyncStorage.getItem("refresh");
        if (!refresh) throw new Error("No hay refresh token");

        const response = await API.post("/token/refresh/", {
          refresh,
        });

        const { access } = response.data;
        await AsyncStorage.setItem("access", access);
        API.defaults.headers.common["Authorization"] = `Bearer ${access}`;
        originalRequest.headers["Authorization"] = `Bearer ${access}`;

        return API(originalRequest); // Reintenta con nuevo token
      } catch (err) {
        console.log("No se pudo renovar el token", err);
        await AsyncStorage.multiRemove(["access", "refresh", "role"]);
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

// obtener promociones para meseros y administradores
export const obtenerPromociones = async (token, rol) => {
  try {
    const endpoint =
      rol === "admin" ? "/promociones/" : "/promociones/lista/";

    console.log("Haciendo solicitud a:", endpoint);

    const respuesta = await API.get(endpoint, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Promociones recibidas:", respuesta.data);
    return respuesta.data;
  } catch (error) {
    console.error("Error al obtener promociones:", error);
    throw error;
  }
};

// Obtener una promoción por ID
export const obtenerPromocionPorId = async (id) => {
  const response = await API.get(`/promociones/${id}/`);
  return response.data;
};

// Agregar nueva promoción
export const agregarPromocion = async (promocionData) => {
  const response = await API.post("/promociones/", promocionData);
  return response.data;
};

// Editar promoción existente
export const editarPromocion = async (id, promocionData) => {
  const response = await API.put(`/promociones/${id}/`, promocionData);
  return response.data;
};

// Activar y desactivar promociones
export const togglePromocion = async (id, estadoActual) => {
  const response = await API.patch(`/promociones/${id}/`, { activa: !estadoActual });
  return response.data;
};

// Funcion para registrar un cliente en el backend
export const registrarCliente = async (clienteData) => {
  const response = await API.post("/clientes/", clienteData);
  return response.data;
};

// Función para registrar un nuevo usuario
export const registrarUsuario = async (usuarioData) => {
  const response = await API.post("/register/", usuarioData);
  return response.data;
};

// Función para iniciar sesión
export const iniciarSesion = async (loginData) => {
  try {
    console.log("Datos enviados:", loginData);

    //Borra cualquier token viejo ANTES del login
    await AsyncStorage.multiRemove(['access', 'refresh', 'role']);
    delete API.defaults.headers.common['Authorization'];

    const response = await API.post("/login/", loginData);
    const { access, refresh, role } = response.data;
    await storeTokens(access, refresh); // Guardar tokens en AsyncStorage

    await AsyncStorage.multiSet([
      ['access', access],
      ['refresh', refresh],
      ['role', role],
    ]);

    API.defaults.headers.common['Authorization'] = `Bearer ${access}`;

    return response.data;
  } catch (error) {
    console.log("Error en login:", error.response?.data || error.message);
    throw error;
  }
};

// Función para verificar promociones basadas en el usuario de TikTok
export const verificarPromociones = async (usuarioTikTok) => {
  const response = await API.get(`/verificar-promociones/${usuarioTikTok}/`);
  return response.data;
};

// Funcion para obtener un nuevo access token usando el refresh token
export const obtenerNuevoAccessToken = async () => {
  const refreshToken = await getRefreshToken();
  if (!refreshToken) throw new Error("No hay refresh token disponible");

  try {
    const response = await API.post("/token/refresh/", { refresh: refreshToken });

    const newAccessToken = response.data.access;
    const newRefreshToken = response.data.refresh; // Si la API devuelve un nuevo refresh token

    if (!newAccessToken) {
      throw new Error("No se obtuvo un nuevo access token.");
    }

    await storeTokens(newAccessToken, newRefreshToken || refreshToken); // Almacena el nuevo access token y refresh token (si disponible)
    
    return newAccessToken;
  } catch (error) {
    console.error("Error al obtener nuevo access token:", error);
    throw new Error('Error al renovar el token');
  }
};

