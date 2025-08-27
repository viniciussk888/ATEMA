import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

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
  Skeleton
} from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
import Clear from '@material-ui/icons/Clear';

import apiMeso from '../services/apiMeso';
import apiMun from '../services/apiMun';
import apiAtema from '../services/apiAtema';
import mesorregioes from '../utils/mesorregioes.json';
import Page from '../components/Page';
import { toast } from 'react-toastify';

export default function EditaAtlasToponimico() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loadingDados, setLoadingDados] = useState(true);

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

  // Normaliza para valor aceitável pelo <input type="date">
  const normalizaDataParaInput = (valor) => {
    if (!valor || valor === 'Não Informado') return '';
    // aceita "YYYY-MM-DD", "YYYY-MM-DDTHH:mm", "YYYY-MM-DD HH:mm", "DD/MM/YYYY"
    if (/^\d{2}\/\d{2}\/\d{4}$/.test(valor)) {
      const [d, m, y] = valor.split('/');
      return `${y}-${m}-${d}`;
    }
    const apenasData = valor.split('T')[0].split(' ')[0];
    return apenasData;
  };

  // Converte para dd/mm/yyyy antes de enviar (mantém seu comportamento anterior)
  const inverterData = (str) => {
    if (!str || str === 'Não Informado') return str;
    // aqui chega "YYYY-MM-DD"
    const [y, m, d] = str.split('-');
    return `${d}/${m}/${y}`;
  };

  const resetForm = () =>
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

  // Helpers para achar o value correto dos selects
  const montarValorMeso = (mesoDoRegistro) => {
    if (!mesoDoRegistro) return '';
    const m = mesorregioes.find(
      (x) => x.nome === mesoDoRegistro || String(x.codigo) === String(mesoDoRegistro)
    );
    return m ? `${m.codigo}-${m.nome}` : '';
  };

  const montarValorMicro = (lista, microDoRegistro) => {
    if (!microDoRegistro) return '';
    const mi = lista.find(
      (x) => x.nome === microDoRegistro || String(x.id) === String(microDoRegistro)
    );
    return mi ? `${mi.id}-${mi.nome}` : '';
  };

  // 🔹 Busca selects iniciais estáticos
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
      } catch {
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

  // 🔹 Busca microrregiões quando escolhe meso (uso manual)
  useEffect(() => {
    if (!formData.codMeso) return;
    const [idMeso] = formData.codMeso.split('-');
    apiMeso.get(`${idMeso}/microrregioes`).then((res) => setMicrorregioes(res.data));
  }, [formData.codMeso]);

  // 🔹 Busca municípios quando escolhe micro (uso manual)
  useEffect(() => {
    if (!formData.microrregiao) return;
    const [idMicro] = formData.microrregiao.split('-');
    apiMun.get(`${idMicro}/municipios`).then((res) => setMunicipios(res.data));
  }, [formData.microrregiao]);

  // 🔹 Pré-preenchimento encadeado para edição
  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const { data: registro } = await apiAtema.get(`atema/${id}`);

        // 1) Mesorregião: descobre o value "codigo-nome"
        const valorMeso = montarValorMeso(registro.mesorregiao ?? registro.codMeso);
        let novasMicros = [];
        let valorMicro = '';

        if (valorMeso) {
          const [codigoMeso] = valorMeso.split('-');
          const resMicros = await apiMeso.get(`${codigoMeso}/microrregioes`);
          novasMicros = resMicros.data || [];
          setMicrorregioes(novasMicros);

          // 2) Microrregião: descobre o value "id-nome"
          valorMicro = montarValorMicro(novasMicros, registro.microrregiao);
          if (valorMicro) {
            const [idMicro] = valorMicro.split('-');
            const resMuns = await apiMun.get(`${idMicro}/municipios`);
            setMunicipios(resMuns.data || []);
          }
        }

        setFormData((prev) => ({
          ...prev,
          codMeso: valorMeso, // "codigo-nome"
          microrregiao: valorMicro, // "id-nome"
          municipio: registro.municipio || '',
          elementogeografico: registro.elementogeografico || '',
          toponimo: registro.toponimo || '',
          variante: registro.variante || '',
          tipo: registro.tipo || 'Humano',
          area: registro.area || 'Urbana',
          linguaOrigem: registro.linguaOrigem || '',
          etimologia: registro.etimologia || '',
          etimologiaEsc: registro.etimologiaEsc || '',
          taxionomia: registro.taxionomia || '',
          estruturaMorfologica: registro.estruturaMorfologica || '',
          referencias: registro.referencias || '',
          fonte: registro.fonte || '',
          dataColeta: (() => {
            const v = normalizaDataParaInput(registro.dataColeta);
            return v || 'Não Informado';
          })(),
          responsavel: registro.responsavel || '',
          revisor: registro.revisor || '',
          observacoes: registro.observacoes || ''
        }));
      } catch (e) {
        toast.error('Erro ao carregar os dados para edição');
      } finally {
        setLoadingDados(false);
      }
    })();
  }, [id]);

  const submitData = async () => {
    const { codMeso, microrregiao, municipio, toponimo } = formData;
    if (!codMeso || !microrregiao || !municipio || !toponimo) {
      toast.error('Dados de Região e Topônimo são necessários!');
      return;
    }
    setLoading(true);

    const meso = codMeso.split('-')[1]; // envia NOME da meso (mantive seu padrão)
    const micro = microrregiao.split('-')[1];

    try {
      const payload = {
        ...formData,
        mesorregiao: meso,
        microrregiao: micro,
        dataColeta:
          formData.dataColeta === 'Não Informado' || formData.dataColeta === ''
            ? 'Não Informado'
            : inverterData(formData.dataColeta) // dd/mm/yyyy
      };

      if (id) {
        await apiAtema.put(`atema/${id}`, payload);
        toast.success('Dados atualizados com sucesso!');
      } else {
        await apiAtema.post('atema', payload);
        toast.success('Dados enviados com sucesso!');
        resetForm();
      }
    } catch (err) {
      toast.error('Erro ao salvar dados');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Page title="Editar Atlas Toponímico | ATEMA">
      <Container>
        <Typography variant="h4" gutterBottom>
          {id ? 'Editar dados toponímicos' : 'Novo Atlas Toponímico'}
        </Typography>
        <Card style={{ marginBottom: 16, marginTop: 24 }}>
          {loadingDados ? (
            <Skeleton variant="rectangular" height={600} style={{ margin: 24 }} />
          ) : (
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
                    <InputLabel>Município</InputLabel>
                    <Select native value={formData.municipio} onChange={handleChange('municipio')}>
                      <option disabled value=""></option>
                      {municipios.map((item) => (
                        <option key={item.nome} value={item.nome}>
                          {item.nome}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                {/* Elemento Geográfico */}
                <Grid item xs={12} sm={4}>
                  <FormControl variant="filled" fullWidth>
                    <InputLabel>Elemento Geográfico</InputLabel>
                    <Select
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
                    </Select>
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
                    <InputLabel>Língua de Origem</InputLabel>
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
                    </Select>
                  </FormControl>
                </Grid>

                {/* Taxonomia */}
                <Grid item xs={12} sm={4}>
                  <FormControl variant="filled" fullWidth>
                    <InputLabel>Taxonomia</InputLabel>
                    <Select
                      native
                      value={formData.taxionomia}
                      onChange={handleChange('taxionomia')}
                    >
                      <option disabled value=""></option>
                      {options.taxonomias.map((item) => (
                        <option key={item.name} value={item.name}>
                          {item.name}
                        </option>
                      ))}
                    </Select>
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
                    <InputLabel>Etimologia</InputLabel>
                    <Select
                      native
                      value={formData.etimologia}
                      onChange={handleChange('etimologia')}
                    >
                      <option disabled value=""></option>
                      {options.etimologias.map((item) => (
                        <option key={item.name} value={item.name}>
                          {item.name}
                        </option>
                      ))}
                    </Select>
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
                    value={normalizaDataParaInput(formData.dataColeta)}
                    onChange={(e) =>
                      setFormData((p) => ({
                        ...p,
                        dataColeta: e.target.value || 'Não Informado'
                      }))
                    }
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
          )}
        </Card>
      </Container>
    </Page>
  );
}
