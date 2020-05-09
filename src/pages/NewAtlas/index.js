import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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

import apiMeso from "../../services/apiMeso";
import apiMun from "../../services/apiMun";
import mesorregioes from '../../utils/mesorregioes.json'
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table'

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
    minWidth: 320,
  },
}));

export default function NewAtlas() {
  //states buscas API
  const [microrregioes, setMicorregioes] = useState([]);
  const [municipios, setMunicipios] = useState([]);
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
  const [taxionomia, setTaxionomia] = useState("");
  const [estruturaMorfologica, setEstruturaMorfologica] = useState("");
  const [referencias, setReferencias] = useState("");
  const [fonte, setFonte] = useState("");
  const [dataColeta, setDataColeta] = useState();
  const [responsavel, setResponsavel] = useState("");
  const [revisor, setRevisor] = useState("");
  const [observacoes, setObservacoes] = useState("");

  const [modalShow, setModalShow] = React.useState(false);

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

  function submitData() {
    alert("mesorregiao-" + codMeso + "\n" +
      "microrregiao-" + microrregiao + "\n" +
      "municipio-" + municipio + "\n" +
      "toponimo-" + toponimo + "\n" +
      "variante-" + variante + "\n" +
      "tipo-" + tipo + "\n" +
      "area-" + area + "\n" +
      "linguaOrigem-" + linguaOrigem + "\n" +
      "etimologia-" + etimologia + "\n" +
      "taxionomia-" + taxionomia + "\n" +
      "estruturaMorfologica-" + estruturaMorfologica + "\n" +
      "referencias-" + referencias + "\n" +
      "fonte-" + fonte + "\n" +
      "dataColeta-" + dataColeta + "\n" +
      "responsavel-" + responsavel + "\n" +
      "revisor-" + revisor + "\n" +
      "observacoes-" + observacoes + "\n")
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
            <strong>Observações</strong>
            <p>{observacoes}</p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}
            variant="contained"
            color="primary"
            className={classes.button}
            endIcon={<Icon>send</Icon>}
          >Enviar </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  const classes = useStyles();
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


              <Grid item xs={12} sm={2}>
                <TextField
                  id="elementogeografico"
                  name="elementogeografico"
                  label="Elemento geográfico"
                  defaultValue={elementogeografico}
                  variant="outlined"
                  fullWidth
                  onChange={(e) => setElementogeografico(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={2}>
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
                <TextField
                  required
                  id="tipo"
                  name="tipo"
                  label="Tipo"
                  defaultValue={tipo}
                  variant="outlined"
                  fullWidth
                  onChange={(e) => setTipo(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <TextField id="area"
                  name="area"
                  label="Área"
                  fullWidth
                  variant="outlined"
                  defaultValue={area}
                  onChange={(e) => setArea(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <TextField id="linguaorigem"
                  name="linguaorigem"
                  label="Língua de Origem"
                  fullWidth
                  variant="outlined"
                  onChange={(e) => setLinguaOrigem(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  id="etimologia"
                  name="etimologia"
                  label="Etimologia"
                  fullWidth
                  variant="outlined"
                  onChange={(e) => setEtimologia(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  required
                  id="taxionomia"
                  name="taxionomia"
                  label="Taxionomia"
                  variant="outlined"
                  fullWidth
                  onChange={(e) => setTaxionomia(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  id="Estrutura"
                  name="Estrutura"
                  label="Estrutura morfológica"
                  variant="outlined"
                  fullWidth
                  onChange={(e) => setEstruturaMorfologica(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  id="referencias"
                  name="referencias"
                  label="Referências"
                  variant="outlined"
                  fullWidth
                  onChange={(e) => setReferencias(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
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
              <Grid item xs={12} sm={5}>
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