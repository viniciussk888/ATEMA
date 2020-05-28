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
import Visibility from '@material-ui/icons/Visibility';

import { useSelector } from 'react-redux';
import apiAtema from "../../services/apiAtema";
import ModalSee from '../../components/ModalSee'


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
    minWidth: '80%',
  },
  table: {
    minWidth: 650,
  }
}));

export default function Atlas() {
  const classes = useStyles();
  const [microrregioes, setMicorregioes] = useState([]);
  const [municipios, setMunicipios] = useState([]);
  const [dataFilter, setDataFilter] = useState([]);
  const [codMeso, setCodMeso] = useState("");//MESOREGIAO COD+NOME
  const [municipio, setMunicipio] = useState("");
  const [microrregiao, setMicrorregiao] = useState("");
  const [modalShowSee, setModalShowSee] = React.useState(false);

  const config = {
    headers: { Authorization: `Bearer ${useSelector(state => state.token)}` }
  };

  function SeeModal(id) {
    localStorage.setItem('atemaUpdate', id);
    setModalShowSee(true)
  }
  async function filter() {
    if (!codMeso) {
      return alert("Selecione a Mesorregião!")
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
      })
      setDataFilter(response.data)
    } catch (error) {
      alert('Erro ao filtrar os dados!' + error)
    }
  }
  async function deleteData(id) {
    const update = localStorage.getItem('update');
    const admin = localStorage.getItem('admin');
    if (admin == 0 && update == 0) {
      alert('Sem permissão para a operação!')
      return
    }
    const r = window.confirm(`Confirma a EXCLUSÃO?`);
    if (r == true) {
      try {
        await apiAtema.delete(`atema/${id}`, config)
        window.location.reload();
      } catch (error) {
        alert("Erro ao deletar!! " + error)
      }
    } else {
      return
    }
  }
  async function seeAll() {
    try {
      const response = await apiAtema.get('atema', config)
      setDataFilter(response.data)
    } catch (error) {
      alert('Erro ao buscar dados!' + error)
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
              Filtros de busca
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
                > APLICAR</Button>
              </Grid>
              <Grid item xs={12} sm={2}>
                <Button
                  onClick={seeAll}
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  endIcon={<Icon>visibility</Icon>}
                > VER TODOS</Button>
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
                    {dataFilter.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell component="th" scope="row">{row.mesorregiao}</TableCell>
                        <TableCell align="center">{row.microrregiao}</TableCell>
                        <TableCell align="center">{row.municipio}</TableCell>
                        <TableCell align="center">{row.toponimo}</TableCell>
                        <TableCell align="center">{row.linguaOrigem}</TableCell>
                        <TableCell align="center">
                          <IconButton
                            aria-label="Ver Mais"
                            onClick={() => SeeModal(row.id)}
                          >
                            <Visibility />
                          </IconButton>
                          <IconButton
                            onClick={() => (deleteData(row.id))}
                            color="secondary"
                            aria-label="Deletar">
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                  <ModalSee
                    show={modalShowSee}
                    onHide={() => setModalShowSee(false)}
                  />
                </Table>
              </TableContainer>
            </React.Fragment>
          </Paper>
        </Grid>
      </Dashboard>
    </>
  );
}