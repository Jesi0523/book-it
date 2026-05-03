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
