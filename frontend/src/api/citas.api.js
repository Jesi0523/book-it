import apiClient from './apiClient';

// GET disponibilidad de horarios
export const getDisponibilidad = async (fecha, empleadoId, servicioId) => {
  try {
    const url = `/citas/disponibilidad?fecha=${fecha}&empleadoId=${empleadoId}&servicioId=${servicioId}`;
    const { data } = await apiClient.get(url);
    return data;
  } catch (error) {
    if (error.response) {
      throw error.response.data?.msg || 'Error al calcular la disponibilidad.';
    } else if (error.request) {
      throw 'No hay conexión con el servidor.';
    } else {
      throw 'Error inesperado al consultar horarios.';
    }
  }
};

// POST crear cita
export const createCita = async (payload) => {
  try {
    const { data } = await apiClient.post('/citas', payload);
    return data;
  } catch (error) {
    if (error.response) {
      if (typeof error.response.data?.msg === 'object') {
        throw error.response.data.msg; 
      }
      throw error.response.data?.msg || 'Error al agendar la cita.';
    } else if (error.request) {
      throw 'No hay conexión con el servidor.';
    } else {
      throw 'Error inesperado al crear la cita.';
    }
  }
};