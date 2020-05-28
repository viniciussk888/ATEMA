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
  const [valido, setValido] = useState(false);


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
            <form className={classes.form} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="codigo"
                label="Informe o código"
                name="codigo"
                autoFocus
                onChange={(e) => setCodigo(e.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Validar código
            </Button>
              <Grid container>
                <Grid item xs>
                  Sera enviado um e-mail com o código recuperação!<br />
                    Caso não chegue, verifique a caixa de spam ou tente novamente!
                </Grid>
                {/*<Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
               </Grid>*/}
              </Grid>
              <Box mt={5}>
                {/*<Copyright />*/}
              </Box>
            </form>
          </div>
        </Grid>
      </Grid>
    </>
  );
}