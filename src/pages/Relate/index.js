import React, { useState, useEffect } from "react";
import Dashboard from "../../components/Dashboard";
import { makeStyles } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Icon from "@material-ui/core/Icon";
import Button from "@material-ui/core/Button";
import { Doughnut } from "react-chartjs-2";

import apiAtema from "../../services/apiAtema";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  grid: {
    marginBottom: 5,
    padding: 3,
  },
  table: {
    maxWidth: 600,
  },
}));

export default function Relate() {
  const classes = useStyles();
  const [value, setValue] = React.useState("");
  const [tableName, setTableName] = useState("");
  const [result, setResult] = useState([]);
  const [aux, setAux] = useState(false);
  const [totals, setTotals] = useState([]);
  const [names, setNames] = useState([]);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  async function relate() {
    if (!value) {
      return alert("Selecione um campo!");
    }
    const response = await apiAtema.post("relate", {
      tableName: value,
    });
    console.warn(response.data.rows);
    setResult(response.data.rows);
    setTableName(value);
    setAux(true);
    formalize(response.data.rows);
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
          "#6A5ACD",
          "#2F4F4F",
          "#00FF00",
          "#A0522D",
          "#4B0082",
          "#FF0000",
          "#FF4500",
          "#FFFF00",
          "#D8BFD8",
          "#F0F8FF",
          "#F0E68C",
          "#800000",
        ],
      },
    ],
    labels: names,
  };

  return (
    <>
      <Dashboard>
        <Grid item xs={12} className={classes.grid}>
          <Paper className={classes.paper}>
            <Typography variant="h6" gutterBottom>
              Selecione o campo
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={8}>
                <FormControl component="fieldset">
                  <RadioGroup
                    row
                    aria-label="position"
                    name="position"
                    defaultValue="top"
                    value={value}
                    onChange={handleChange}
                  >
                    <FormControlLabel
                      value="mesorregiao"
                      control={<Radio color="primary" />}
                      label="Mesorregião"
                      labelPlacement="top"
                    />
                    <FormControlLabel
                      value="microrregiao"
                      control={<Radio color="primary" />}
                      label="Microrregião"
                      labelPlacement="top"
                    />
                    <FormControlLabel
                      value="municipio"
                      control={<Radio color="primary" />}
                      label="Município"
                      labelPlacement="top"
                    />
                    <FormControlLabel
                      value="elementogeografico"
                      control={<Radio color="primary" />}
                      label="Elemento Geografico"
                      labelPlacement="top"
                    />
                    <FormControlLabel
                      value="toponimo"
                      control={<Radio color="primary" />}
                      label="Topônimo"
                      labelPlacement="top"
                    />
                    <FormControlLabel
                      value="tipo"
                      control={<Radio color="primary" />}
                      label="Tipo"
                      labelPlacement="top"
                    />
                    <FormControlLabel
                      value="area"
                      control={<Radio color="primary" />}
                      label="Area"
                      labelPlacement="top"
                    />
                    <FormControlLabel
                      value="linguaOrigem"
                      control={<Radio color="primary" />}
                      label="Lingua de Origem"
                      labelPlacement="top"
                    />
                    <FormControlLabel
                      value="etimologia"
                      control={<Radio color="primary" />}
                      label="Etimologia"
                      labelPlacement="top"
                    />
                    <FormControlLabel
                      value="taxionomia"
                      control={<Radio color="primary" />}
                      label="Taxonomia"
                      labelPlacement="top"
                    />
                    <FormControlLabel
                      value="estruturaMorfologica"
                      control={<Radio color="primary" />}
                      label="Estrutura Morfologica"
                      labelPlacement="top"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={2}>
                <Button
                  onClick={relate}
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  endIcon={<Icon>assessment</Icon>}
                >
                  Gerar
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {aux === true ? (
          <Grid item xs={12} className={classes.grid}>
            <Paper className={classes.paper}>
              <Typography variant="h7" gutterBottom>
                Resultado
              </Typography>

              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>
                            {tableName.toUpperCase() || "Campo"}
                          </TableCell>
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
            </Paper>
          </Grid>
        ) : (
          <br />
        )}
      </Dashboard>
    </>
  );
}
