import React, { useState, useEffect } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { useHistory } from 'react-router-dom'
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Header from './Header';
import { makeStyles } from '@material-ui/core/styles';
import MainFeaturedPost from './MainFeaturedPost';
import Footer from './Footer';
import { useSelector } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import ArrowBackIos from '@material-ui/icons/ArrowBackIos'
import IconButton from '@material-ui/core/IconButton'

import apiAtema from "../../services/apiAtema";

const mainFeaturedPost = {
  title: 'ATLAS TOPONÍMICO DO ESTADO DO MARANHÃO',
  description:
    "Os topônimos são nomes fundamentais no processo interativo homem-língua-meio por identificarem particularmente as entidades geográficas com que convivem os utentes da língua.",
  image: '/images/balsas.jpg',
  imgText: 'main image description',
};

const useStyles = makeStyles({
  paper: {
    padding: 50,
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    backgroundColor: '#DCDCDC'
  },
  grid: {
    marginBottom: 5,
    padding: 3
  },
  image: {
    maxHeight: '500px',
    maxWidth: '400px',
    margin: '5px',
    boxShadow: "0 10px 10px"
  },
  font: {
    fontSize: '20px',
    marginLeft: 70,
    color: '#4F4F4F'
  }
});



export default function PostBlog() {
  const history = useHistory();
  const classes = useStyles();
  const [post, setPost] = useState([])

  const config = {
    headers: { Authorization: `Bearer ${useSelector(state => state.token)}` }
  };

  useEffect(() => {
    async function fetchData() {
      const postId = localStorage.getItem('postId')
      const response = await apiAtema.get(`/post/${postId}`, config)
      setPost(response.data)
    }
    fetchData();
  }, []);

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header />
        <main>
          <MainFeaturedPost post={mainFeaturedPost} />
          <Grid item xs={12} className={classes.grid}>
            <Paper className={classes.paper}>
              <Grid container spacing={3}>
                <IconButton onClick={() => (history.goBack())}>
                  <ArrowBackIos /> Voltar
                </IconButton>
                <Grid item xs={12} sm={12}>
                  <h2 class="blog-post-title">{post.title}</h2>
                  <p class="blog-post-meta">{post.created_at} por <strong>{post.author}</strong></p>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <img src={post.image} className={classes.image} />
                </Grid>
                <Grid item xs={12} sm={8}>
                  <p className={classes.font}>{post.content}</p>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </main>
      </Container>
      <Grid><center>-</center></Grid>
      <Footer title="Projeto Institucional" description="Universidade Estadual do Maranhão" />
    </React.Fragment>
  );
}
