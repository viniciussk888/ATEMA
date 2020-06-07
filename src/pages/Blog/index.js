import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Header from './Header';
import MainFeaturedPost from './MainFeaturedPost';
import FeaturedPost from './FeaturedPost';
import Footer from './Footer';
import post1 from './blog-post.1.md';
import post2 from './blog-post.2.md';
import post3 from './blog-post.3.md';

const useStyles = makeStyles((theme) => ({
  mainGrid: {
    marginTop: theme.spacing(3),
  },
}));



const mainFeaturedPost = {
  title: 'ATLAS TOPONÍMICO DO ESTADO DO MARANHÃO',
  description:
    "Os topônimos são nomes fundamentais no processo interativo homem-língua-meio por identificarem particularmente as entidades geográficas com que convivem os utentes da língua.",
  image: '/images/balsas.jpg',
  imgText: 'main image description',
};

const featuredPosts = [
  {
    title: 'POSTAGEM 1',
    date: 'Nov 12',
    description:
      'previa de texto.',
    image: 'https://source.unsplash.com/random',
    imageText: 'Image Text',
  },
  {
    title: 'POSTAGEM 2',
    date: 'Nov 11',
    description:
      'previa de texto',
    image: 'https://source.unsplash.com/random',
    imageText: 'Image Text',
  },
];

const posts = [post1, post2, post3];

export default function Blog() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header />
        <main>
          <MainFeaturedPost post={mainFeaturedPost} />
          <Grid container spacing={4}>
            {featuredPosts.map((post) => (
              <FeaturedPost key={post.title} post={post} />
            ))}
          </Grid>
        </main>
      </Container>
      <Grid><center>-</center></Grid>
      <Footer title="Projeto Institucional" description="Universidade Estadual do Maranhão" />
    </React.Fragment>
  );
}
