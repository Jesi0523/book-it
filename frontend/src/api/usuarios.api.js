import apiClient from './apiClient';

// GET perfil del usuario
export const getPerfil = async () => {
  try {
    const { data } = await apiClient.get('/usuarios/perfil');
    return data;
  } catch (error) {
    if (error.response) {
      throw error.response.data?.msg || 'Error al obtener el perfil.';
    } else if (error.request) {
      throw 'No hay conexión con el servidor.';
    } else {
      throw 'Error inesperado al cargar el perfil.';
    }
  }
};
