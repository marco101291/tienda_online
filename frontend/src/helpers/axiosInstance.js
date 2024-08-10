import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3001', // Aquí configuras la base URL
});

export default axiosInstance;
