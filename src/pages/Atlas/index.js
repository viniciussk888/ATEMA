import React, { useState, useEffect } from 'react';
import Dashboard from '../../components/Dashboard';
import { Link } from 'react-router-dom';

//import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import apiMeso from "../../services/apiMeso";
import apiMun from "../../services/apiMun";
import mesorregioes from '../../utils/mesorregioes.json'
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';

// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
}

const rows = [
  createData(0, '16 Mar, 2019', 'Elvis Presley', 'Tupelo, MS', 'VISA ⠀•••• 3719', 312.44),
  createData(1, '16 Mar, 2019', 'Paul McCartney', 'London, UK', 'VISA ⠀•••• 2574', 866.99),
  createData(2, '16 Mar, 2019', 'Tom Scholz', 'Boston, MA', 'MC ⠀•••• 1253', 100.81),
  createData(3, '16 Mar, 2019', 'Michael Jackson', 'Gary, IN', 'AMEX ⠀•••• 2000', 654.39),
  createData(4, '15 Mar, 2019', 'Bruce Springsteen', 'Long Branch, NJ', 'VISA ⠀•••• 5919', 212.79),
];

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  paperPrimary: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
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
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 600,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  button: {
    margin: theme.spacing(1),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 250,
  }
}));


export default function AtlasForm() {
  const classes = useStyles();
  const [microrregioes, setMicorregioes] = useState([]);
  const [municipios, setMunicipios] = useState([]);
  const [codMeso, setCodMeso] = useState("");//MESOREGIAO COD+NOME
  const [municipio, setMunicipio] = useState("");
  const [microrregiao, setMicrorregiao] = useState("");

  useEffect(() => {
    let aux = codMeso.split('-');
    let id = aux[0];

    async function fetchData() {
      const response = await apiMeso.get(`${id}/microrregioes`);
      setMicorregioes(response.data);
    }
    fetchData();
  }, [codMeso]);

  useEffect(() => {
    let aux = microrregiao.split('-');
    let id = aux[0];

    async function fetchData() {
      const response = await apiMun.get(`${id}/municipios`);
      setMunicipios(response.data);
    }
    fetchData();

  }, [microrregiao])

  const handleChangeMeso = (event) => {
    setCodMeso(event.target.value);
  };
  const handleChangeMicro = (event) => {
    setMicrorregiao(event.target.value);
  };
  const handleChangeMun = (event) => {
    setMunicipio(event.target.value);
  };

  return (
    <>
      <Dashboard>
        <Grid item xs={12} className={classes.grid}>
          <Paper className={classes.paperPrimary}>
            <Typography variant="h6" gutterBottom>
              Filtros
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={3}>
                <FormControl variant="filled" className={classes.formControl}>
                  <InputLabel htmlFor="filled-age-native-simple">Mesorregião</InputLabel>
                  <Select
                    required
                    native
                    onChange={handleChangeMeso}
                  >
                    <option selected disabled value="Não selecionada">Selecione...</option>
                    {mesorregioes.map(item => (
                      <option value={item.codigo + '-' + item.nome}>{item.nome}</option>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={3}>
                <FormControl variant="filled" className={classes.formControl}>
                  <InputLabel htmlFor="filled-age-native-simple">Microrregião</InputLabel>
                  <Select
                    required
                    native
                    onChange={handleChangeMicro}
                  >
                    <option selected disabled value="Não selecionada">Selecione...</option>
                    {microrregioes.map(item => (
                      <option value={item.id + '-' + item.nome}>{item.nome}</option>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={3}>
                <FormControl variant="filled" className={classes.formControl}>
                  <InputLabel htmlFor="filled-age-native-simple">Município</InputLabel>
                  <Select
                    required
                    native
                    onChange={handleChangeMun}
                  >
                    <option selected disabled value="Não selecionada">Selecione...</option>
                    {municipios.map(item => (
                      <option value={item.nome}>{item.nome}</option>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Link to='/novoatlas'>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    endIcon={<Icon>search</Icon>}
                  > APLICAR FILTRO</Button>
                </Link>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Link to='/novoatlas'>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    endIcon={<Icon>add</Icon>}
                  > NOVO </Button>
                </Link>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={12} className={classes.grid}>
          <Paper className={classes.paper}>
            <React.Fragment>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Ship To</TableCell>
                    <TableCell>Payment Method</TableCell>
                    <TableCell align="right">Sale Amount</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell>{row.date}</TableCell>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.shipTo}</TableCell>
                      <TableCell>{row.paymentMethod}</TableCell>
                      <TableCell align="right">{row.amount}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </React.Fragment>
          </Paper>
        </Grid>
      </Dashboard>
    </>
  );
}