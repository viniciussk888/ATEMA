import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import apiMeso from '../services/apiMeso';
import apiMun from '../services/apiMun';
import mesorregioes from '../utils/mesorregioes.json';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';

import { useSelector } from 'react-redux';
import apiAtema from '../services/apiAtema';
import { LoadingButton } from '@material-ui/lab';

export default function SearchAtemas({ setAtemasInfo }) {
  const [microrregioes, setMicorregioes] = useState([]);
  const [municipios, setMunicipios] = useState([]);
  const [codMeso, setCodMeso] = useState(''); //MESOREGIAO COD+NOME
  const [municipio, setMunicipio] = useState('');
  const [microrregiao, setMicrorregiao] = useState('');
  const [isSubmittingAll, setIsSubmittingAll] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const config = {
    headers: { Authorization: `Bearer ${useSelector((state) => state.token)}` }
  };

  async function filter() {
    if (!codMeso) {
      return alert('Selecione a Mesorregião!');
    }
    setIsSubmitting(true);
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
        setIsSubmitting(false);
        return alert('Nenhuma informação encontrada para região informada!');
      }
      setAtemasInfo(response.data);
      setIsSubmitting(false);
    } catch (error) {
      setIsSubmitting(false);
      alert('Erro ao filtrar os dados!' + error);
    }
    setIsSubmitting(false);
  }

  async function seeAll() {
    setIsSubmittingAll(true);
    try {
      const response = await apiAtema.get('atema', config);
      if (response.status === 200 && response.data.length === 0) {
        setAtemasInfo([]);
        setIsSubmittingAll(false);
        return alert('Nenhuma informação encontrada!');
      }
      setAtemasInfo(response.data);
      setIsSubmittingAll(false);
    } catch (error) {
      alert('Erro ao buscar dados!' + error);
      setIsSubmittingAll(false);
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
              <LoadingButton
                onClick={filter}
                size="large"
                variant="contained"
                loading={isSubmitting}
              >
                BUSCAR
              </LoadingButton>
            </Grid>
            <Grid item xs={6} sm={2}>
              <LoadingButton
                onClick={seeAll}
                fullWidth
                size="large"
                variant="contained"
                loading={isSubmittingAll}
              >
                BUSCAR TODOS
              </LoadingButton>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </>
  );
}
