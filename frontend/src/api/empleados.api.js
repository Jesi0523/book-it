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

// GET empleado por ID
export const getEmpleado = async (id) => {
  try {
    const { data } = await apiClient.get(`/empleados/admin/${id}`);
    return data;
  } catch (error) {
    if (error.response) {
      throw error.response.data?.msg || 'Error al obtener la ficha del empleado.';
    } else if (error.request) {
      throw 'No hay conexión con el servidor.';
    } else {
      throw 'Error inesperado al cargar la ficha del empleado.';
    }
  }
};

// PATCH empleado
export const updateEmpleado = async (id, payload) => {
  try {
    const { data } = await apiClient.patch(`/empleados/admin/${id}`, payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return data;
  } catch (error) {
    if (error.response) {
      throw error.response.data?.msg || 'Error al actualizar el empleado.';
    } else if (error.request) {
      throw 'No hay conexión con el servidor.';
    } else {
      throw 'Error inesperado al actualizar el empleado.';
    }
  }
};