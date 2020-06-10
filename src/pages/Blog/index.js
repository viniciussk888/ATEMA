import React, { useState, useEffect } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Header from './Header';
import MainFeaturedPost from './MainFeaturedPost';
import FeaturedPost from './FeaturedPost';
import Footer from './Footer';
import { useSelector } from 'react-redux';

import apiAtema from "../../services/apiAtema";

const mainFeaturedPost = {
  title: 'ATLAS TOPONÍMICO DO ESTADO DO MARANHÃO',
  description:
    "Os topônimos são nomes fundamentais no processo interativo homem-língua-meio por identificarem particularmente as entidades geográficas com que convivem os utentes da língua.",
  image: '/images/balsas.jpg',
  imgText: 'main image description',
};



export default function Blog() {

  const [post, setPost] = useState([])

  const config = {
    headers: { Authorization: `Bearer ${useSelector(state => state.token)}` }
  };

  useEffect(() => {
    async function fetchData() {
      const response = await apiAtema.get('post', config)
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
          <Grid container spacing={4}>
            {post.map((post) => (
              <FeaturedPost key={post.id} post={post} />
            ))}
          </Grid>
        </main>
      </Container>
      <Grid><center>-</center></Grid>
      <Footer title="Projeto Institucional" description="Universidade Estadual do Maranhão" />
    </React.Fragment>
  );
}
