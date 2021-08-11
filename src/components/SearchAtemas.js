import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import apiMeso from '../services/apiMeso';
import apiMun from '../services/apiMun';
import mesorregioes from '../utils/mesorregioes.json';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';

import { useSelector } from 'react-redux';
import apiAtema from '../services/apiAtema';

export default function SearchAtemas({ setAtemasInfo }) {
  const [microrregioes, setMicorregioes] = useState([]);
  const [municipios, setMunicipios] = useState([]);
  const [codMeso, setCodMeso] = useState(''); //MESOREGIAO COD+NOME
  const [municipio, setMunicipio] = useState('');
  const [microrregiao, setMicrorregiao] = useState('');

  const config = {
    headers: { Authorization: `Bearer ${useSelector((state) => state.token)}` }
  };

  async function filter() {
    if (!codMeso) {
      return alert('Selecione a Mesorregião!');
    }
    try {
      let aux = codMeso.split('-');
      let meso = aux[1];
      let aux2 = microrregiao.split('-');
      let micro = aux2[1];
      const response = await apiAtema.post('filter', {
        mesorregiao: meso,
        microrregiao: micro,
        municipio: municipio
      });
      if (response.status === 200 && response.data.length === 0) {
        setAtemasInfo([]);
        return alert('Nenhuma informação encontrada para região informada!');
      }
      setAtemasInfo(response.data);
    } catch (error) {
      alert('Erro ao filtrar os dados!' + error);
    }
  }

  async function seeAll() {
    try {
      const response = await apiAtema.get('atema', config);
      setAtemasInfo(response.data);
    } catch (error) {
      alert('Erro ao buscar dados!' + error);
    }
  }

  useEffect(() => {
    let aux = codMeso.split('-');
    let id = aux[0];

    async function fetchData() {
      const response = await apiMeso.get(`${id}/microrregioes`);
      setMicorregioes(response.data);
    }
    fetchData();
  }, [codMeso]);

  useEffect(() => {
    let aux = microrregiao.split('-');
    let id = aux[0];

    async function fetchData() {
      const response = await apiMun.get(`${id}/municipios`);
      setMunicipios(response.data);
    }
    fetchData();
  }, [microrregiao]);

  const handleChangeMeso = (event) => {
    setCodMeso(event.target.value);
  };
  const handleChangeMicro = (event) => {
    setMicrorregiao(event.target.value);
  };
  const handleChangeMun = (event) => {
    setMunicipio(event.target.value);
  };

  return (
    <>
      <Grid item xs={12}>
        <Paper>
          <Typography variant="h6" gutterBottom>
            Busca de informações por regiões
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={2}>
              <FormControl variant="filled">
                <InputLabel htmlFor="filled-age-native-simple">Mesorregião</InputLabel>
                <Select required native onChange={handleChangeMeso}>
                  <option selected disabled>
                    Selecione...
                  </option>
                  {mesorregioes.map((item) => (
                    <option value={item.codigo + '-' + item.nome}>{item.nome}</option>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={2}>
              <FormControl variant="filled">
                <InputLabel htmlFor="filled-age-native-simple">Microrregião</InputLabel>
                <Select required native onChange={handleChangeMicro}>
                  <option selected disabled>
                    Selecione...
                  </option>
                  {microrregioes.map((item) => (
                    <option value={item.id + '-' + item.nome}>{item.nome}</option>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={2}>
              <FormControl variant="filled">
                <InputLabel htmlFor="filled-age-native-simple">Município</InputLabel>
                <Select required native onChange={handleChangeMun}>
                  <option selected disabled>
                    Selecione...
                  </option>
                  {municipios.map((item) => (
                    <option value={item.nome}>{item.nome}</option>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6} sm={4}>
              <Button onClick={filter} variant="contained" color="primary">
                BUSCAR
              </Button>
            </Grid>
            <Grid item xs={6} sm={2}>
              <Button onClick={seeAll} variant="contained" color="primary">
                BUSCAR TODOS
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </>
  );
}
