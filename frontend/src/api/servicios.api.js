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

// GET servicio por ID 
export const getServicio = async (id) => {
  try {
    const { data } = await apiClient.get(`/servicios/${id}`);
    return data;
  } catch (error) {
    if (error.response) {
      throw error.response.data?.msg || 'Error al obtener los datos del servicio.';
    } else if (error.request) {
      throw 'No hay conexión con el servidor.';
    } else {
      throw 'Error inesperado al cargar el servicio.';
    }
  }
};