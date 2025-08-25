import { Icon } from '@iconify/react';
import { useRef, useState } from 'react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import { makeStyles } from '@material-ui/styles';
import Table from 'react-bootstrap/Table';
// material
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText } from '@material-ui/core';
import apiAtema from '../../../services/apiAtema';
import { toast } from 'react-toastify';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  }
}));

export default function UserMoreMenu({ atemaId, setAtemas }) {
  const classes = useStyles();
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);

  async function getData() {
    if (data.length === 0) {
      const response = await apiAtema.get(`atema/${atemaId}`);
      setData(response.data);
    }
  }

  const handleOpen = () => {
    getData();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function deleteData() {
    const update = sessionStorage.getItem('@atema#update');
    const admin = sessionStorage.getItem('@atema#admin');
    if (admin === 0 && update === 0) {
      toast.error('Você não tem permissão para a operação!');
      return;
    }
    const r = window.confirm(`Deseja realmente deletar o registro de ID ${atemaId}?`);
    if (r === true) {
      try {
        await apiAtema.delete(`atema/${atemaId}`);
        toast.success('Deletado com sucesso!');
        setAtemas((oldAtemas) => oldAtemas.filter((atema) => atema.id !== atemaId));
      } catch (error) {
        toast.error('Erro ao deletar o registro!');
      }
    } else {
      return;
    }
  }

  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">Informações Toponímicas</h2>
            <Table responsive>
              <thead>
                <tr>
                  <th>Mesorregião</th>
                  <th>Microrregião</th>
                  <th>Município</th>
                  <th>Elemento Geográfico</th>
                  <th>Topônimo</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{data.mesorregiao}</td>
                  <td>{data.microrregiao}</td>
                  <td>{data.municipio}</td>
                  <td>{data.elementogeografico}</td>
                  <td>{data.toponimo}</td>
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
            <div>
              <strong>Variante</strong>
              <p>{data.variante}</p>
              <strong>Etimologia</strong>
              <p>{data.etimologia}</p>
              <strong>Etimologia</strong>
              <p>{data.etimologiaEsc}</p>
              <strong>Observações</strong>
              <p>{data.observacoes}</p>
            </div>
          </div>
        </Fade>
      </Modal>

      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Icon icon={moreVerticalFill} width={20} height={20} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' }
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem onClick={handleOpen} sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <Icon icon={eyeFill} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Ver informações" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>

        <MenuItem onClick={deleteData} sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <Icon icon={trash2Outline} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Deletar" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
      </Menu>
    </>
  );
}
