import * as React from 'react';
import { Box, Container } from '@mui/material';
import LoginForm from '../container/LoginForm.js/LoginForm';

export default function Index() {
  return (
    <Container maxWidth="sm" sx={{ height: '100vh' }}>
      <Box sx={{ height: '100%' }}>
        <LoginForm></LoginForm>
      </Box>
    </Container>
  );
}
