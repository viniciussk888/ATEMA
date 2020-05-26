import React, { useState, useEffect } from 'react';
import Dashboard from '../../components/Dashboard';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import apiMeso from "../../services/apiMeso";
import apiMun from "../../services/apiMun";
import mesorregioes from '../../utils/mesorregioes.json'
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import TableContainer from '@material-ui/core/TableContainer';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Create from '@material-ui/icons/Create';
import Visibility from '@material-ui/icons/Visibility';

import apiAtema from "../../services/apiAtema";


const useStyles = makeStyles((theme) => ({
  paperPrimary: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
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
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 600,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  button: {
    margin: theme.spacing(1),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 250,
  },
  table: {
    minWidth: 650,
  }
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Norte Maranhense", "Aglomeração urbana de São Luís", "Paço do Lumiar", "Paço do Lumiar", "Hebraico + Português"),
];




export default function Atlas() {
  const classes = useStyles();
  const [microrregioes, setMicorregioes] = useState([]);
  const [municipios, setMunicipios] = useState([]);
  const [codMeso, setCodMeso] = useState("");//MESOREGIAO COD+NOME
  const [municipio, setMunicipio] = useState("");
  const [microrregiao, setMicrorregiao] = useState("");

  async function filter() {
    if (!codMeso) {
      return alert("Selecione a Mesorregião!")
    }
    try {
      let aux = codMeso.split('-');
      let meso = aux[1];
      let aux2 = microrregiao.split('-');
      let micro = aux2[1];
      alert(micro)
      const response = await apiAtema.post('atemafilter', {
        mesorregiao: meso,
        microrregiao: micro,
        municipio: municipio
      })
      console.log(response.data)
    } catch (error) {
      alert('Erro ao filtrar os dados!' + error)
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

  return (
    <>
      <Dashboard>
        <Grid item xs={12} className={classes.grid}>
          <Paper className={classes.paperPrimary}>
            <Typography variant="h6" gutterBottom>
              Filtros
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={3}>
                <FormControl variant="filled" className={classes.formControl}>
                  <InputLabel htmlFor="filled-age-native-simple">Mesorregião</InputLabel>
                  <Select
                    required
                    native
                    onChange={handleChangeMeso}
                  >
                    <option selected disabled>Selecione...</option>
                    {mesorregioes.map(item => (
                      <option value={item.codigo + '-' + item.nome}>{item.nome}</option>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={3}>
                <FormControl variant="filled" className={classes.formControl}>
                  <InputLabel htmlFor="filled-age-native-simple">Microrregião</InputLabel>
                  <Select
                    required
                    native
                    onChange={handleChangeMicro}
                  >
                    <option selected disabled>Selecione...</option>
                    {microrregioes.map(item => (
                      <option value={item.id + '-' + item.nome}>{item.nome}</option>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={3}>
                <FormControl variant="filled" className={classes.formControl}>
                  <InputLabel htmlFor="filled-age-native-simple">Município</InputLabel>
                  <Select
                    required
                    native
                    onChange={handleChangeMun}
                  >
                    <option selected disabled>Selecione...</option>
                    {municipios.map(item => (
                      <option value={item.nome}>{item.nome}</option>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Button
                  onClick={filter}
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  endIcon={<Icon>search</Icon>}
                > APLICAR FILTRO</Button>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Link to='/atlas/novoatlas'>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    endIcon={<Icon>add</Icon>}
                  > NOVO </Button>
                </Link>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={12} className={classes.grid}>
          <Paper className={classes.paper}>
            <React.Fragment>
              <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Mesorregião</TableCell>
                      <TableCell align="center">Microrregião</TableCell>
                      <TableCell align="center">Município</TableCell>
                      <TableCell align="center">Topônimo</TableCell>
                      <TableCell align="center">Língua de Origem</TableCell>
                      <TableCell align="center">Ações</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow key={row.name}>
                        <TableCell component="th" scope="row">{row.name}</TableCell>
                        <TableCell align="center">{row.calories}</TableCell>
                        <TableCell align="center">{row.fat}</TableCell>
                        <TableCell align="center">{row.carbs}</TableCell>
                        <TableCell align="center">{row.protein}</TableCell>
                        <TableCell align="center">
                          <IconButton
                            aria-label="Ver Mais">
                            <Visibility />
                          </IconButton>
                          <IconButton
                            color="primary"
                            aria-label="Editar">
                            <Create />
                          </IconButton>
                          <IconButton
                            color="secondary"
                            aria-label="Deletar">
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </React.Fragment>
          </Paper>
        </Grid>
      </Dashboard>
    </>
  );
}