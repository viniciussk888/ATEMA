import React, { useState, useEffect } from 'react';
import Dashboard from '../../components/Dashboard';
import { Link } from 'react-router-dom';

//import Link from '@material-ui/core/Link';
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
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

const GreenCheckbox = withStyles({
  root: {
    color: green[400],
    '&$checked': {
      color: green[600],
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

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

function createData(name, calories, fat) {
  return { name, calories, fat };
}

const rows = [
  createData("Alberto Vinicius", "vinicius.cross07@gmail.com", "Delete-Update-Create"),
];

export default function Users() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    insert: false,
    update: false,
    delete: false,
    blog: false,
    admin: false,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

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
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  required
                  id="Senha"
                  name="Senha"
                  label="Senha"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  required
                  id="email"
                  name="email"
                  label="Email"
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
                  label="Atualizar"
                />
                <FormControlLabel
                  control={<Checkbox color="primary" checked={state.delete} onChange={handleChange} name="delete" />}
                  label="Delete"
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
                      <TableCell align="center">Permissões</TableCell>
                      <TableCell align="center">Ações</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow key={row.name}>
                        <TableCell component="th" scope="row">{row.name}</TableCell>
                        <TableCell align="center">{row.calories}</TableCell>
                        <TableCell align="center">{row.fat}</TableCell>
                        <TableCell align="center">
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