import apiClient from './apiClient';

// GET empresa
export const getEmpresa = async () => {
  try {
    const { data } = await apiClient.get('/empresa');
    return data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// PATCH empresa
export const updateEmpresa = async (payload) => {
  try {
    const { data } = await apiClient.patch('/empresa', payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return data;
  } catch (error) {
    throw error.response?.data?.msg || error.message;
  }
};