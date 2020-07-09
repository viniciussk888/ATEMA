import axios from 'axios';

const apiAtema = axios.create({
  baseURL: 'https://atema.net.br',
});

export default apiAtema; 