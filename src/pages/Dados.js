import React, { useState, useEffect } from 'react';
import {
  Typography,
  Skeleton,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  IconButton,
  TextField,
  Card,
  Button
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import apiAtema from '../services/apiAtema';

function DadosSection({ title, endpoint, items, setItems }) {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);

  const addItem = async () => {
    if (!name) {
      toast.error('Informe um nome!');
      return;
    }
    if (adding) return;
    setAdding(true);
    await apiAtema.post(endpoint, { name });
    setAdding(false);
    setName('');
    toast.success('Adicionado com sucesso!');
    refreshData();
  };

  const deleteItem = async (id) => {
    await apiAtema.delete(`${endpoint}/${id}`);
    toast.success('Deletado com sucesso!');
    refreshData();
  };

  const refreshData = async () => {
    try {
      const response = await apiAtema.get(endpoint);
      setItems(response.data);
    } catch {
      toast.error(`Erro ao carregar ${title.toLowerCase()}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Card className="p-2">
      {loading ? (
        <Skeleton variant="rectangular" width="100%" height={500} />
      ) : (
        <div style={{ padding: 24 }}>
          <h5>{title}</h5>
          <Grid item xs={12} sm={12}>
            <TextField
              fullWidth
              required
              label="Adicionar novo item"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Button
              disabled={adding}
              variant="contained"
              size="large"
              onClick={addItem}
              style={{ marginTop: 8 }}
            >
              Adicionar
            </Button>
          </Grid>
          <br />
          <Grid item xs={12} sm={12}>
            <Typography>Total {items.length} registro(s)</Typography>
            <TableContainer style={{ maxHeight: 270 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableBody>
                  {items.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="right">
                        <IconButton
                          onClick={() => deleteItem(row.id)}
                          color="secondary"
                          aria-label="Deletar"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </div>
      )}
    </Card>
  );
}

export default function Dados() {
  const navigate = useNavigate();

  const [elemento, setElemento] = useState([]);
  const [lingua, setLingua] = useState([]);
  const [etimologia, setEtimologia] = useState([]);
  const [taxonomia, setTaxonomia] = useState([]);

  useEffect(() => {
    const admin = sessionStorage.getItem('@atema#admin');
    if (admin === '0') {
      toast.error('Operação permitida apenas para ADMINISTRADORES!');
      navigate('/', { replace: true });
    }
  }, [navigate]);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4} lg={6}>
        <DadosSection
          title="ELEMENTOS GEOGRÁFICOS"
          endpoint="elemento"
          items={elemento}
          setItems={setElemento}
        />
      </Grid>

      <Grid item xs={12} md={4} lg={6}>
        <DadosSection
          title="LÍNGUAS DE ORIGEM"
          endpoint="lingua"
          items={lingua}
          setItems={setLingua}
        />
      </Grid>

      <Grid item xs={12} md={4} lg={6}>
        <DadosSection
          title="ETIMOLOGIAS"
          endpoint="etimologia"
          items={etimologia}
          setItems={setEtimologia}
        />
      </Grid>

      <Grid item xs={12} md={4} lg={6}>
        <DadosSection
          title="TAXONOMIAS"
          endpoint="taxonomia"
          items={taxonomia}
          setItems={setTaxonomia}
        />
      </Grid>
    </Grid>
  );
}
