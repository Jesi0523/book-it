import apiClient from './apiClient';

export const loginUser = async (credentials) => {
  try {
    const { data } = await apiClient.post('/auth/login', credentials, {
      withCredentials: true,
    });
    return data;
  } catch (error) {
    // Usuario no encontrado
    if (error.response) {
      throw error.response.data?.msg || 'Error al validar las credenciales';
    }

    // No hay conexion con el servidor
    else if (error.request) {
      throw 'No hay conexión con el servidor. Verifica tu internet o intenta más tarde.';
    }

    // Error de react o axios
    else {
      throw 'Ocurrió un error inesperado. Intenta de nuevo.';
    }
  }
};
