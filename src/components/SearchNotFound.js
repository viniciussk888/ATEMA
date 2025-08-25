import PropTypes from 'prop-types';
// material
import { Paper, Typography } from '@material-ui/core';

// ----------------------------------------------------------------------

SearchNotFound.propTypes = {
  searchQuery: PropTypes.string
};

export default function SearchNotFound({ searchQuery = '', ...other }) {
  return (
    <Paper {...other}>
      <Typography gutterBottom align="center" variant="subtitle1">
        Selecione uma Mesorregião, Microrregião ou Município para buscar as informações.
      </Typography>
      {searchQuery && (
        <Typography variant="body2" align="center">
          Nenhum resultado encontrado para &nbsp;
          <strong>&quot;{searchQuery}&quot;</strong>. Tente verificar se há erros de digitação ou
          usar palavras completas.
        </Typography>
      )}
    </Paper>
  );
}
