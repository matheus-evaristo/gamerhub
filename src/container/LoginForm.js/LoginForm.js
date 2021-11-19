import React from 'react';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-mui';
import * as yup from 'yup';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { auth } from '../../service/login';

import {
  Alert,
  InputAdornment,
  IconButton,
  Button,
  LinearProgress,
  styled,
} from '@mui/material';

const required = 'Campo obrigatório';

const FormWrapper = styled(Form)`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
`;

const LoginForm = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [error, setError] = React.useState(false);

  const FORM_VALIDATION = yup.object({
    user: yup.string().required(required),
    password: yup.string().required(required),
  });

  return (
    <Formik
      initialValues={{
        user: '',
        password: '',
      }}
      validationSchema={FORM_VALIDATION}
      onSubmit={async ({ user, password }) => {
        try {
          const res = await auth({ user, password });
          console.log(res);
        } catch (err) {
          setError(true);
          console.error(err);
        }
      }}
    >
      {({ submitForm, isSubmitting }) => (
        <FormWrapper
          sx={{
            height: '100%',
          }}
        >
          <Field
            fullWidth
            required
            component={TextField}
            name="user"
            id="user"
            label="Usuário"
            variant="outlined"
          />
          <Field
            fullWidth
            required
            component={TextField}
            label="Senha"
            name="password"
            id="password"
            type={showPassword ? 'text' : 'password'}
            variant="filled"
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">
                  <IconButton
                    aria-label="alterna a visibilidade da senha"
                    onClick={() => setShowPassword((value) => !value)}
                    onMouseDown={(event) => event.preventDefault()}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {isSubmitting && <LinearProgress />}

          {error && (
            <Alert icon={false} severity="error">
              E-mail ou senha incorretos
            </Alert>
          )}

          <Button
            disabled={isSubmitting}
            onClick={(e) => {
              e.preventDefault();
              submitForm();
            }}
            type="submit"
            variant="contained"
          >
            Entrar
          </Button>
        </FormWrapper>
      )}
    </Formik>
  );
};

export default LoginForm;
