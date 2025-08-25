import { styled } from '@material-ui/core/styles';
import { Card, Stack, Container, Typography } from '@material-ui/core';
// components
import Page from '../components/Page';
import { MHidden } from '../components/@material-extend';
import UpdatePasswordForm from '../components/authentication/UpdatePasswordForm';

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

export default function UpdatePassword() {
  return (
    <RootStyle title="Atualizar Senha | ATEMA">
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
              Atualizar Senha
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>
              Insira sua nova senha e o código recebido por e-mail para atualizar sua senha.
            </Typography>
          </Stack>

          <UpdatePasswordForm />
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
