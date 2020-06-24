import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

function Copyright() {
  return (
    <Typography variant="body2" color="primary" align="center">
      {'Copyright © '}
      <Link color="primary" href="https://viniciusportfolio.herokuapp.com/#about">
        Desenvolvido por Vinicius Martins & Armando Jr
      </Link><br />{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: '#1C1C1C',
    // marginTop: theme.spacing(8),
    padding: theme.spacing(6, 0),
  },
  color: {
    color: '#fff'
  }
}));

export default function Footer(props) {
  const classes = useStyles();
  const { description, title } = props;

  return (
    <footer className={classes.footer}>
      <Container maxWidth="lg">
        <Typography variant="h6" align="center" className={classes.color} gutterBottom>
          {title}
        </Typography>
        <Typography variant="subtitle1" align="center" className={classes.color} component="p">
          {description}
        </Typography>
        <Copyright />
      </Container>
    </footer>
  );
}

Footer.propTypes = {
  description: PropTypes.string,
  title: PropTypes.string,
};
