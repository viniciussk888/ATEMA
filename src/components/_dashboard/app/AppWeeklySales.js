import { styled } from '@material-ui/core/styles';
import { Card, Typography } from '@material-ui/core';
// utils

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  padding: theme.spacing(5, 0),
  color: theme.palette.primary.darker,
  backgroundColor: theme.palette.primary.lighter
}));

// ----------------------------------------------------------------------

export default function AppWeeklySales({ toponimos }) {
  return (
    <RootStyle>
      <Typography variant="h3">{toponimos}</Typography>
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        Topônimos
      </Typography>
    </RootStyle>
  );
}
