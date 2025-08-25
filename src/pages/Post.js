import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Hidden from '@material-ui/core/Hidden';
import { useParams } from 'react-router-dom';
import apiAtema from 'src/services/apiAtema';

const useStyles = makeStyles({
  card: {
    display: 'flex',
    margin: 10,
    overflow: 'auto'
  },
  cardDetails: {
    flex: 1
  },
  cardMedia: {
    width: 400
  }
});

export default function Post() {
  const classes = useStyles();
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

  return (
    <Card className={classes.card}>
      <div className={classes.cardDetails}>
        <CardContent>
          <Typography component="h2" variant="h5">
            {post.title}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {post.created_at}
          </Typography>
          <Typography variant="subtitle1" paragraph>
            {post.content}
          </Typography>
          <Typography variant="subtitle1" color="primary">
            Autor: {post.author}
          </Typography>
        </CardContent>
      </div>
      <Hidden xsDown>
        <CardMedia className={classes.cardMedia} image={post.image} title={post.title} />
      </Hidden>
    </Card>
  );
}
