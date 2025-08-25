import React, { useState } from 'react';
import {
  Container,
  Grid,
  Typography,
  FormControl,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Card,
  InputLabel,
  Select,
  MenuItem
} from '@material-ui/core';
import { Doughnut } from 'react-chartjs-2';
// components
import Page from '../components/Page';
import { makeStyles } from '@material-ui/styles';

// ----------------------------------------------------------------------
import apiAtema from '../services/apiAtema';

const useStyles = makeStyles((theme) => ({
  grid: {
    marginBottom: 5,
    padding: 3
  },
  table: {
    maxWidth: 600
  }
}));

export default function RelatePage() {
  const classes = useStyles();
  const [value, setValue] = React.useState('');
  const [tableName, setTableName] = useState('');
  const [result, setResult] = useState([]);
  const [aux, setAux] = useState(false);
  const [totals, setTotals] = useState([]);
  const [names, setNames] = useState([]);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  async function relate() {
    if (!value) {
      return alert('Selecione um campo!');
    }
    const response = await apiAtema.post('relate', {
      tableName: value
    });
    setResult(response.data);
    setTableName(value);
    setAux(true);
    formalize(response.data);
  }

  function formalize(data) {
    let names = [];
    let totals = [];
    data.map((item) => names.push(item.name));
    data.map((item) => totals.push(item.total));
    setNames(names);
    setTotals(totals);
  }

  const data = {
    datasets: [
      {
        data: totals,
        backgroundColor: [
          '#6A5ACD',
          '#2F4F4F',
          '#00FF00',
          '#A0522D',
          '#4B0082',
          '#FF0000',
          '#FF4500',
          '#FFFF00',
          '#D8BFD8',
          '#F0F8FF',
          '#F0E68C',
          '#800000'
        ]
      }
    ],
    labels: names
  };

  return (
    <Page title="Dashboard: Graficos | ATEMA">
      <Container>
        <Grid item xs={12} className={classes.grid}>
          <Card style={{ padding: 24 }}>
            <Typography variant="h7" gutterBottom>
              Selecione o campo a gerar os dados
            </Typography>
            <Grid mt={1} container spacing={2}>
              <Grid item xs={6} sm={6}>
                <FormControl fullWidth variant="outlined" className={classes.formControl}>
                  <InputLabel id="demo-simple-select-outlined-label">Campo</InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={value}
                    onChange={handleChange}
                    label="Campo"
                  >
                    <MenuItem value="">
                      <em>Selecione</em>
                    </MenuItem>
                    <MenuItem value="mesorregiao">Mesorregião</MenuItem>
                    <MenuItem value="microrregiao">Microrregião</MenuItem>
                    <MenuItem value="municipio">Município</MenuItem>
                    <MenuItem value="elementogeografico">Elemento Geografico</MenuItem>
                    <MenuItem value="toponimo">Topônimo</MenuItem>
                    <MenuItem value="tipo">Tipo</MenuItem>
                    <MenuItem value="area">Area</MenuItem>
                    <MenuItem value="linguaOrigem">Lingua de Origem</MenuItem>
                    <MenuItem value="etimologia">Etimologia</MenuItem>
                    <MenuItem value="taxionomia">Taxonomia</MenuItem>
                    <MenuItem value="estruturaMorfologica">Estrutura Morfologica</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={6} sm={6}>
                <Button
                  onClick={relate}
                  fullWidth
                  size="large"
                  variant="contained"
                  color="primary"
                  className={classes.button}
                >
                  Gerar
                </Button>
              </Grid>
            </Grid>
          </Card>
        </Grid>

        {aux === true ? (
          <Grid item xs={12} className={classes.grid}>
            <Card style={{ padding: 24 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TableContainer component={Card}>
                    <Table className={classes.table} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>{tableName.toUpperCase() || 'Campo'}</TableCell>
                          <TableCell align="right">TOTAL</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {result.map((row) => (
                          <TableRow key={row.name}>
                            <TableCell component="th" scope="row">
                              {row.name}
                            </TableCell>
                            <TableCell align="right">{row.total}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Doughnut data={data} />
                </Grid>
              </Grid>
            </Card>
          </Grid>
        ) : (
          <br />
        )}
      </Container>
    </Page>
  );
}
