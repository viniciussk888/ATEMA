import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import Dashboard from '../../components/Dashboard';
import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Hidden from '@material-ui/core/Hidden';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { useSelector } from 'react-redux';

import apiAtema from "../../services/apiAtema";

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
  card: {
    display: 'flex',
  },
  cardDetails: {
    flex: 1,
  },
  cardMedia: {
    width: 160,
  },
  form: {
    margin: 5,
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
}));

export default function Posts() {
  const history = useHistory()
  const [file, setFile] = useState('');
  const classes = useStyles();
  const [title, setTitle] = useState('')
  const [post, setPost] = useState([])
  const [content, setContent] = useState('')
  const [aux, setAux] = useState(0)

  const config = {
    headers: { Authorization: `Bearer ${useSelector(state => state.token)}` }
  };

  const onChange = e => {
    setFile(e.target.files[0]);
  };

  async function handlePost(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    const response = await apiAtema.post('files', formData, config)
    if (!response.data.url) {
      return alert("Erro ao fazer upload da imagem!")
    }
    if (!title || !content) {
      return alert("Informe o titulo e conteudo!")
    }
    const response2 = await apiAtema.post('post', {
      title: title,
      image: response.data.url,
      content: content,
      author: localStorage.getItem('username')
    }, config)
    setAux(Math.random)
  }
  async function deletePost(id) {
    const r = window.confirm(`Confirma a EXCLUSÃO?`);
    if (r == true) {
      try {
        await apiAtema.delete(`post/${id}`, config)
        setAux(Math.random)
      } catch (error) {
        alert("Erro ao deletar!! tente novamente...")
      }
    } else {
      return
    }
  }

  useEffect(() => {
    const admin = localStorage.getItem('admin');
    const blog = localStorage.getItem('blog');
    if (admin == 0 && blog == 0) {
      alert('Sem permissão para a operação!')
      history.push('/')
    }
  }, [])

  useEffect(() => {
    async function fetchData() {
      const response = await apiAtema.get('post', config)
      setPost(response.data)
    }
    fetchData();
  }, [aux]);


  return (
    <>
      <Dashboard>
        <Grid item xs={12} className={classes.grid}>
          <Paper className={classes.paper}>
            <Typography variant="h6" gutterBottom>
              Novo
            </Typography>
            <Grid container spacing={3}>
              <form enctype="multipart/form-data" onSubmit={handlePost} className={classes.form} noValidate>
                <Grid item xs={12} sm={12}>
                  <TextField
                    id="Título"
                    name="Título"
                    label="Título"
                    variant="outlined"
                    className="mb-2"
                    fullWidth
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </Grid>

                <Grid item xs={12} sm={12}>
                  <TextField
                    id="image"
                    name="image"
                    type="file"
                    helperText="Selecione a imagem destaque"
                    variant="outlined"
                    fullWidth
                    multiple webkitdirectory
                    onChange={onChange}
                  />
                </Grid>

                <Grid item xs={12} sm={12}>
                  <div class="form-group">
                    <label for="exampleFormControlTextarea3">Texto</label>
                    <textarea
                      className="form-control textArea"
                      id="exampleFormControlTextarea3"
                      rows="7"
                      onChange={(e) => setContent(e.target.value)}
                    ></textarea>
                  </div>
                </Grid>

                <Grid item xs={12} sm={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    endIcon={<Icon>save</Icon>}
                  >
                    Salvar
                </Button>
                </Grid>
              </form>
            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={12} className={classes.grid}>
          <Paper className={classes.paper}>
            <Typography variant="h6" gutterBottom>
              Posts
            </Typography>

            <Grid container spacing={3}>
              {post.map(item => (
                <Grid item xs={12} sm={4}>


                  <CardActionArea component="a" href="#">
                    <Card className={classes.card}>
                      <div className={classes.cardDetails}>
                        <CardContent>
                          <Typography component="h2" variant="h5">
                            {item.title}
                          </Typography>
                          <Typography variant="subtitle1" color="textSecondary">
                            {item.created_at}
                          </Typography>
                          <Typography variant="subtitle1" paragraph>
                            Autor: {item.author}
                          </Typography>
                          <IconButton
                            onClick={() => (deletePost(item.id))}
                            color="secondary"
                            aria-label="Deletar">
                            <DeleteIcon />
                          </IconButton>
                        </CardContent>
                      </div>
                      <Hidden xsDown>
                        <CardMedia className={classes.cardMedia} image={item.image} title='Image Text' />
                      </Hidden>
                    </Card>
                  </CardActionArea>

                </Grid>
              ))}
            </Grid>

          </Paper>
        </Grid>
      </Dashboard>
    </>
  )
}