import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Container,
  Grid,
  TextField,
  Paper,
  Typography,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Hidden,
  Button
} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Page from '../components/Page';
import Editor from 'react-simple-wysiwyg';

import apiAtema from '../services/apiAtema';
import { toast } from 'react-toastify';

export default function Posts() {
  const navigate = useNavigate();
  const [file, setFile] = useState('');
  const [title, setTitle] = useState('');
  const [post, setPost] = useState([]);
  const [content, setContent] = useState('');
  const [aux, setAux] = useState(0);

  function onChangeContent(e) {
    setContent(e.target.value);
  }

  const onChange = (e) => {
    setFile(e.target.files[0]);
  };

  async function handlePost() {
    if (!title || !content || !file) {
      return toast.error('Preencha todos os campos!');
    }
    const formData = new FormData();
    formData.append('image', file);
    const response = await apiAtema.post('posts/file', formData);
    const imageUrl = response.data.image;

    await apiAtema.post('posts', {
      title,
      content,
      image: imageUrl,
      author: sessionStorage.getItem('@atema#username')
    });
    toast.success('Postagem realizada com sucesso!');
    setTitle('');
    setContent('');
    setFile('');
    setAux(Math.random);
  }
  async function deletePost(id) {
    const r = window.confirm(`Confirma a EXCLUSÃO?`);
    if (r === true) {
      try {
        await apiAtema.delete(`posts/${id}`);
        setAux(Math.random);
      } catch (error) {
        alert('Erro ao deletar!! tente novamente...');
      }
    } else {
      return;
    }
  }

  useEffect(() => {
    const admin = sessionStorage.getItem('@atema#admin');
    const blog = sessionStorage.getItem('@atema#blog');
    if (admin === false && blog === false) {
      toast.error('Operação permitida apenas para ADMINISTRADORES ou USUÁRIOS DE BLOG!');
      navigate('/', { replace: true });
    }
  }, [navigate]);

  useEffect(() => {
    async function fetchData() {
      const response = await apiAtema.get('posts');
      setPost(response.data);
    }
    fetchData();
  }, [aux]);

  return (
    <Page title="Posts | ATEMA">
      <Container>
        <Typography variant="h5">Criar nova postagem no portal</Typography>
        <br />
        <form enctype="multipart/form-data" noValidate>
          <Card style={{ padding: 24 }}>
            <Grid container spacing={3}>
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
                  multiple
                  webkitdirectory
                  onChange={onChange}
                />
              </Grid>

              <Grid item xs={12} sm={12}>
                <div class="form-group">
                  <Editor
                    containerProps={{ style: { resize: 'vertical', height: 220 } }}
                    value={content}
                    onChange={onChangeContent}
                  />
                </div>
              </Grid>

              <Grid item xs={12} sm={12}>
                <Button onClick={handlePost} variant="contained" color="primary">
                  ADICIONAR
                </Button>
              </Grid>
            </Grid>
          </Card>
        </form>

        <br />

        <Grid item xs={12}>
          <Paper>
            <Typography variant="h6" gutterBottom>
              Posts
            </Typography>

            <Grid container spacing={3}>
              {post.map((item) => (
                <Grid item xs={12} sm={4}>
                  <CardActionArea component="a" href="#">
                    <Card>
                      <div>
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
                            onClick={() => deletePost(item.id)}
                            color="secondary"
                            aria-label="Deletar"
                          >
                            <DeleteIcon />
                          </IconButton>
                        </CardContent>
                      </div>
                      <Hidden xsDown>
                        <CardMedia image={item.image} title="Image Text" />
                      </Hidden>
                    </Card>
                  </CardActionArea>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>
      </Container>
    </Page>
  );
}
