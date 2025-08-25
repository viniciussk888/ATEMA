import axios from 'axios';

const apiAtema = axios.create({
  baseURL: 'https://atema-api-v2.onrender.com'
});

// interceptor token
apiAtema.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('@atema#token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// interceptor if token erro 401
apiAtema.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Redirecionar para a página de login
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default apiAtema;
