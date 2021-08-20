// material
import { Box, Grid, Container, Typography } from '@material-ui/core';
// components
import Page from '../components/Page';
import {
  AppNewUsers,
  AppBugReports,
  AppWeeklySales,
  AppWebsiteVisits
} from '../components/_dashboard/app';

// ----------------------------------------------------------------------

export default function DashboardApp() {
  return (
    <Page title="Dashboard | ATEMA">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">Olá, bem-vindo</Typography>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4} md={4}>
            <AppWeeklySales />
          </Grid>
          <Grid item xs={12} sm={4} md={4}>
            <AppNewUsers />
          </Grid>
          <Grid item xs={12} sm={4} md={4}>
            <AppBugReports />
          </Grid>

          <Grid item xs={12} md={12} lg={12}>
            <AppWebsiteVisits />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
