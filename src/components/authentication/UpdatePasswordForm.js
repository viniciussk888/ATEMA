import * as Yup from 'yup';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
import { Icon } from '@iconify/react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
// material
import { Stack, TextField, IconButton, InputAdornment } from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
//API
import apiAtema from '../../services/apiAtema';
import { toast } from 'react-toastify';

// ----------------------------------------------------------------------

export default function UpdatePasswordForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Informe um email válido').required('O Email é requerido'),
    password: Yup.string().required('A Senha é requerida'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'As senhas devem ser iguais')
      .required('Confirmação de senha é requerida'),
    hash: Yup.string().required('O código é requerido')
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      hash: '',
      password: '',
      confirmPassword: ''
    },
    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      try {
        await apiAtema.post('/auth/update-password', {
          email: values.email,
          newPassword: values.password,
          hash: values.hash
        });
        toast.success('Senha atualizada com sucesso! Faça login para continuar.');
        navigate('/login', { replace: true });
      } catch (err) {
        toast.error('Erro ao atualizar senha, tente novamente. ');
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
            type="text"
            label="Código recebido por email"
            {...getFieldProps('hash')}
            error={Boolean(touched.hash && errors.hash)}
            helperText={touched.hash && errors.hash}
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

          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Confirmar senha"
            {...getFieldProps('confirmPassword')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword} edge="end">
                    <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              )
            }}
            error={Boolean(touched.confirmPassword && errors.confirmPassword)}
            helperText={touched.confirmPassword && errors.confirmPassword}
          />
        </Stack>

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
          style={{ marginTop: 32 }}
        >
          ATUALIZAR SENHA
        </LoadingButton>
      </Form>
    </FormikProvider>
  );
}
