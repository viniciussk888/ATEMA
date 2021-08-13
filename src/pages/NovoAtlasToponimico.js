import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Clear from '@material-ui/icons/Clear';
import Container from '@material-ui/core/Container';
//apis
import apiMeso from '../services/apiMeso';
import apiMun from '../services/apiMun';
import apiAtema from '../services/apiAtema';
import mesorregioes from '../utils/mesorregioes.json';
import { useSelector } from 'react-redux';
import Page from '../components/Page';
import { LoadingButton } from '@material-ui/lab';

export default function NovoAtlasToponimico() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  //states buscas API
  const [microrregioes, setMicorregioes] = useState([]);
  const [municipios, setMunicipios] = useState([]);
  const [selectElemento, setSelectElemento] = useState([]);
  const [selectLingua, setSelectLingua] = useState([]);
  const [selectEtimologia, setSelectEtimologia] = useState([]);
  const [selectTaxonomia, setSelectTaxonomia] = useState([]);

  // select
  const [codMeso, setCodMeso] = useState(''); //MESOREGIAO COD+NOME
  const [municipio, setMunicipio] = useState('');
  const [microrregiao, setMicrorregiao] = useState('');
  // end select
  const [elementogeografico, setElementogeografico] = useState('');
  const [toponimo, setToponimo] = useState('');
  const [variante, setVariante] = useState('');
  const [tipo, setTipo] = useState('Humano');
  const [area, setArea] = useState('Urbana');
  const [linguaOrigem, setLinguaOrigem] = useState('');
  const [etimologia, setEtimologia] = useState('');
  const [etimologiaEsc, setEtimologiaEsc] = useState('');
  const [taxionomia, setTaxionomia] = useState('');
  const [estruturaMorfologica, setEstruturaMorfologica] = useState('');
  const [referencias, setReferencias] = useState('');
  const [fonte, setFonte] = useState('');
  const [dataColeta, setDataColeta] = useState('Não Informado');
  const [responsavel, setResponsavel] = useState('');
  const [revisor, setRevisor] = useState('');
  const [observacoes, setObservacoes] = useState('');

  const config = {
    headers: { Authorization: `Bearer ${useSelector((state) => state.token)}` }
  };

  useEffect(() => {
    async function fetchData() {
      const response = await apiAtema.get('elemento', config);
      setSelectElemento(response.data);
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      const response2 = await apiAtema.get('lingua', config);
      setSelectLingua(response2.data);
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      const response3 = await apiAtema.get('etimologia', config);
      setSelectEtimologia(response3.data);
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const response4 = await apiAtema.get('taxonomia', config);
        setSelectTaxonomia(response4.data);
      } catch (error) {
        alert(error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    const insert = localStorage.getItem('@atema#insert');
    const admin = localStorage.getItem('@atema#admin');
    if (admin === 0 && insert === 0) {
      alert('Sem permissão para a operação!');
      navigate('atlas', { replace: true });
    }
  }, [navigate]);

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
  function inverter(string) {
    if (string !== 'Não Informado') {
      let data = string.split('-');
      return `${data[2]}/${data[1]}/${data[0]}`;
    }
  }

  async function submitData() {
    if (!codMeso || !microrregiao || !municipio || !toponimo) {
      alert('Dados de Região e Toponimo são nescessarios!');
      return;
    }
    setLoading(true);
    let aux = codMeso.split('-');
    let meso = aux[1];
    let aux2 = microrregiao.split('-');
    let micro = aux2[1];
    try {
      const response = await apiAtema.post(
        'atema',
        {
          mesorregiao: meso,
          microrregiao: micro,
          municipio: municipio,
          toponimo: toponimo,
          variante: variante,
          tipo: tipo,
          area: area,
          elementogeografico: elementogeografico,
          linguaOrigem: linguaOrigem,
          etimologia: etimologia,
          etimologiaEsc: etimologiaEsc,
          taxionomia: taxionomia,
          estruturaMorfologica: estruturaMorfologica,
          referencias: referencias,
          fonte: fonte,
          dataColeta: inverter(dataColeta.toString()),
          responsavel: responsavel,
          revisor: revisor,
          observacoes: observacoes
        },
        config
      );
      if (response.status === 200 && response.data) {
        setLoading(false);
        alert('Dados Enviados Com Sucesso!!');
      }
    } catch (error) {
      setLoading(false);
      alert(error);
    }
    setLoading(false);
  }

  function resetData() {
    setElementogeografico('');
    setToponimo('');
    setVariante('');
    setTipo('Humano');
    setArea('Urbana');
    setLinguaOrigem('');
    setEtimologia('');
    setEtimologiaEsc('');
    setTaxionomia('');
    setEstruturaMorfologica('');
    setReferencias('');
    setFonte('');
    setDataColeta('Não Informado');
    setResponsavel('');
    setRevisor('');
    setObservacoes('');
  }

  return (
    <Page title="Novo Atlas Toponímico | ATEMA">
      <Container>
        <Typography variant="h6" gutterBottom>
          <center>Informe os dados toponímico</center>
        </Typography>
        <Card>
          <div
            style={{
              padding: 24
            }}
          >
            <Grid container spacing={3}>
              <Grid item xs={12} sm={4}>
                <FormControl variant="filled">
                  <InputLabel htmlFor="filled-age-native-simple">Mesorregião</InputLabel>
                  <Select required native onChange={handleChangeMeso}>
                    <option selected disabled value="Não selecionada">
                      Selecione...
                    </option>
                    {mesorregioes.map((item) => (
                      <option value={item.codigo + '-' + item.nome}>{item.nome}</option>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormControl variant="filled">
                  <InputLabel htmlFor="filled-age-native-simple">Microrregião</InputLabel>
                  <Select required native onChange={handleChangeMicro}>
                    <option selected disabled value="Não selecionada">
                      Selecione...
                    </option>
                    {microrregioes.map((item) => (
                      <option value={item.id + '-' + item.nome}>{item.nome}</option>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormControl variant="filled">
                  <InputLabel htmlFor="filled-age-native-simple">Município</InputLabel>
                  <Select required native onChange={handleChangeMun}>
                    <option selected disabled value="Não selecionada">
                      Selecione...
                    </option>
                    {municipios.map((item) => (
                      <option value={item.nome}>{item.nome}</option>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={3}>
                <FormControl variant="filled">
                  <InputLabel htmlFor="filled-age-native-simple">Elemento geográfico</InputLabel>
                  <Select required native onChange={(e) => setElementogeografico(e.target.value)}>
                    <option selected disabled></option>
                    {selectElemento.map((item) => (
                      <option value={item.name}>{item.name}</option>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  required
                  id="toponimo"
                  name="toponimo"
                  label="Topônimo"
                  variant="outlined"
                  fullWidth
                  value={toponimo}
                  onChange={(e) => setToponimo(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <TextField
                  id="variante"
                  name="variante"
                  label="Variante"
                  variant="outlined"
                  fullWidth
                  value={variante}
                  onChange={(e) => setVariante(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <FormControl variant="filled">
                  <InputLabel value={tipo} htmlFor="filled-age-native-simple">
                    Tipo
                  </InputLabel>
                  <Select required native onChange={(e) => setTipo(e.target.value)}>
                    <option selected disabled></option>
                    <option value="Humano">Humano</option>
                    <option value="Físico">Físico</option>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={2}>
                <FormControl variant="filled">
                  <InputLabel value={area} htmlFor="filled-age-native-simple">
                    Área
                  </InputLabel>
                  <Select required native onChange={(e) => setArea(e.target.value)}>
                    <option selected disabled></option>
                    <option value="Urbana">Urbana</option>
                    <option value="Rural">Rural</option>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={3}>
                <FormControl variant="filled">
                  <InputLabel value={linguaOrigem} htmlFor="filled-age-native-simple">
                    Língua de Origem
                  </InputLabel>
                  <Select required native onChange={(e) => setLinguaOrigem(e.target.value)}>
                    <option selected disabled></option>
                    {selectLingua.map((item) => (
                      <option value={item.name}>{item.name}</option>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={3}>
                <FormControl variant="filled">
                  <InputLabel value={taxionomia} htmlFor="filled-age-native-simple">
                    Taxonomia
                  </InputLabel>
                  <Select required native onChange={(e) => setTaxionomia(e.target.value)}>
                    <option selected disabled></option>
                    {selectTaxonomia.map((item) => (
                      <option value={item.name}>{item.name}</option>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={3}>
                <FormControl variant="filled">
                  <InputLabel value={estruturaMorfologica} htmlFor="filled-age-native-simple">
                    Estrutura Morfologica
                  </InputLabel>
                  <Select required native onChange={(e) => setEstruturaMorfologica(e.target.value)}>
                    <option selected disabled></option>
                    <option value="Simples">Simples</option>
                    <option value="Composto">Composto</option>
                    <option value="Simples híbrido">Simples híbrido</option>
                    <option value="Composto híbrido">Composto híbrido</option>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={3}>
                <FormControl variant="filled">
                  <InputLabel value={etimologia} htmlFor="filled-age-native-simple">
                    Etimologia
                  </InputLabel>
                  <Select required native onChange={(e) => setEtimologia(e.target.value)}>
                    <option selected disabled></option>
                    {selectEtimologia.map((item) => (
                      <option value={item.name}>{item.name}</option>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  id="esc"
                  name="esc"
                  label="Etimologia"
                  variant="outlined"
                  fullWidth
                  value={etimologiaEsc}
                  onChange={(e) => setEtimologiaEsc(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={5}>
                <TextField
                  id="referencias"
                  name="referencias"
                  label="Referências"
                  variant="outlined"
                  fullWidth
                  value={referencias}
                  onChange={(e) => setReferencias(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  id="fonte"
                  name="fonte"
                  label="Fonte (dados do mapa)"
                  variant="outlined"
                  fullWidth
                  value={fonte}
                  onChange={(e) => setFonte(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <TextField
                  id="date"
                  label="Data da coleta"
                  type="date"
                  variant="outlined"
                  value={dataColeta}
                  InputLabelProps={{
                    shrink: true
                  }}
                  onChange={(e) => setDataColeta(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="Responsável"
                  name="Responsável"
                  label="Responsável pela coleta"
                  variant="outlined"
                  fullWidth
                  value={responsavel}
                  onChange={(e) => setResponsavel(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={5}>
                <TextField
                  id="revisor"
                  name="revisor"
                  label="Revisor"
                  variant="outlined"
                  fullWidth
                  value={revisor}
                  onChange={(e) => setRevisor(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  id="obs"
                  name="obs"
                  label="Observações"
                  variant="outlined"
                  fullWidth
                  value={observacoes}
                  onChange={(e) => setObservacoes(e.target.value)}
                />
              </Grid>
              <Grid item xs={6} sm={6}>
                <Button
                  size="large"
                  fullWidth
                  variant="contained"
                  color="secondary"
                  startIcon={<Clear />}
                  onClick={resetData}
                >
                  LIMPAR
                </Button>
              </Grid>
              <Grid item xs={6} sm={6}>
                <LoadingButton
                  onClick={submitData}
                  fullWidth
                  size="large"
                  variant="contained"
                  loading={loading}
                >
                  GRAVAR
                </LoadingButton>
              </Grid>
            </Grid>
          </div>
        </Card>
      </Container>
    </Page>
  );
}
