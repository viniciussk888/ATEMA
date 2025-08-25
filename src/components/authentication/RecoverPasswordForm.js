import * as Yup from 'yup';
import { useState } from 'react';
import { useFormik, Form, FormikProvider } from 'formik';
// material
import { Stack, TextField, Typography } from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
//API
import apiAtema from '../../services/apiAtema';
import { toast } from 'react-toastify';

// ----------------------------------------------------------------------

export default function RecoverPasswordForm() {
  const [isSend, setIsSend] = useState(false);

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Informe um email válido').required('O Email é requerido')
  });

  const formik = useFormik({
    initialValues: {
      email: ''
    },
    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      try {
        await apiAtema.post('/auth/recover-password', {
          email: values.email
        });
        toast.success('Instruções enviadas para o seu e-mail!');
        setIsSend(true);
      } catch (err) {
        toast.error('Erro ao enviar instruções, tente novamente. ');
      }
    }
  });

  const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      {isSend ? (
        <Typography sx={{ color: 'text.primary', fontWeight: '700' }}>
          ENVIADO! Verifique seu e-mail para as instruções de recuperação de senha.
        </Typography>
      ) : (
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Stack spacing={3} style={{ marginBottom: '40px' }}>
            <TextField
              fullWidth
              autoComplete="username"
              type="email"
              label="Email"
              {...getFieldProps('email')}
              error={Boolean(touched.email && errors.email)}
              helperText={touched.email && errors.email}
            />
          </Stack>

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Enviar
          </LoadingButton>
        </Form>
      )}
    </FormikProvider>
  );
}
