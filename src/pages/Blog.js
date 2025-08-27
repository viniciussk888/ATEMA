import React, { useEffect, useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Box,
  TextField,
  Stack
} from '@material-ui/core';
import apiAtema from '../services/apiAtema';
import { Link } from 'react-router-dom';

export default function AtemaLandingPage() {
  const [posts, setPost] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await apiAtema.get('posts');
      setPost(response.data);
    }
    fetchData();
  }, []);

  const features = [
    {
      id: 1,
      title: 'Login',
      description: 'Acesse o sistema de forma segura para gerenciar suas pesquisas.'
    },
    {
      id: 2,
      title: 'Dashboard',
      description: 'Visualize de maneira clara os dados coletados no projeto ATEMA.'
    },
    {
      id: 3,
      title: 'Gerencia de Informações',
      description: 'Gerencie informações toponímicas coletadas durante as pesquisas.'
    },
    {
      id: 4,
      title: 'Gerência de Usuários',
      description: 'Controle o acesso e a gestão dos participantes do projeto.'
    },
    {
      id: 5,
      title: 'Relatórios e Gráficos',
      description: 'Gere tabelas e gráficos para análise dos dados coletados.'
    },
    { id: 6, title: 'Blog', description: 'Acompanhe artigos, notícias e atualizações do projeto.' }
  ];

  return (
    <Box>
      {/* Header */}
      <AppBar position="static" sx={{ bgcolor: 'primary.main' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            ATEMA - Atlas Toponímico do Estado do Maranhão
          </Typography>
          <Button
            as={Link}
            to="/login"
            style={{
              backgroundColor: 'white',
              color: '#1976d2',
              fontWeight: 'bold',
              borderRadius: 4,
              textDecoration: 'none'
            }}
          >
            ENTRAR NO SISTEMA
          </Button>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Container sx={{ py: 8 }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={3}>
            <Box
              component="img"
              src="/static/illustrations/logo.jpg"
              alt="Logo atema"
              sx={{
                width: '100%',
                height: '100%',
                borderRadius: 2,
                boxShadow: 3,
                objectFit: 'contain'
              }}
            />
          </Grid>
          <Grid item xs={12} md={9}>
            <Typography variant="h3" gutterBottom>
              Bem-vindo ao ATEMA
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
              Este projeto é desenvolvido para o Atlas Toponímico do Estado do Maranhão, mantido
              pela UEMA. O estudo da Toponímia envolve o reconhecimento dos estratos dialetais que
              estruturam a expressão vernacular e suas diversidades gramaticais, semânticas e
              etnográficas.
            </Typography>
          </Grid>
        </Grid>
      </Container>

      {/* Features Section */}
      <Container sx={{ py: 6 }}>
        <Typography variant="h4" gutterBottom textAlign="center">
          Funcionalidades do Sistema
        </Typography>
        <Grid container spacing={4} sx={{ mt: 2 }}>
          {features.map((feature) => (
            <Grid item key={feature.id} xs={12} sm={6} md={4}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Últimas Postagens */}
      <Box sx={{ bgcolor: 'grey.100', py: 6 }}>
        <Container>
          <Typography variant="h4" gutterBottom textAlign="center">
            Últimas Postagens
          </Typography>
          <Grid container spacing={4} sx={{ mt: 2 }}>
            {posts.map((post) => (
              <Grid
                item
                key={post.id}
                xs={12}
                sm={6}
                md={4}
                onClick={() => (window.location.href = `/post/${post.id}`)}
                style={{ cursor: 'pointer' }}
              >
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {post.title}
                    </Typography>
                    <Box
                      component="img"
                      src={post.image}
                      alt={post.title}
                      sx={{
                        width: '100%',
                        height: 'auto',
                        borderRadius: 2,
                        boxShadow: 3,
                        objectFit: 'cover',
                        mt: 2
                      }}
                    />
                  </CardContent>
                  <CardActions>
                    <Button
                      as={Link}
                      to={`/post/${post.id}`}
                      color="primary"
                      size="large"
                      style={{
                        fontWeight: 'bold',
                        textDecoration: 'none'
                      }}
                    >
                      LER MAIS
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Contato */}
      <Box sx={{ py: 6 }}>
        <Container maxWidth="sm" sx={{ textAlign: 'center' }}>
          <Typography variant="h4" gutterBottom>
            Entre em Contato
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Tem dúvidas, sugestões ou deseja colaborar com o ATEMA? Envie um e-mail para:
          </Typography>
          <Stack spacing={2}>
            <Typography variant="h6" gutterBottom textAlign="left">
              Nome: Celia Leite Castro
            </Typography>
            <Typography variant="h6" gutterBottom textAlign="left">
              Instituição: Universidade Estadual do Maranhão - UEMA
            </Typography>
            <Typography variant="h6" gutterBottom textAlign="left">
              E-mail: <a href="mailto:celialeitecastro@hotmail.com">celialeitecastro@hotmail.com</a>
            </Typography>
          </Stack>
        </Container>
      </Box>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          py: 3,
          mt: 6,
          textAlign: 'center'
        }}
      >
        <Typography variant="body2">
          © {new Date().getFullYear()} ATEMA - UEMA | Atlas Toponímico do Estado do Maranhão
        </Typography>
      </Box>
    </Box>
  );
}
