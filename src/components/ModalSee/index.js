import React, { useState, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table'
import apiAtema from "../../services/apiAtema";
import { useSelector } from 'react-redux';



const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  button: {
    marginRight: 50
  },
  grid: {
    marginBottom: 5,
    padding: 3
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: '80%',
  },
}));

export default function See(props) {
  const classes = useStyles();
  const id = localStorage.getItem('atemaUpdate')
  const [data, setData] = useState([]);

  const config = {
    headers: { Authorization: `Bearer ${useSelector(state => state.token)}` }
  };

  useEffect(() => {
    async function fetch() {
      try {
        const response = await apiAtema.get(`atema/${id}`, config)
        setData(response.data)
      } catch (error) {
      }
    }
    fetch()
  }, [id])


  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <Table responsive>
          <thead>
            <tr>
              <th>Mesorregião</th>
              <th>Microrregião</th>
              <th>Município</th>
              <th>Elemento Geográfico</th>
              <th>Topônimo</th>
              <th>Variante</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{data.mesorregiao}</td>
              <td>{data.microrregiao}</td>
              <td>{data.municipio}</td>
              <td>{data.elementogeografico}</td>
              <td>{data.toponimo}</td>
              <td>{data.variante}</td>
            </tr>
          </tbody>
          <thead>
            <tr>
              <th>Tipo</th>
              <th>Área</th>
              <th>Língua de Origem</th>
              <th>Taxionomia</th>
              <th>Estrutura Morfológica</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{data.tipo}</td>
              <td>{data.area}</td>
              <td>{data.linguaOrigem}</td>
              <td>{data.taxionomia}</td>
              <td>{data.estruturaMorfologica}</td>
            </tr>
          </tbody>
          <thead>
            <tr>
              <th>Referências</th>
              <th>Fonte (dados do mapa)</th>
              <th>Data da coleta</th>
              <th>Responsavel pela coleta</th>
              <th>Revisor</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{data.referencias}</td>
              <td>{data.fonte}</td>
              <td>{data.dataColeta}</td>
              <td>{data.responsavel}</td>
              <td>{data.revisor}</td>
            </tr>
          </tbody>
        </Table>
        <div className={classes.div}>
          <strong>Etimologia</strong>
          <p>{data.etimologia}</p>
          <strong>Observações</strong>
          <p>{data.observacoes}</p>
        </div>
      </Modal.Body>
    </Modal>
  );
}

