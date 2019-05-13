import axios from 'axios';

// create axios instance
const instance = axios.create({
  baseURL: '/api/',
  withCredentials: true
});

instance.interceptors.request.use(config => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.authorization = `Bearer ${token}`;
  }

  return config;
});

export default instance;
