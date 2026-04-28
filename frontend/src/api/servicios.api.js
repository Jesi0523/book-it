import apiClient from './apiClient';

// GET servicios
export const getServicios = async () => {
  try {
    const { data } = await apiClient.get('/servicios');
    return data;
  } catch (error) {
    if (error.response) {
      throw error.response.data?.msg || 'Error al obtener los servicios';
    } else if (error.request) {
      throw 'No hay conexión con el servidor.';
    } else {
      throw 'Error inesperado al cargar servicios.';
    }
  }
};
