// material
import { Box, Grid, Container, Typography, Skeleton } from '@material-ui/core';
// components
import Page from '../components/Page';
import {
  AppNewUsers,
  AppBugReports,
  AppWeeklySales,
  AppWebsiteVisits
} from '../components/_dashboard/app';
import apiAtema from 'src/services/apiAtema';
import { useEffect, useState } from 'react';

// ----------------------------------------------------------------------

export default function DashboardApp() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const fetchData = async () => {
    try {
      const response = await apiAtema.get('dashboard');
      setData(response.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Page title="Dashboard | ATEMA">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">Olá, bem-vindo</Typography>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4} md={4}>
            {loading ? (
              <Skeleton variant="text" height={150} />
            ) : (
              <AppWeeklySales toponimos={data?.toponimos} />
            )}
          </Grid>
          <Grid item xs={12} sm={4} md={4}>
            {loading ? (
              <Skeleton variant="text" height={150} />
            ) : (
              <AppNewUsers municipios={data?.municipios} />
            )}
          </Grid>
          <Grid item xs={12} sm={4} md={4}>
            {loading ? (
              <Skeleton variant="text" height={150} />
            ) : (
              <AppBugReports elementogeograficos={data?.elementogeograficos} />
            )}
          </Grid>

          <Grid item xs={12} md={12} lg={12}>
            {loading ? (
              <Skeleton variant="rectangular" height={364} />
            ) : (
              <AppWebsiteVisits topMunicipios={data?.topMunicipios} />
            )}
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
