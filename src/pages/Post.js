import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Avatar, Divider, Button } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import apiAtema from '../services/apiAtema';
import { fDateTimeSuffix } from '../utils/formatTime';

export default function PostPage() {
  const [post, setPost] = useState({});
  const params = useParams();

  useEffect(() => {
    const getPost = async () => {
      try {
        const postId = params.id;
        const response = await apiAtema.get(`posts/${postId}`);
        setPost(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getPost();
  }, [params.id]);

  if (!post) return <Typography>Carregando...</Typography>;

  return (
    <Container maxWidth="md" sx={{ mt: 5, pb: 20 }}>
      {/* Botao voltar */}
      <Button variant="outlined" onClick={() => window.history.back()} sx={{ mb: 3 }}>
        Voltar
      </Button>

      {/* Título */}
      <Typography variant="h3" component="h1" gutterBottom>
        {post.title}
      </Typography>

      {/* Autor e data */}
      <Box display="flex" alignItems="center" mb={2}>
        <Avatar sx={{ mr: 2 }}>{post?.author?.charAt(0)}</Avatar>
        <Box>
          <Typography variant="subtitle1">{post.author}</Typography>
          <Typography variant="caption" color="text.secondary">
            {fDateTimeSuffix(post.createdAt)}
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ mb: 3 }} />

      {/* Imagem destaque */}
      <Box
        component="img"
        src={post.image}
        alt={post.title}
        sx={{
          width: '100%',
          height: 'auto',
          borderRadius: 2,
          mb: 3
        }}
      />

      {/* Conteúdo vindo em HTML */}
      <Box
        sx={{
          typography: 'body1',
          lineHeight: 1.8,
          '& h2': { fontSize: '1.5rem', marginTop: 3 },
          '& p': { marginBottom: 2 }
        }}
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </Container>
  );
}
