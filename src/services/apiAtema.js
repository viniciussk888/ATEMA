import axios from 'axios';

const apiAtema = axios.create({
  baseURL: 'http://64.227.18.52',
});

export default apiAtema; 