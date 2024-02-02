import axios from 'axios';

const apiAtema = axios.create({
  baseURL: 'https://atema-api.onrender.com',
});

export default apiAtema; 
