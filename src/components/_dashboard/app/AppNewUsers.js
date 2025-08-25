import { styled } from '@material-ui/core/styles';
import { Card, Typography } from '@material-ui/core';
// utils
import { fShortenNumber } from '../../../utils/formatNumber';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  padding: theme.spacing(5, 0),
  color: theme.palette.info.darker,
  backgroundColor: theme.palette.info.lighter
}));

// ----------------------------------------------------------------------

export default function AppNewUsers({ municipios }) {
  return (
    <RootStyle>
      <Typography variant="h3">{municipios}</Typography>
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        Municipios
      </Typography>
    </RootStyle>
  );
}
