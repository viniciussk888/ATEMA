import axios from 'axios';

const apiAtema = axios.create({
  baseURL: 'https://atema-backend.herokuapp.com',
});

export default apiAtema; 
