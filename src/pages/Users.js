import React, { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import {
  Table,
  Container,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Grid,
  Paper,
  Typography,
  TextField,
  TableContainer,
  IconButton,
  Card
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
//import Create from '@material-ui/icons/Create';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import { useSelector } from 'react-redux';
import Page from '../components/Page';
import apiAtema from '../services/apiAtema';
import { LoadingButton } from '@material-ui/lab';
// ----------------------------------------------------------------------

export default function Users() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const config = {
    headers: { Authorization: `Bearer ${useSelector((state) => state.token)}` }
  };

  const [state, setState] = React.useState({
    insert: 0,
    update: 0,
    delete: 0,
    blog: 0,
    admin: 0
  });

  async function deleteUser(id, username) {
    const r = window.confirm(`Confirma a EXCLUSÃO de ${username} ?`);
    if (r === true) {
      try {
        await apiAtema.delete(`users/${id}`, config);
        window.location.reload();
      } catch (error) {
        alert('Erro ao deletar usúario!! ' + error);
      }
    } else {
      return;
    }
  }
  useEffect(() => {
    const admin = localStorage.getItem('@atema#admin');
    if (admin === 0) {
      alert('Operação permitida apenas para ADMINISTRADORES!');
      navigate('/', { replace: true });
    }
  }, [navigate]);

  useEffect(() => {
    async function fetchData() {
      const response = await apiAtema.get(`users`, config);
      console.warn(response.data);
      setUsers(response.data);
    }
    fetchData();
  }, []);

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  async function createUser() {
    if (!username || !email || !password) {
      alert('Preencha todos os campos!');
      return;
    }
    setLoading(true);
    try {
      const response = await apiAtema.post(
        'users',
        {
          username: username,
          password: password,
          email: email,
          insert: state.insert,
          update: state.update,
          blog: state.blog,
          admin: state.admin
        },
        config
      );
      if (response.data) {
        alert('Cadastro Efetuado!!');
        setLoading(false);
        window.location.reload();
      }
    } catch (error) {
      setLoading(false);
      alert('ocorreu um erro! \n' + error);
    }
    setLoading(false);
  }
  return (
    <Page title="Usuários | ATEMA">
      <Container>
        <Grid item xs={12}>
          <Card>
            <div
              style={{
                padding: 24
              }}
            >
              <Typography variant="h6" gutterBottom>
                Criar novo usuário
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={4}>
                  <TextField
                    required
                    id="name"
                    name="name"
                    label="Nome de Usuário"
                    variant="outlined"
                    onChange={(e) => setUsername(e.target.value)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    required
                    id="password"
                    type="password"
                    label="Senha"
                    variant="outlined"
                    onChange={(e) => setPassword(e.target.value)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    required
                    id="email"
                    name="email"
                    label="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
              </Grid>
              <Typography variant="h6" gutterBottom>
                Permissões
              </Typography>
              <Grid item xs={12} sm={12}>
                <FormGroup row>
                  <FormControlLabel
                    control={
                      <Checkbox
                        color="primary"
                        checked={state.insert}
                        onChange={handleChange}
                        name="insert"
                      />
                    }
                    label="Criar"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={state.update}
                        onChange={handleChange}
                        name="update"
                        color="primary"
                      />
                    }
                    label="Alterar"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        color="primary"
                        checked={state.blog}
                        onChange={handleChange}
                        name="blog"
                      />
                    }
                    label="Blog"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        color="primary"
                        checked={state.admin}
                        onChange={handleChange}
                        name="admin"
                      />
                    }
                    label="Admin"
                  />
                </FormGroup>
                <LoadingButton
                  onClick={createUser}
                  size="large"
                  variant="contained"
                  loading={loading}
                >
                  Criar
                </LoadingButton>
              </Grid>
            </div>
          </Card>
        </Grid>
        <br />
        <Grid item xs={12}>
          <Card>
            <div
              style={{
                padding: 24
              }}
            >
              <TableContainer component={Paper}>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Nome</TableCell>
                      <TableCell align="center">Email</TableCell>
                      <TableCell align="center">Administrador</TableCell>
                      <TableCell align="center">Criar</TableCell>
                      <TableCell align="center">Alterar</TableCell>
                      <TableCell align="center">Blog</TableCell>
                      <TableCell align="center">Ações</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell component="th" scope="row">
                          {user.username}
                        </TableCell>
                        <TableCell align="center">{user.email}</TableCell>
                        <TableCell align="center">
                          <strong>{user.admin === true ? 'SIM' : 'NÃO'}</strong>
                        </TableCell>
                        <TableCell align="center">{user.insert === true ? 'SIM' : 'NÃO'}</TableCell>
                        <TableCell align="center">{user.update === true ? 'SIM' : 'NÃO'}</TableCell>
                        <TableCell align="center">{user.blog === true ? 'SIM' : 'NÃO'}</TableCell>
                        <TableCell align="center">
                          <IconButton
                            onClick={() => deleteUser(user.id, user.username)}
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
          </Card>
        </Grid>
      </Container>
    </Page>
  );
}
