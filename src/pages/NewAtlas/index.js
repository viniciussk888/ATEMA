import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Dashboard from '../../components/Dashboard';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Clear from '@material-ui/icons/Clear'
import ArrowBackIos from '@material-ui/icons/ArrowBackIos'
import IconButton from '@material-ui/core/IconButton'
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table'
//apis
import apiMeso from "../../services/apiMeso";
import apiMun from "../../services/apiMun";
import apiAtema from "../../services/apiAtema";
import mesorregioes from '../../utils/mesorregioes.json'
import { useSelector } from 'react-redux';


const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  button: {
    marginRight: 50
  },
  grid: {
    marginBottom: 5,
    padding: 3
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: '80%',
  },
}));

export default function NewAtlas() {
  const history = useHistory();
  //states buscas API
  const [microrregioes, setMicorregioes] = useState([]);
  const [municipios, setMunicipios] = useState([]);
  const [selectElemento, setSelectElemento] = useState([]);
  const [selectLingua, setSelectLingua] = useState([]);
  const [selectEtimologia, setSelectEtimologia] = useState([]);
  const [selectTaxonomia, setSelectTaxonomia] = useState([]);

  // select
  const [codMeso, setCodMeso] = useState("");//MESOREGIAO COD+NOME
  const [municipio, setMunicipio] = useState("");
  const [microrregiao, setMicrorregiao] = useState("");
  // end select
  const [elementogeografico, setElementogeografico] = useState("Cidade");
  const [toponimo, setToponimo] = useState("");
  const [variante, setVariante] = useState("");
  const [tipo, setTipo] = useState("Humano");
  const [area, setArea] = useState("Urbana");
  const [linguaOrigem, setLinguaOrigem] = useState("");
  const [etimologia, setEtimologia] = useState("");
  const [etimologiaEsc, setEtimologiaEsc] = useState("");
  const [taxionomia, setTaxionomia] = useState("");
  const [estruturaMorfologica, setEstruturaMorfologica] = useState("");
  const [referencias, setReferencias] = useState("");
  const [fonte, setFonte] = useState("");
  const [dataColeta, setDataColeta] = useState("Não Informado");
  const [responsavel, setResponsavel] = useState("");
  const [revisor, setRevisor] = useState("");
  const [observacoes, setObservacoes] = useState("");
  const [modalShow, setModalShow] = React.useState(false);
  const classes = useStyles();

  const config = {
    headers: { Authorization: `Bearer ${useSelector(state => state.token)}` }
  };

  useEffect(() => {
    async function fetchData() {
      const response = await apiAtema.get('elemento', config)
      setSelectElemento(response.data)

      const response2 = await apiAtema.get('lingua', config)
      setSelectLingua(response2.data)

      const response3 = await apiAtema.get('etimologia', config)
      setSelectEtimologia(response3.data)

      const response4 = await apiAtema.get('taxonomia', config)
      setSelectTaxonomia(response4.data)
    }
    fetchData();
  }, []);

  useEffect(() => {
    const insert = localStorage.getItem('insert');
    const admin = localStorage.getItem('admin');
    if (admin == 0 && insert == 0) {
      alert('Sem permissão para a operação!')
      history.push('/atlas')
    }
  }, [])

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

  }, [microrregiao])

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
    if (string !== "Não Informado") {
      let data = string.split('-')
      return `${data[2]}/${data[1]}/${data[0]}`
    }
  }

  async function submitData(props) {
    if (!codMeso || !microrregiao || !municipio || !toponimo) {
      alert("Dados de Região e Toponimo são nescessarios!")
      props.onHide()
      return
    }
    props.onHide()
    let aux = codMeso.split('-');
    let meso = aux[1];
    let aux2 = microrregiao.split('-');
    let micro = aux2[1];
    try {
      const response = await apiAtema.post('atema', {
        mesorregiao: meso,
        microrregiao: micro,
        municipio: municipio,
        toponimo: toponimo,
        variante: variante,
        tipo: tipo,
        area: area,
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
      }, config)
      if (response.data) {
        alert("Dados Enviados Com Sucesso!!")
      }
    } catch (error) {
      alert(error)
    }
  }

  function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Confirma o envio?
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table responsive>
            <thead>
              <tr>
                <th>Mesorregião</th>
                <th>Microrregião</th>
                <th>Município</th>
                <th>Elemento Geográfico</th>
                <th>Topônimo</th>
                <th>Variante</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{codMeso}</td>
                <td>{microrregiao}</td>
                <td>{municipio}</td>
                <td>{elementogeografico}</td>
                <td>{toponimo}</td>
                <td>{variante}</td>
              </tr>
            </tbody>
            <thead>
              <tr>
                <th>Tipo</th>
                <th>Área</th>
                <th>Língua de Origem</th>
                <th>Taxionomia</th>
                <th>Estrutura Morfológica</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{tipo}</td>
                <td>{area}</td>
                <td>{linguaOrigem}</td>
                <td>{taxionomia}</td>
                <td>{estruturaMorfologica}</td>
              </tr>
            </tbody>
            <thead>
              <tr>
                <th>Referências</th>
                <th>Fonte (dados do mapa)</th>
                <th>Data da coleta</th>
                <th>Responsavel pela coleta</th>
                <th>Revisor</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{referencias}</td>
                <td>{fonte}</td>
                <td>{dataColeta}</td>
                <td>{responsavel}</td>
                <td>{revisor}</td>
              </tr>
            </tbody>
          </Table>
          <div className={classes.div}>
            <strong>Etimologia</strong>
            <p>{etimologia}</p>
            <strong>Etimologia - Escrever</strong>
            <p>{etimologiaEsc}</p>
            <strong>Observações</strong>
            <p>{observacoes}</p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => (submitData(props))}
            variant="contained"
            color="primary"
            className={classes.button}
            endIcon={<Icon>send</Icon>}
          >Enviar </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  return (
    <Dashboard>
      <Grid item xs={12} className={classes.grid}>
        <Paper className={classes.paper}>
          <React.Fragment>
            <Typography variant="h6" gutterBottom>
              <Link to='/atlas'>
                <IconButton to="/atlas" aria-label="back">
                  <ArrowBackIos /> Voltar
              </IconButton>
              </Link>
              <center>INFORME OS DADOS</center>
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={4}>
                <FormControl variant="filled" className={classes.formControl}>
                  <InputLabel htmlFor="filled-age-native-simple">Mesorregião</InputLabel>
                  <Select
                    required
                    native
                    onChange={handleChangeMeso}
                  >
                    <option selected disabled value="Não selecionada">Selecione...</option>
                    {mesorregioes.map(item => (
                      <option value={item.codigo + '-' + item.nome}>{item.nome}</option>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormControl variant="filled" className={classes.formControl}>
                  <InputLabel htmlFor="filled-age-native-simple">Microrregião</InputLabel>
                  <Select
                    required
                    native
                    onChange={handleChangeMicro}
                  >
                    <option selected disabled value="Não selecionada">Selecione...</option>
                    {microrregioes.map(item => (
                      <option value={item.id + '-' + item.nome}>{item.nome}</option>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormControl variant="filled" className={classes.formControl}>
                  <InputLabel htmlFor="filled-age-native-simple">Município</InputLabel>
                  <Select
                    required
                    native
                    onChange={handleChangeMun}
                  >
                    <option selected disabled value="Não selecionada">Selecione...</option>
                    {municipios.map(item => (
                      <option value={item.nome}>{item.nome}</option>
                    ))}
                  </Select>
                </FormControl>
              </Grid>


              <Grid item xs={12} sm={3}>
                <FormControl variant="filled" className={classes.formControl}>
                  <InputLabel htmlFor="filled-age-native-simple">Elemento geográfico</InputLabel>
                  <Select
                    required
                    native
                    onChange={(e) => setElementogeografico(e.target.value)}
                  >
                    <option selected disabled></option>
                    {selectElemento.map(item => (
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
                  onChange={(e) => setVariante(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <FormControl variant="filled" className={classes.formControl}>
                  <InputLabel htmlFor="filled-age-native-simple">Tipo</InputLabel>
                  <Select
                    required
                    native
                    onChange={(e) => setTipo(e.target.value)}
                  >
                    <option selected disabled></option>
                    <option value="Humano">Humano</option>
                    <option value="Físico">Físico</option>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={2}>
                <FormControl variant="filled" className={classes.formControl}>
                  <InputLabel htmlFor="filled-age-native-simple">Área</InputLabel>
                  <Select
                    required
                    native
                    onChange={(e) => setArea(e.target.value)}
                  >
                    <option selected disabled></option>
                    <option value="Urbana">Urbana</option>
                    <option value="Rural">Rural</option>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={3}>
                <FormControl variant="filled" className={classes.formControl}>
                  <InputLabel htmlFor="filled-age-native-simple">Língua de Origem</InputLabel>
                  <Select
                    required
                    native
                    onChange={(e) => setLinguaOrigem(e.target.value)}
                  >
                    <option selected disabled></option>
                    {selectLingua.map(item => (
                      <option value={item.name}>{item.name}</option>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={3}>
                <FormControl variant="filled" className={classes.formControl}>
                  <InputLabel htmlFor="filled-age-native-simple">Taxonomia</InputLabel>
                  <Select
                    required
                    native
                    onChange={(e) => setTaxionomia(e.target.value)}
                  >
                    <option selected disabled></option>
                    {selectTaxonomia.map(item => (
                      <option value={item.name}>{item.name}</option>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={3}>
                <FormControl variant="filled" className={classes.formControl}>
                  <InputLabel htmlFor="filled-age-native-simple">Estrutura Morfologica</InputLabel>
                  <Select
                    required
                    native
                    onChange={(e) => setEstruturaMorfologica(e.target.value)}
                  >
                    <option selected disabled></option>
                    <option value="Simples">Simples</option>
                    <option value="Composto">Composto</option>
                    <option value="Simples híbrido">Simples híbrido</option>
                    <option value="Composto híbrido">Composto híbrido</option>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={3}>
                <FormControl variant="filled" className={classes.formControl}>
                  <InputLabel htmlFor="filled-age-native-simple">Etimologia</InputLabel>
                  <Select
                    required
                    native
                    onChange={(e) => setEtimologia(e.target.value)}
                  >
                    <option selected disabled></option>
                    {selectEtimologia.map(item => (
                      <option value={item.name}>{item.name}</option>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  id="esc"
                  name="esc"
                  label="Etimologia - Escrever"
                  variant="outlined"
                  fullWidth
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
                  onChange={(e) => setFonte(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <TextField
                  id="date"
                  label="Data da coleta"
                  type="date"
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,
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
                  onChange={(e) => setObservacoes(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <Button
                  xs={12} sm={12}
                  variant="contained"
                  color="secondary"
                  className={classes.button}
                  startIcon={<Clear />}
                  onClick={() => { window.location.reload() }}
                >
                  Limpar
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  endIcon={<Icon>save</Icon>}
                  onClick={() => setModalShow(true)}
                >
                  Salvar
                </Button>
                <MyVerticallyCenteredModal
                  show={modalShow}
                  onHide={() => setModalShow(false)}
                />
              </Grid>
            </Grid>
          </React.Fragment>
        </Paper>
      </Grid>
    </Dashboard >
  )
}