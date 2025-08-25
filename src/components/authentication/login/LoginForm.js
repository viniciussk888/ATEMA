import * as Yup from 'yup';
import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
import { Icon } from '@iconify/react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
// material
import { Link, Stack, TextField, IconButton, InputAdornment } from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
import { useDispatch } from 'react-redux';
//API
import apiAtema from '../../../services/apiAtema';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Informe um email válido').required('O Email é requerido'),
    password: Yup.string().required('A Senha é requerida')
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      remember: true
    },
    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      try {
        const response = await apiAtema.post('session', {
          email: values.email,
          password: values.password
        });
        dispatch({ type: 'LOG_IN', usuarioEmail: values.email, token: response.data.accessToken });
        sessionStorage.setItem('@atema#token', response.data.accessToken);
        sessionStorage.setItem('@atema#username', response.data.user.username);
        sessionStorage.setItem('@atema#email', values.email);
        sessionStorage.setItem('@atema#admin', response.data.user.admin);
        sessionStorage.setItem('@atema#insert', response.data.user.insert);
        sessionStorage.setItem('@atema#update', response.data.user.update);
        sessionStorage.setItem('@atema#delete', response.data.user.delete);
        sessionStorage.setItem('@atema#blog', response.data.user.blog);
        navigate('/dashboard', { replace: true });
      } catch (err) {
        alert('Falha no login, tente novamente. ', err);
      }
    }
  });

  const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            autoComplete="username"
            type="email"
            label="Email"
            {...getFieldProps('email')}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />

          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Senha"
            {...getFieldProps('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword} edge="end">
                    <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              )
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
          <Link component={RouterLink} variant="subtitle2" to="#">
            Esqueceu sua senha?
          </Link>
        </Stack>

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          ENTRAR
        </LoadingButton>
      </Form>
    </FormikProvider>
  );
}
