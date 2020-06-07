import React from 'react'
import Dashboard from '../../components/Dashboard';
import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  grid: {
    marginBottom: 5,
    padding: 3
  },
}));

export default function Relate() {
  const classes = useStyles();
  return (
    <>
      <Dashboard>
        <Grid item xs={12} className={classes.grid}>
          <Paper className={classes.paper}>
            <h>em produção</h>
          </Paper>
        </Grid>
      </Dashboard>
    </>
  )
}