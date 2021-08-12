import { Icon } from '@iconify/react';
import { useRef, useState } from 'react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import { Link as RouterLink } from 'react-router-dom';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
// material
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText } from '@material-ui/core';
import { useSelector } from 'react-redux';
import apiAtema from '../../../services/apiAtema';

// ----------------------------------------------------------------------

export default function UserMoreMenu({ atemaId }) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const config = {
    headers: { Authorization: `Bearer ${useSelector((state) => state.token)}` }
  };

  async function deleteData() {
    const update = localStorage.getItem('@atema#update');
    const admin = localStorage.getItem('@atema#admin');
    if (admin === 0 && update === 0) {
      alert('Sem permissão para a operação!');
      return;
    }
    const r = window.confirm(`Confirma a EXCLUSÃO?`);
    if (r === true) {
      try {
        await apiAtema.delete(`atema/${atemaId}`, config);
        window.location.reload();
      } catch (error) {
        alert('Erro ao deletar!! ' + error);
      }
    } else {
      return;
    }
  }

  return (
    <>
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
        <MenuItem component={RouterLink} to="#" sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <Icon icon={eyeFill} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Ver mais" primaryTypographyProps={{ variant: 'body2' }} />
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
