import axios from 'axios';

const apiConsultaMeso = axios.create({
  baseURL: 'https://servicodados.ibge.gov.br/api/v1/localidades/mesorregioes/',

});

export default apiConsultaMeso; 
