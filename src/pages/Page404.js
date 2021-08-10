import { motion } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';
// material
import { styled } from '@material-ui/core/styles';
import { Box, Button, Typography, Container } from '@material-ui/core';
// components
import { MotionContainer, varBounceIn } from '../components/animate';
import Page from '../components/Page';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  display: 'flex',
  minHeight: '100%',
  alignItems: 'center',
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10)
}));

// ----------------------------------------------------------------------

export default function Page404() {
  return (
    <RootStyle title="404 Page Not Found | ATEMA">
      <Container>
        <MotionContainer initial="initial" open>
          <Box sx={{ maxWidth: 480, margin: 'auto', textAlign: 'center' }}>
            <motion.div variants={varBounceIn}>
              <Typography variant="h3" paragraph>
                Desculpe, página não encontrada!
              </Typography>
            </motion.div>
            <Typography sx={{ color: 'text.secondary' }}>
              Não foi possível encontrar a página que você está procurando. Talvez você tenha
              digitado incorretamente o URL? Certifique-se de verificar a ortografia.
            </Typography>

            <motion.div variants={varBounceIn}>
              <Box
                component="img"
                src="/static/illustrations/illustration_404.svg"
                sx={{ height: 260, mx: 'auto', my: { xs: 5, sm: 10 } }}
              />
            </motion.div>

            <Button to="/" size="large" variant="contained" component={RouterLink}>
              Retornar
            </Button>
          </Box>
        </MotionContainer>
      </Container>
    </RootStyle>
  );
}
