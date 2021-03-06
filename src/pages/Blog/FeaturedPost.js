import React from 'react';
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Hidden from '@material-ui/core/Hidden';

const useStyles = makeStyles({
  card: {
    display: 'flex',
  },
  cardDetails: {
    flex: 1,
  },
  cardMedia: {
    width: 160,
  },
  paper: {
    padding: 1,
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  grid: {
    marginBottom: 5,
    padding: 3
  },
  image: {
    maxHeight: '500px',
    maxWidth: '500px',
    margin: '5px'
  },
  font: {
    fontSize: '16px',
  }
});

export default function FeaturedPost(props) {
  const history = useHistory();
  const classes = useStyles();
  const { post } = props;

  function resumeContent(content) {
    const resume = content.split(' ')
    return resume[0] + " " + resume[1] + " " + resume[2] + " " + resume[3] + " " + resume[4] + " " + resume[5] + " " + resume[6] + "..."
  }
  function setPostId(id) {
    localStorage.setItem('postId', id)
    history.push('/blog/postblog')
  }

  return (
    <>
      <Grid item xs={12} md={6}>
        <CardActionArea component="a" onClick={() => (setPostId(post.id))}>
          <Card className={classes.card}>
            <div className={classes.cardDetails}>
              <CardContent>
                <Typography component="h2" variant="h5">
                  {post.title}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  {post.created_at}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  {post.author}
                </Typography>
                <Typography variant="subtitle1" paragraph>
                  {resumeContent(post.content)}
                </Typography>
                <Typography variant="subtitle1" color="primary">
                  Continue lendo...
              </Typography>
              </CardContent>
            </div>
            <Hidden xsDown>
              <CardMedia className={classes.cardMedia} image={post.image} />
            </Hidden>
          </Card>
        </CardActionArea>
      </Grid>
    </>
  );
}

FeaturedPost.propTypes = {
  post: PropTypes.object,
};
