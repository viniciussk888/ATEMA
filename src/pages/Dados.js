import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import { TextField, Card, Button } from '@material-ui/core';

import apiAtema from '../services/apiAtema';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function Dados() {
  const navigate = useNavigate();
  const [elemento, setElemento] = useState([]);
  const [lingua, setLingua] = useState([]);
  const [etimologia, setEtimologia] = useState([]);
  const [taxonomia, setTaxonomia] = useState([]);
  const [nameElemento, setNameElemento] = useState('');
  const [nameLingua, setNameLingua] = useState('');
  const [nameEtimologia, setNameEtimologia] = useState('');
  const [nameTaxonomia, setNameTaxonomia] = useState('');
  const [aux, setAux] = useState(0);

  const config = {
    headers: { Authorization: `Bearer ${useSelector((state) => state.token)}` }
  };

  useEffect(() => {
    const admin = localStorage.getItem('@atema#admin');
    if (admin === 0) {
      alert('Operação permitida apenas para ADMINISTRADORES!');
      navigate('/', { replace: true });
    }
  }, [navigate]);

  useEffect(() => {
    async function fetchData() {
      const response = await apiAtema.get('elemento', config);
      setElemento(response.data);

      const response2 = await apiAtema.get('lingua', config);
      setLingua(response2.data);

      const response3 = await apiAtema.get('etimologia', config);
      setEtimologia(response3.data);

      const response4 = await apiAtema.get('taxonomia', config);
      setTaxonomia(response4.data);
    }
    fetchData();
  }, [aux]);

  async function addElemento() {
    if (!nameElemento) {
      alert('Informe um nome!');
      return;
    }
    await apiAtema.post(
      `elemento`,
      {
        name: nameElemento
      },
      config
    );
    setNameElemento('');
    setAux(Math.random());
  }
  async function addLingua() {
    if (!nameLingua) {
      alert('Informe um nome!');
      return;
    }
    await apiAtema.post(
      `lingua`,
      {
        name: nameLingua
      },
      config
    );
    setNameLingua('');
    setAux(Math.random());
  }
  async function addEtimologia() {
    if (!nameEtimologia) {
      alert('Informe um nome!');
      return;
    }
    await apiAtema.post(
      `etimologia`,
      {
        name: nameEtimologia
      },
      config
    );
    setNameEtimologia('');
    setAux(Math.random());
  }
  async function addTaxonomia() {
    if (!nameTaxonomia) {
      alert('Informe um nome!');
      return;
    }
    await apiAtema.post(
      `taxonomia`,
      {
        name: nameTaxonomia
      },
      config
    );
    setNameTaxonomia('');
    setAux(Math.random());
  }
  async function deleteElemento(id) {
    await apiAtema.delete(`elemento/${id}`, config);
    alert('Deletado com sucesso!');
    setAux(Math.random());
  }
  async function deleteLingua(id) {
    await apiAtema.delete(`lingua/${id}`, config);
    alert('Deletado com sucesso!');
    setAux(Math.random());
  }
  async function deleteEtimologia(id) {
    await apiAtema.delete(`etimologia/${id}`, config);
    alert('Deletado com sucesso!');
    setAux(Math.random());
  }
  async function deleteTaxonomia(id) {
    await apiAtema.delete(`taxonomia/${id}`, config);
    alert('Deletado com sucesso!');
    setAux(Math.random());
  }

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4} lg={6}>
          <Card className="p-2">
            <div style={{ padding: 24 }}>
              <h5>ELEMENTOS GEOGRÁFICOS</h5>
              <Grid item xs={12} sm={12}>
                <TextField
                  fullWidth
                  required
                  id="filled-required"
                  label="Adicionar novo"
                  variant="outlined"
                  value={nameElemento}
                  onChange={(e) => setNameElemento(e.target.value)}
                />
                <Button variant="contained" onClick={() => addElemento()}>
                  Adicionar
                </Button>
              </Grid>
              <br />
              <Grid item xs={12} sm={12}>
                <Typography>Total {elemento.length} registro</Typography>
                <div>
                  <TableContainer style={{ maxHeight: 270 }}>
                    <Table stickyHeader aria-label="sticky table">
                      <TableBody>
                        {elemento.map((row) => (
                          <TableRow key={row.id}>
                            <TableCell component="th" scope="row">
                              {row.name}
                            </TableCell>
                            <TableCell align="right">
                              <IconButton
                                onClick={() => deleteElemento(row.id)}
                                color="secondary"
                                aria-label="Deletar"
                              >
                                <DeleteIcon />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </div>
              </Grid>
            </div>
          </Card>
        </Grid>

        <Grid item xs={12} md={4} lg={6}>
          <Card className="p-2">
            <div style={{ padding: 24 }}>
              <h5>LÍNGUAS DE ORIGENS</h5>
              <Grid item xs={12} sm={12}>
                <TextField
                  fullWidth
                  required
                  id="filled-required"
                  label="Adicionar novo"
                  variant="outlined"
                  value={nameLingua}
                  onChange={(e) => setNameLingua(e.target.value)}
                />
                <Button variant="contained" onClick={() => addLingua()}>
                  Adicionar
                </Button>
              </Grid>
              <br />
              <Grid item xs={12} sm={12}>
                <Typography>Total {lingua.length} registro</Typography>
                <div>
                  <TableContainer style={{ maxHeight: 270 }}>
                    <Table stickyHeader aria-label="sticky table">
                      <TableBody>
                        {lingua.map((row) => (
                          <TableRow key={row.id}>
                            <TableCell component="th" scope="row">
                              {row.name}
                            </TableCell>
                            <TableCell align="right">
                              <IconButton
                                onClick={() => deleteLingua(row.id)}
                                color="secondary"
                                aria-label="Deletar"
                              >
                                <DeleteIcon />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </div>
              </Grid>
            </div>
          </Card>
        </Grid>

        <Grid item xs={12} md={4} lg={6}>
          <Card className="p-2">
            <div style={{ padding: 24 }}>
              <h5>ETIMOLOGIAS</h5>
              <Grid item xs={12} sm={12}>
                <TextField
                  fullWidth
                  required
                  id="filled-required"
                  label="Adicionar novo"
                  variant="outlined"
                  value={nameEtimologia}
                  onChange={(e) => setNameEtimologia(e.target.value)}
                />
                <Button variant="contained" onClick={() => addEtimologia()}>
                  Adicionar
                </Button>
              </Grid>
              <br />
              <Grid item xs={12} sm={12}>
                <Typography>Total {etimologia.length} registro</Typography>
                <div>
                  <TableContainer style={{ maxHeight: 270 }}>
                    <Table stickyHeader aria-label="sticky table">
                      <TableBody>
                        {etimologia.map((row) => (
                          <TableRow key={row.id}>
                            <TableCell component="th" scope="row">
                              {row.name}
                            </TableCell>
                            <TableCell align="right">
                              <IconButton
                                onClick={() => deleteEtimologia(row.id)}
                                color="secondary"
                                aria-label="Deletar"
                              >
                                <DeleteIcon />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </div>
              </Grid>
            </div>
          </Card>
        </Grid>

        <Grid item xs={12} md={4} lg={6}>
          <Card className="p-2">
            <div style={{ padding: 24 }}>
              <h5>TAXONOMIAS</h5>
              <Grid item xs={12} sm={12}>
                <TextField
                  fullWidth
                  required
                  id="filled-required"
                  label="Adicionar novo"
                  variant="outlined"
                  value={nameTaxonomia}
                  onChange={(e) => setNameTaxonomia(e.target.value)}
                />
                <Button variant="contained" onClick={() => addTaxonomia()}>
                  Adicionar
                </Button>
              </Grid>
              <br />
              <Grid item xs={12} sm={12}>
                <Typography>Total {taxonomia.length} registro</Typography>
                <div>
                  <TableContainer style={{ maxHeight: 270 }}>
                    <Table stickyHeader aria-label="sticky table">
                      <TableBody>
                        {taxonomia.map((row) => (
                          <TableRow key={row.id}>
                            <TableCell component="th" scope="row">
                              {row.name}
                            </TableCell>
                            <TableCell align="right">
                              <IconButton
                                onClick={() => deleteTaxonomia(row.id)}
                                color="secondary"
                                aria-label="Deletar"
                              >
                                <DeleteIcon />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </div>
              </Grid>
            </div>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
