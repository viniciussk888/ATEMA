import { styled } from '@material-ui/core/styles';
import { Card, Stack, Container, Typography } from '@material-ui/core';
// components
import Page from '../components/Page';
import { MHidden } from '../components/@material-extend';
import RecoverPasswordForm from '../components/authentication/RecoverPasswordForm';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex'
  }
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 764,
  height: '95vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2)
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0)
}));

// ----------------------------------------------------------------------

export default function RecoverPassword() {
  return (
    <RootStyle title="Recuperar Senha | ATEMA">
      <MHidden width="mdDown">
        <SectionStyle>
          <img
            src="/static/illustrations/atema.jpg"
            alt="login"
            style={{ objectFit: 'contain', width: '100%', height: '100%' }}
          />
        </SectionStyle>
      </MHidden>

      <Container maxWidth="sm">
        <ContentStyle>
          <Stack sx={{ mb: 5 }}>
            <Typography variant="h4" gutterBottom>
              Recuperar Senha
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>
              Insira seu e-mail cadastrado para receber as instruções de recuperação de senha no seu
              e-mail.
            </Typography>
          </Stack>

          <RecoverPasswordForm />
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
