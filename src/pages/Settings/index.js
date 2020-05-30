import React, { useState, useEffect } from 'react'
import Dashboard from '../../components/Dashboard';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import DeleteIcon from '@material-ui/icons/Delete';
import AddBox from '@material-ui/icons/AddBox';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';

import apiAtema from "../../services/apiAtema";
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

function createData(name) {
  return { name };
}

const rows = [
  createData('India', 'IN', 1324171354, 3287263),
  createData('China', 'CN', 1403500365, 9596961),
  createData('Italy', 'IT', 60483973, 301340),
  createData('United States', 'US', 327167434, 9833520),
  createData('Canada', 'CA', 37602103, 9984670),
  createData('Australia', 'AU', 25475400, 7692024),
  createData('Germany', 'DE', 83019200, 357578),
  createData('Ireland', 'IE', 4857000, 70273),
  createData('Mexico', 'MX', 126577691, 1972550),
  createData('Japan', 'JP', 126317000, 377973),
  createData('France', 'FR', 67022000, 640679),
  createData('United Kingdom', 'GB', 67545757, 242495),
  createData('Russia', 'RU', 146793744, 17098246),
  createData('Nigeria', 'NG', 200962417, 923768),
  createData('Brazil', 'BR', 210147125, 8515767),
];

const useStyles = makeStyles((theme) => ({
  depositContext: {
    flex: 1,
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
  table: {
    minWidth: 100,
  },
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 170,
  },
  large: {
    minWidth: '80%',
    marginBottom: 5,
  },
  icon: {
    minWidth: 40,
    minHeight: 40
  }
}));

export default function Settings() {
  const history = useHistory();
  const classes = useStyles();
  const [elemento, setElemento] = useState([])
  const [lingua, setLingua] = useState([])
  const [etimologia, setEtimologia] = useState([])
  const [taxonomia, setTaxonomia] = useState([])
  const [nameElemento, setNameElemento] = useState("")
  const [nameLingua, setNameLingua] = useState("")
  const [nameEtimologia, setNameEtimologia] = useState("")
  const [nameTaxonomia, setNameTaxonomia] = useState("")
  const [aux, setAux] = useState(0)

  const config = {
    headers: { Authorization: `Bearer ${useSelector(state => state.token)}` }
  };

  useEffect(() => {
    const admin = localStorage.getItem('admin');
    if (admin == 0) {
      alert('Operação permitida apenas para ADMINISTRADORES!')
      history.push('/')
    }
  }, [])

  useEffect(() => {
    async function fetchData() {
      const response = await apiAtema.get('elemento', config)
      setElemento(response.data)

      const response2 = await apiAtema.get('lingua', config)
      setLingua(response2.data)

      const response3 = await apiAtema.get('etimologia', config)
      setEtimologia(response3.data)

      const response4 = await apiAtema.get('taxonomia', config)
      setTaxonomia(response4.data)
    }
    fetchData();
  }, [aux]);

  async function addElemento() {
    if (!nameElemento) {
      alert("Informe um nome!")
      return
    }
    const response = await apiAtema.post(`elemento`, {
      name: nameElemento
    }, config)
    setNameElemento("")
    setAux(Math.random())
  }
  async function addLingua() {
    if (!nameLingua) {
      alert("Informe um nome!")
      return
    }
    const response = await apiAtema.post(`lingua`, {
      name: nameLingua
    }, config)
    setNameLingua("")
    setAux(Math.random())
  }
  async function addEtimologia() {
    if (!nameEtimologia) {
      alert("Informe um nome!")
      return
    }
    const response = await apiAtema.post(`etimologia`, {
      name: nameEtimologia
    }, config)
    setNameEtimologia("")
    setAux(Math.random())
  }
  async function addTaxonomia() {
    if (!nameTaxonomia) {
      alert("Informe um nome!")
      return
    }
    const response = await apiAtema.post(`taxonomia`, {
      name: nameTaxonomia
    }, config)
    setNameTaxonomia("")
    setAux(Math.random())
  }

  async function deleteElemento(id) {
    const response = await apiAtema.delete(`elemento/${id}`, config)
    alert("Deletado com sucesso!")
    setAux(Math.random())
  }
  async function deleteLingua(id) {
    const response = await apiAtema.delete(`lingua/${id}`, config)
    alert("Deletado com sucesso!")
    setAux(Math.random())
  }
  async function deleteEtimologia(id) {
    const response = await apiAtema.delete(`etimologia/${id}`, config)
    alert("Deletado com sucesso!")
    setAux(Math.random())
  }
  async function deleteTaxonomia(id) {
    const response = await apiAtema.delete(`taxonomia/${id}`, config)
    alert("Deletado com sucesso!")
    setAux(Math.random())
  }

  return (
    <>
      <Dashboard>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4} lg={6}>
            <Paper className="p-2">
              <React.Fragment>
                <h5>ELEMENTOS GEOGRÁFICOS</h5>
                <Grid item xs={12} sm={12}>
                  <TextField
                    className={classes.large}
                    required
                    id="filled-required"
                    label="Adicionar novo"
                    variant="outlined"
                    value={nameElemento}
                    onChange={(e) => setNameElemento(e.target.value)}
                  />
                  <IconButton
                    onClick={() => (addElemento())}
                    color="primary"
                    aria-label="Adicionar">
                    <AddBox className={classes.icon} />
                  </IconButton>
                </Grid>
                <Typography>Total {elemento.length} registros</Typography>
                <Grid item xs={12} sm={12}>
                  <div>
                    <Paper className={classes.root}>
                      <TableContainer className={classes.container}>
                        <Table stickyHeader aria-label="sticky table">
                          <TableBody>
                            {elemento.map((row) => (
                              <TableRow key={row.id}>
                                <TableCell component="th" scope="row">
                                  {row.name}
                                </TableCell>
                                <TableCell align="right">
                                  <IconButton
                                    onClick={() => (deleteElemento(row.id))}
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
                    </Paper>
                  </div>
                </Grid>
              </React.Fragment>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4} lg={6}>
            <Paper className="p-2">
              <React.Fragment>
                <h5>LÍNGUAS DE ORIGENS</h5>
                <Grid item xs={12} sm={12}>
                  <TextField
                    className={classes.large}
                    required
                    id="filled-required"
                    label="Adicionar novo"
                    variant="outlined"
                    value={nameLingua}
                    onChange={(e) => setNameLingua(e.target.value)}
                  />
                  <IconButton
                    onClick={() => (addLingua())}
                    color="primary"
                    aria-label="Adicionar">
                    <AddBox className={classes.icon} />
                  </IconButton>
                </Grid>
                <Typography>Total {lingua.length} registros</Typography>
                <Grid item xs={12} sm={12}>
                  <div>
                    <Paper className={classes.root}>
                      <TableContainer className={classes.container}>
                        <Table stickyHeader aria-label="sticky table">
                          <TableBody>
                            {lingua.map((row) => (
                              <TableRow key={row.id}>
                                <TableCell component="th" scope="row">
                                  {row.name}
                                </TableCell>
                                <TableCell align="right">
                                  <IconButton
                                    onClick={() => (deleteLingua(row.id))}
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
                    </Paper>
                  </div>
                </Grid>
              </React.Fragment>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4} lg={6}>
            <Paper className="p-2">
              <React.Fragment>
                <h5>ETIMOLOGIAS</h5>
                <Grid item xs={12} sm={12}>
                  <TextField
                    className={classes.large}
                    required
                    id="filled-required"
                    label="Adicionar novo"
                    variant="outlined"
                    value={nameEtimologia}
                    onChange={(e) => setNameEtimologia(e.target.value)}
                  />
                  <IconButton
                    onClick={() => (addEtimologia())}
                    color="primary"
                    aria-label="Adicionar">
                    <AddBox className={classes.icon} />
                  </IconButton>
                </Grid>
                <Typography>Total {etimologia.length} registros</Typography>
                <Grid item xs={12} sm={12}>
                  <div>
                    <Paper className={classes.root}>
                      <TableContainer className={classes.container}>
                        <Table stickyHeader aria-label="sticky table">
                          <TableBody>
                            {etimologia.map((row) => (
                              <TableRow key={row.id}>
                                <TableCell component="th" scope="row">
                                  {row.name}
                                </TableCell>
                                <TableCell align="right">
                                  <IconButton
                                    onClick={() => (deleteEtimologia(row.id))}
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
                    </Paper>
                  </div>
                </Grid>
              </React.Fragment>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4} lg={6}>
            <Paper className="p-2">
              <React.Fragment>
                <h5>TAXONOMIAS</h5>
                <Grid item xs={12} sm={12}>
                  <TextField
                    className={classes.large}
                    required
                    id="filled-required"
                    label="Adicionar novo"
                    variant="outlined"
                    value={nameTaxonomia}
                    onChange={(e) => setNameTaxonomia(e.target.value)}
                  />
                  <IconButton
                    onClick={() => (addTaxonomia())}
                    color="primary"
                    aria-label="Adicionar">
                    <AddBox className={classes.icon} />
                  </IconButton>
                </Grid>
                <Typography>Total {taxonomia.length} registros</Typography>
                <Grid item xs={12} sm={12}>
                  <div>
                    <Paper className={classes.root}>
                      <TableContainer className={classes.container}>
                        <Table stickyHeader aria-label="sticky table">
                          <TableBody>
                            {taxonomia.map((row) => (
                              <TableRow key={row.id}>
                                <TableCell component="th" scope="row">
                                  {row.name}
                                </TableCell>
                                <TableCell align="right">
                                  <IconButton
                                    onClick={() => (deleteTaxonomia(row.id))}
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
                    </Paper>
                  </div>
                </Grid>
              </React.Fragment>
            </Paper>
          </Grid>

        </Grid>
      </Dashboard>
    </>
  )
} 