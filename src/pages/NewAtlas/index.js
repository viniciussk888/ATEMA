import React, { useState, useEffect } from 'react';
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
  // const [mesorregiao, setMesorregiao] = useState("");
  const [codMeso, setCodMeso] = useState("");
  const [municipio, setMunicipio] = useState("");
  const [microrregiao, setMicrorregiao] = useState("");
  const [elementogeografico, setElementogeografico] = useState("Cidade");


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

  const classes = useStyles();
  return (
    <Dashboard>
      <Grid item xs={12} className={classes.grid}>
        <Paper className={classes.paper}>
          <React.Fragment>
            <Typography variant="h6" gutterBottom>
              <IconButton to="/atlas" aria-label="back">
                <ArrowBackIos /> Voltar
              </IconButton> <center>INFORME OS DADOS</center>
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
                      <option value={item.codigo + '-' + item.nome}>{item.codigo + '-' + item.nome}</option>
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
                      <option value={item.id + '-' + item.nome}>{item.id + '-' + item.nome}</option>
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
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <TextField
                  id="variante"
                  name="variante"
                  label="Variante"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <TextField
                  required
                  id="tipo"
                  name="tipo"
                  label="Tipo"
                  defaultValue="Humano"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <TextField id="area"
                  name="area"
                  label="Área"
                  fullWidth
                  variant="outlined"
                  defaultValue="Urbana"
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <TextField id="linguaorigem"
                  name="linguaorigem"
                  label="Língua de Origem"
                  fullWidth
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  id="etimologia"
                  name="etimologia"
                  label="Etimologia"
                  fullWidth
                  variant="outlined"
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
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  id="Estrutura"
                  name="Estrutura"
                  label="Estrutura morfológica"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  id="referencias"
                  name="referencias"
                  label="Referências"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  id="fonte"
                  name="fonte"
                  label="Fonte (dados do mapa)"
                  variant="outlined"
                  fullWidth
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
                />
              </Grid>
              <Grid item xs={12} sm={5}>
                <TextField
                  id="Responsável"
                  name="Responsável"
                  label="Responsável pela coleta"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={5}>
                <TextField
                  id="revisor"
                  name="revisor"
                  label="Revisor"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  id="obs"
                  name="obs"
                  label="Observações"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <Button
                  xs={12} sm={12}
                  variant="contained"
                  color="secondary"
                  className={classes.button}
                  startIcon={<Clear />}
                >
                  Limpar
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  endIcon={<Icon>save</Icon>}
                >
                  Salvar
                </Button>
              </Grid>
            </Grid>
          </React.Fragment>
        </Paper>
      </Grid>
    </Dashboard >
  )
}