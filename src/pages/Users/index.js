import React, { useState, useEffect } from 'react';
import Dashboard from '../../components/Dashboard';

import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import TableContainer from '@material-ui/core/TableContainer';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
//import Create from '@material-ui/icons/Create';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import { useSelector } from 'react-redux';
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

export default function Users() {
  const history = useHistory();
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const config = {
    headers: { Authorization: `Bearer ${useSelector(state => state.token)}` }
  };

  const classes = useStyles();

  const [state, setState] = React.useState({
    insert: 0,
    update: 0,
    delete: 0,
    blog: 0,
    admin: 0,
  });

  async function deleteUser(id, username) {
    const r = window.confirm(`Confirma a EXCLUSÃO de ${username} ?`);
    if (r == true) {
      try {
        await apiAtema.delete(`users/${id}`, config)
        window.location.reload()
      } catch (error) {
        alert("Erro ao deletar usúario!! " + error)
      }
    } else {
      return
    }
  }
  useEffect(() => {
    const admin = localStorage.getItem('admin');
    if (admin == 0) {
      alert('Operação permitida apenas para ADMINISTRADORES!')
      history.push('/')
    }
  }, [])

  useEffect(() => {
    async function fetchData() {
      const response = await apiAtema.get(`users`, config);
      setUsers(response.data);
    }
    fetchData();
  }, []);

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  async function createUser() {
    if (!username || !email || !password) {
      alert("Preencha todos os campos!")
      return
    }
    try {
      const response = await apiAtema.post('users', {
        username: username,
        password: password,
        email: email,
        insert: state.insert,
        update: state.update,
        blog: state.blog,
        admin: state.admin,
      }, config)
      if (response.data) {
        alert("Cadastro Efetuado!!")
        window.location.reload()
      }
    } catch (error) {
      alert("ocorreu um erro! \n" + error)
    }
  }


  return (
    <>
      <Dashboard>
        <Grid item xs={12} className={classes.grid}>
          <Paper className={classes.paperPrimary}>
            <Typography variant="h6" gutterBottom>
              Gerenciar Usuário
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
                  control={<Checkbox color="primary" checked={state.insert} onChange={handleChange} name="insert" />}
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
                  label="Alterar|Deletar"
                />
                <FormControlLabel
                  control={<Checkbox color="primary" checked={state.blog} onChange={handleChange} name="blog" />}
                  label="Blog"
                />
                <FormControlLabel
                  control={<Checkbox color="primary" checked={state.admin} onChange={handleChange} name="admin" />}
                  label="Admin"
                />
              </FormGroup>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                endIcon={<Icon>save</Icon>}
                onClick={createUser}
              >
                Salvar
                </Button>
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
                      <TableCell>Nome</TableCell>
                      <TableCell align="center">Email</TableCell>
                      <TableCell align="center">Administrador</TableCell>
                      <TableCell align="center">Criar</TableCell>
                      <TableCell align="center">Alterar|Deletar</TableCell>
                      <TableCell align="center">Blog</TableCell>
                      <TableCell align="center">Ações</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell component="th" scope="row">{user.username}</TableCell>
                        <TableCell align="center">{user.email}</TableCell>
                        <TableCell align="center"><strong>{user.admin === 1 ? "SIM" : "NÃO"}</strong></TableCell>
                        <TableCell align="center">{user.insert === 1 ? "SIM" : "NÃO"}</TableCell>
                        <TableCell align="center">{user.update === 1 ? "SIM" : "NÃO"}</TableCell>
                        <TableCell align="center">{user.blog === 1 ? "SIM" : "NÃO"}</TableCell>
                        <TableCell align="center">
                          <IconButton
                            onClick={() => (deleteUser(user.id, user.username))}
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