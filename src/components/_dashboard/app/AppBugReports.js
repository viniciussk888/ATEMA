import { styled } from '@material-ui/core/styles';
import { Card, Typography } from '@material-ui/core';
// utils
import { fShortenNumber } from '../../../utils/formatNumber';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  padding: theme.spacing(5, 0),
  color: theme.palette.error.darker,
  backgroundColor: theme.palette.error.lighter
}));

// ----------------------------------------------------------------------

export default function AppBugReports({ elementogeograficos }) {
  return (
    <RootStyle>
      <Typography variant="h3">{elementogeograficos}</Typography>
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        Elementos Geográficos
      </Typography>
    </RootStyle>
  );
}
