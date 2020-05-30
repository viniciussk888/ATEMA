import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import ArrowBackIos from '@material-ui/icons/ArrowBackIos'

import apiAtema from "../../services/apiAtema";


const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(/images/atema.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: '100% 100%',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function RecoverPassword() {
  const history = useHistory();



  const classes = useStyles();

  const [codigo, setCodigo] = useState("");
  const [message, setMessage] = useState("Digite o código para validar!");
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [valido, setValido] = useState(false);

  async function savePassword() {
    try {
      const response = await apiAtema.put('passwords', {
        token: codigo,
        newPassword: password
      })
      if (response.status == 204) {
        setMessage("SENHA ALTERADA COM SUCESSO!!")
        setTimeout(() => {
          history.push('/login')
        }, 2000);
      }
    } catch (erro) {
      alert("Erro ao salvar senha" + erro.message)
    }
  }

  async function validate(e) {
    e.preventDefault()
    if (!codigo) {
      alert("Digite o código recebido no e-mail!")
      return
    }
    try {
      const response = await apiAtema.post('validate', {
        token: codigo
      })
      setId(response.data.toString())
      setValido(true)
      setMessage("Código validado com sucesso!!")
    } catch (erro) {
      alert(erro)
    }
  }


  return (
    <>
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className="ml-3 mt-3">
            <Link to="/login">
              <ArrowBackIos />Voltar
          </Link>
          </div>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">

              Criar nova senha
          </Typography>
            <form onSubmit={validate} className={classes.form} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="codigo"
                label="Informe o código"
                name="codigo"
                hidden={valido}
                autoFocus
                onChange={(e) => setCodigo(e.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                hidden={valido}
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Validar código
            </Button>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="password"
                type="password"
                label="Nova senha"
                name="password"
                hidden={!valido}
                autoFocus
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                onClick={savePassword}
                fullWidth
                hidden={!valido}
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Salvar
            </Button>
              <Grid container>
                <Grid item xs>
                  <center><p><strong>{message}</strong></p></center>
                </Grid>
              </Grid>
            </form>
          </div>
        </Grid>
      </Grid>
    </>
  );
}