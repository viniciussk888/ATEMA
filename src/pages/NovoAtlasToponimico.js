import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Grid,
  Typography,
  TextField,
  FormControl,
  Select,
  InputLabel,
  Button,
  Card,
  Container,
  Autocomplete
} from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
import Clear from '@material-ui/icons/Clear';

import apiMeso from '../services/apiMeso';
import apiMun from '../services/apiMun';
import apiAtema from '../services/apiAtema';
import mesorregioes from '../utils/mesorregioes.json';
import Page from '../components/Page';
import { toast } from 'react-toastify';

export default function NovoAtlasToponimico() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [microrregioes, setMicrorregioes] = useState([]);
  const [municipios, setMunicipios] = useState([]);
  const [options, setOptions] = useState({
    elementos: [],
    linguas: [],
    etimologias: [],
    taxonomias: []
  });

  const [formData, setFormData] = useState({
    codMeso: '',
    microrregiao: '',
    municipio: '',
    elementogeografico: '',
    toponimo: '',
    variante: '',
    tipo: 'Humano',
    area: 'Urbana',
    linguaOrigem: '',
    etimologia: '',
    etimologiaEsc: '',
    taxionomia: '',
    estruturaMorfologica: '',
    referencias: '',
    fonte: '',
    dataColeta: 'Não Informado',
    responsavel: '',
    revisor: '',
    observacoes: ''
  });

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const inverterData = (str) => {
    if (str && str !== 'Não Informado') {
      const [y, m, d] = str.split('-');
      return `${d}/${m}/${y}`;
    }
    return str;
  };

  const resetForm = () => {
    setFormData({
      codMeso: '',
      microrregiao: '',
      municipio: '',
      elementogeografico: '',
      toponimo: '',
      variante: '',
      tipo: 'Humano',
      area: 'Urbana',
      linguaOrigem: '',
      etimologia: '',
      etimologiaEsc: '',
      taxionomia: '',
      estruturaMorfologica: '',
      referencias: '',
      fonte: '',
      dataColeta: 'Não Informado',
      responsavel: '',
      revisor: '',
      observacoes: ''
    });
    window.scrollTo(0, 0);
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

  // 🔹 Busca selects iniciais
  useEffect(() => {
    (async () => {
      try {
        const [elem, ling, eti, tax] = await Promise.all([
          apiAtema.get('elemento'),
          apiAtema.get('lingua'),
          apiAtema.get('etimologia'),
          apiAtema.get('taxonomia')
        ]);
        setOptions({
          elementos: elem.data,
          linguas: ling.data,
          etimologias: eti.data,
          taxonomias: tax.data
        });
      } catch (e) {
        toast.error('Erro ao carregar selects');
      }
    })();
  }, []);

  // 🔹 Verifica permissão
  useEffect(() => {
    const insert = sessionStorage.getItem('@atema#insert');
    const admin = sessionStorage.getItem('@atema#admin');
    if (admin === '0' && insert === '0') {
      toast.error('Você não tem permissão para acessar essa página');
      navigate('atlas', { replace: true });
    }
  }, [navigate]);

  // 🔹 Busca microrregiões
  useEffect(() => {
    if (!formData.codMeso) return;
    const [id] = formData.codMeso.split('-');
    apiMeso.get(`${id}/microrregioes`).then((res) => setMicrorregioes(res.data));
  }, [formData.codMeso]);

  // 🔹 Busca municípios
  useEffect(() => {
    if (!formData.microrregiao) return;
    const [id] = formData.microrregiao.split('-');
    apiMun.get(`${id}/municipios`).then((res) => setMunicipios(res.data));
  }, [formData.microrregiao]);

  const submitData = async () => {
    const { codMeso, microrregiao, municipio, toponimo } = formData;
    console.log(formData);
    if (!codMeso || !microrregiao || !municipio || !toponimo) {
      toast.error('Dados de Região e Topônimo são necessários!');
      return;
    }
    setLoading(true);

    const meso = codMeso.split('-')[1];
    const micro = microrregiao.split('-')[1];

    try {
      await apiAtema.post('atema', {
        ...formData,
        mesorregiao: meso,
        microrregiao: micro,
        dataColeta: inverterData(formData.dataColeta)
      });
      toast.success('Dados enviados com sucesso!');
      resetForm();
    } catch (err) {
      toast.error('Erro ao enviar dados');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Page title="Novo Atlas Toponímico | ATEMA">
      <Container>
        <Typography variant="h4" gutterBottom>
          Informe os dados toponímicos
        </Typography>
        <Card style={{ marginBottom: 16, marginTop: 24 }}>
          <div style={{ padding: 24 }}>
            <Grid container spacing={3}>
              {/* Mesorregião */}
              <Grid item xs={12} sm={4}>
                <FormControl variant="filled" fullWidth>
                  <InputLabel>Mesorregião</InputLabel>
                  <Select native value={formData.codMeso} onChange={handleChange('codMeso')}>
                    <option disabled value=""></option>
                    {mesorregioes.map((item) => (
                      <option key={item.codigo} value={`${item.codigo}-${item.nome}`}>
                        {item.nome}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              {/* Microrregião */}
              <Grid item xs={12} sm={4}>
                <FormControl variant="filled" fullWidth>
                  <InputLabel>Microrregião</InputLabel>
                  <Select
                    native
                    value={formData.microrregiao}
                    onChange={handleChange('microrregiao')}
                  >
                    <option disabled value=""></option>
                    {microrregioes.map((item) => (
                      <option key={item.id} value={`${item.id}-${item.nome}`}>
                        {item.nome}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              {/* Município */}
              <Grid item xs={12} sm={4}>
                <FormControl variant="filled" fullWidth>
                  {/* <InputLabel>Município</InputLabel>
                  <Select native value={formData.municipio} onChange={handleChange('municipio')}>
                    <option disabled value=""></option>
                    {municipios.map((item) => (
                      <option key={item.nome} value={item.nome}>
                        {item.nome}
                      </option>
                    ))}
                  </Select> */}
                  <Autocomplete
                    id="Município"
                    value={formData.municipio}
                    onChange={(_event, value) => {
                      setFormData((prev) => ({ ...prev, municipio: value }));
                    }}
                    options={municipios.map((item) => item.nome)}
                    renderInput={(params) => <TextField {...params} label="Município" />}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={4}>
                <FormControl variant="filled" fullWidth>
                  {/* {/* <InputLabel>Elemento Geográfico</InputLabel> */}
                  <Autocomplete
                    id="Elemento Geográfico"
                    onChange={(_event, value) => {
                      setFormData((prev) => ({ ...prev, elementogeografico: value }));
                    }}
                    options={options.elementos.map((item) => item.name)}
                    renderInput={(params) => <TextField {...params} label="Elemento Geográfico" />}
                  />
                  {/* <Select
                    native
                    value={formData.elementogeografico}
                    onChange={handleChange('elementogeografico')}
                  >
                    <option disabled value=""></option>
                    {options.elementos.map((item) => (
                      <option key={item.name} value={item.name}>
                        {item.name}
                      </option>
                    ))}
                  </Select> */}
                </FormControl>
              </Grid>

              {/* Topônimo */}
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  required
                  label="Topônimo"
                  variant="outlined"
                  value={formData.toponimo}
                  onChange={handleChange('toponimo')}
                />
              </Grid>

              {/* Variante */}
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Variante"
                  variant="outlined"
                  value={formData.variante}
                  onChange={handleChange('variante')}
                />
              </Grid>

              {/* Tipo */}
              <Grid item xs={12} sm={4}>
                <FormControl variant="filled" fullWidth>
                  <InputLabel>Tipo</InputLabel>
                  <Select native value={formData.tipo} onChange={handleChange('tipo')}>
                    <option value="Humano">Humano</option>
                    <option value="Físico">Físico</option>
                  </Select>
                </FormControl>
              </Grid>

              {/* Área */}
              <Grid item xs={12} sm={4}>
                <FormControl variant="filled" fullWidth>
                  <InputLabel>Área</InputLabel>
                  <Select native value={formData.area} onChange={handleChange('area')}>
                    <option value="Urbana">Urbana</option>
                    <option value="Rural">Rural</option>
                  </Select>
                </FormControl>
              </Grid>

              {/* Língua de Origem */}
              <Grid item xs={12} sm={4}>
                <FormControl variant="filled" fullWidth>
                  {/* <InputLabel>Língua de Origem</InputLabel>
                  <Select
                    native
                    value={formData.linguaOrigem}
                    onChange={handleChange('linguaOrigem')}
                  >
                    <option disabled value=""></option>
                    {options.linguas.map((item) => (
                      <option key={item.name} value={item.name}>
                        {item.name}
                      </option>
                    ))}
                  </Select> */}
                  <Autocomplete
                    id="Língua de Origem"
                    value={formData.linguaOrigem}
                    onChange={(_event, value) => {
                      setFormData((prev) => ({ ...prev, linguaOrigem: value }));
                    }}
                    options={options.linguas.map((item) => item.name)}
                    renderInput={(params) => <TextField {...params} label="Língua de Origem" />}
                  />
                </FormControl>
              </Grid>

              {/* Taxonomia */}
              <Grid item xs={12} sm={4}>
                <FormControl variant="filled" fullWidth>
                  {/* <InputLabel>Taxonomia</InputLabel>
                  <Select native value={formData.taxionomia} onChange={handleChange('taxionomia')}>
                    <option disabled value=""></option>
                    {options.taxonomias.map((item) => (
                      <option key={item.name} value={item.name}>
                        {item.name}
                      </option>
                    ))}
                  </Select> */}
                  <Autocomplete
                    id="Taxonomia"
                    onChange={(_event, value) => {
                      setFormData((prev) => ({ ...prev, taxionomia: value }));
                    }}
                    options={options.taxonomias.map((item) => item.name)}
                    renderInput={(params) => <TextField {...params} label="Taxonomia" />}
                  />
                </FormControl>
              </Grid>

              {/* Estrutura Morfológica */}
              <Grid item xs={12} sm={4}>
                <FormControl variant="filled" fullWidth>
                  <InputLabel>Estrutura Morfológica</InputLabel>
                  <Select
                    native
                    value={formData.estruturaMorfologica}
                    onChange={handleChange('estruturaMorfologica')}
                  >
                    <option disabled value=""></option>
                    <option value="Simples">Simples</option>
                    <option value="Composto">Composto</option>
                    <option value="Simples híbrido">Simples híbrido</option>
                    <option value="Composto híbrido">Composto híbrido</option>
                  </Select>
                </FormControl>
              </Grid>

              {/* Etimologia */}
              <Grid item xs={12} sm={4}>
                <FormControl variant="filled" fullWidth>
                  {/* <InputLabel>Etimologia</InputLabel>
                  <Select native value={formData.etimologia} onChange={handleChange('etimologia')}>
                    <option disabled value=""></option>
                    {options.etimologias.map((item) => (
                      <option key={item.name} value={item.name}>
                        {item.name}
                      </option>
                    ))}
                  </Select> */}
                  <Autocomplete
                    id="Etimologia"
                    onChange={(_event, value) => {
                      setFormData((prev) => ({ ...prev, etimologia: value }));
                    }}
                    options={options.etimologias.map((item) => item.name)}
                    renderInput={(params) => <TextField {...params} label="Etimologia" />}
                  />
                </FormControl>
              </Grid>

              {/* Campos de texto adicionais */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Etimologia detalhada"
                  variant="outlined"
                  value={formData.etimologiaEsc}
                  onChange={handleChange('etimologiaEsc')}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Referências"
                  variant="outlined"
                  value={formData.referencias}
                  onChange={handleChange('referencias')}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Fonte (dados do mapa)"
                  variant="outlined"
                  value={formData.fonte}
                  onChange={handleChange('fonte')}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  type="date"
                  label="Data da coleta"
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                  value={formData.dataColeta}
                  onChange={handleChange('dataColeta')}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Responsável pela coleta"
                  variant="outlined"
                  value={formData.responsavel}
                  onChange={handleChange('responsavel')}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Revisor"
                  variant="outlined"
                  value={formData.revisor}
                  onChange={handleChange('revisor')}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Observações"
                  variant="outlined"
                  value={formData.observacoes}
                  onChange={handleChange('observacoes')}
                />
              </Grid>

              {/* Botões */}
              <Grid item xs={12} sm={6}>
                <Button
                  fullWidth
                  variant="contained"
                  color="secondary"
                  size="large"
                  startIcon={<Clear />}
                  onClick={resetForm}
                >
                  LIMPAR
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <LoadingButton
                  fullWidth
                  variant="contained"
                  size="large"
                  loading={loading}
                  onClick={submitData}
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
