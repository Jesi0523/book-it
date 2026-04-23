import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // URL del backend
  withCredentials: true, // Manejo de coookies para el accessToken y refreshToken
  headers: {
    'Content-Type': 'application/json', // Todo lo que se envie sera JSON
  },
});

// A cada peticion, se agregara el token
apiClient.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('token');

    // Si existe el token, se agregara al request
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default apiClient;
