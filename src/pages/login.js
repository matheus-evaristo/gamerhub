import * as React from 'react';
import {
  TextField,
  Box,
  Container,
  InputAdornment,
  IconButton,
  Button,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { auth } from '../service/login';

export default function Index() {
  const [user, setUser] = React.useState('');
  const [userError, setUserError] = React.useState(false);
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState(false);

  const handleChange = (event, setValue, setError) => {
    setValue(event.target.value);
    setError(false);
  };

  const isValid = () => {
    if (user === '') {
      setUserError(true);
      return false;
    }

    if (password === '') {
      setPasswordError(true);
      return false;
    }

    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isValid()) {
      const res = await auth({ user, password });
      console.log(res);
    }
  };

  const helperText = (hasError) => (hasError ? 'Campo obrigatório' : '');

  return (
    <Container maxWidth="sm" sx={{ height: '100vh' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          height: '100%',
          gap: '1rem',
        }}
        component="form"
      >
        <TextField
          fullWidth
          label="Usuário"
          variant="outlined"
          required
          error={userError}
          helperText={helperText(userError)}
          value={user}
          onChange={(e) => handleChange(e, setUser, setUserError)}
        />
        <TextField
          fullWidth
          label="Senha"
          required
          type={showPassword ? 'text' : 'password'}
          error={passwordError}
          helperText={helperText(passwordError)}
          variant="outlined"
          value={password}
          onChange={(e) => handleChange(e, setPassword, setPasswordError)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="altera a visibilidade da senha"
                  onClick={() =>
                    setShowPassword((showPassword) => !showPassword)
                  }
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button variant="contained" type="submit" onClick={handleSubmit}>
          Entrar
        </Button>
      </Box>
    </Container>
  );
}
