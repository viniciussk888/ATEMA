import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Grid, Button, Container, Stack, Typography } from '@material-ui/core';
// components
import Page from '../components/Page';
import { BlogPostCard } from '../components/_dashboard/blog';
//

// ----------------------------------------------------------------------

import apiAtema from '../services/apiAtema';

export default function Blog() {
  const [post, setPost] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await apiAtema.get('post');
      setPost(response.data);
    }
    fetchData();
  }, []);

  return (
    <Page title="Blog | ATEMA">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mt={5} mb={5}>
          <Typography variant="h4" gutterBottom>
            Bem-vindo ao portal do ATEMA
          </Typography>
          <Button variant="contained" component={RouterLink} to="/login">
            ACESSAR SISTEMA
          </Button>
        </Stack>

        <Grid container spacing={3}>
          {post.map((post, index) => (
            <BlogPostCard key={post.id} post={post} index={index} />
          ))}
        </Grid>
      </Container>
    </Page>
  );
}
