import apiClient from './apiClient';

// GET empleados
export const getEmpleadosAdmin = async () => {
  try {
    const { data } = await apiClient.get('/empleados/admin');
    return data;
  } catch (error) {
    if (error.response) {
      throw error.response.data?.msg || 'Error al obtener los empleados.';
    } else if (error.request) {
      throw 'No hay conexión con el servidor.';
    } else {
      throw 'Error inesperado al cargar los empleados.';
    }
  }
};
