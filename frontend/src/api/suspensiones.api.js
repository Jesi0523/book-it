import apiClient from './apiClient';

// GET suspensiones
export const getSuspensiones = async (mes, anio) => {
  try {
    let url = '/suspensiones';
    const queryParams = [];

    if (mes) queryParams.push(`mes=${mes}`);
    if (anio) queryParams.push(`anio=${anio}`);

    if (queryParams.length > 0) {
      url += `?${queryParams.join('&')}`;
    }

    const { data } = await apiClient.get(url);
    return data;
  } catch (error) {
    if (error.response) {
      throw error.response.data?.msg || 'Error al obtener las suspensiones.';
    } else if (error.request) {
      throw 'No hay conexión con el servidor.';
    } else {
      throw 'Error inesperado al cargar las suspensiones.';
    }
  }
};