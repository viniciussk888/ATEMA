import React, { useState, useEffect } from 'react';
import Dashboard from '../../components/Dashboard';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';

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
  grid: {
    marginBottom: 5,
    padding: 3
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
}));

export default function NewAtlas() {
  //states buscas API
  const [microrregioes, setMicorregioes] = useState([]);
  const [municipios, setMunicipios] = useState([]);
  // const [mesorregiao, setMesorregiao] = useState("");
  const [codMeso, setCodMeso] = useState("2101");
  const [municipio, setMunicipio] = useState("2101");
  const [microrregiao, setMicrorregiao] = useState("");


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
              INFORME OS DADOS
      </Typography>
            <Grid container>
              <Grid item xs={12} sm={9} className={{ flexDirection: 'colunm' }}>

                <FormControl variant="filled" className={classes.formControl}>
                  <InputLabel htmlFor="filled-age-native-simple">Mesorregião</InputLabel>
                  <Select
                    native
                    onChange={handleChangeMeso}
                  >
                    <option selected disabled value="Não selecionada">Selecione...</option>
                    {mesorregioes.map(item => (
                      <option value={item.codigo + '-' + item.nome}>{item.codigo + '-' + item.nome}</option>
                    ))}
                  </Select>
                </FormControl>

                <FormControl variant="filled" className={classes.formControl}>
                  <InputLabel htmlFor="filled-age-native-simple">Microrregião</InputLabel>
                  <Select
                    native
                    onChange={handleChangeMicro}
                  >
                    <option selected disabled value="Não selecionada">Selecione...</option>
                    {microrregioes.map(item => (
                      <option value={item.id + '-' + item.nome}>{item.id + '-' + item.nome}</option>
                    ))}
                  </Select>
                </FormControl>

                <FormControl variant="filled" className={classes.formControl}>
                  <InputLabel htmlFor="filled-age-native-simple">Município</InputLabel>
                  <Select
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
                <TextField
                  required
                  id="lastName"
                  name="lastName"
                  label="Last name"
                  value={municipio}
                  fullWidth
                  autoComplete="lname"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  id="address1"
                  name="address1"
                  label="Address line 1"
                  fullWidth
                  autoComplete="billing address-line1"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="address2"
                  name="address2"
                  label="Address line 2"
                  fullWidth
                  autoComplete="billing address-line2"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="city"
                  name="city"
                  label="City"
                  fullWidth
                  autoComplete="billing address-level2"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField id="state" name="state" label="State/Province/Region" fullWidth />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="zip"
                  name="zip"
                  label="Zip / Postal code"
                  fullWidth
                  autoComplete="billing postal-code"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="country"
                  name="country"
                  label="Country"
                  fullWidth
                  autoComplete="billing country"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
                  label="Use this address for payment details"
                />
              </Grid>
            </Grid>
          </React.Fragment>
        </Paper>
      </Grid>
    </Dashboard >
  )
}