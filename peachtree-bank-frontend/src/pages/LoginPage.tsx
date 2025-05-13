import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../auth/AuthContext';
import { apiCalls } from '../shared/apiCalls';

// COMPONENTS
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const { token } = await apiCalls.login({ username, password });
      login(token);
      navigate('/');
    } catch {
      alert('Login failed');
    }
  };

  return (
    <Box display="flex" flexDirection="column" maxWidth={300} mx="auto" mt={10}>
      <Typography variant="h5" mb={2}>Login</Typography>
      <TextField
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        margin="normal"
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        margin="normal"
      />
      <Button onClick={handleSubmit} variant="contained" color="primary" fullWidth>
        Login
      </Button>
    </Box>
  );
}

export default LoginPage;
