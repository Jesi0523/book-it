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

// POST empleado
export const createEmpleado = async (payload) => {
  try {
    const { data } = await apiClient.post('/empleados', payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return data;
  } catch (error) {
    if (error.response) {
      throw error.response.data?.msg || 'Error al crear el empleado.';
    } else if (error.request) {
      throw 'No hay conexión con el servidor.';
    } else {
      throw 'Error inesperado al crear el empleado.';
    }
  }
};