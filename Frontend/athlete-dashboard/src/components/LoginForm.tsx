import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Box } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import API from '../api/axios';

interface LoginResponse {
  access_token: string;
  user: {
    username: string;
    password: string;
  };
}

const LoginForm = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ username: '', password: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formData = new URLSearchParams();
      formData.append("username", form.username);
      formData.append("password", form.password);
      const res = await API.post<LoginResponse>('/auth/login', formData);
      
      if (res.data.user.username === form.username && res.data.user.password === form.password) {
        login(res.data.access_token);
        navigate('/dashboard');
      } else {
        alert('Invalid credentials');
      }
    } catch {
      alert('Login failed');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ width: 300, margin: 'auto', mt: 10 }}>
      <TextField label="Username" fullWidth margin="normal"
        value={form.username}
        onChange={e => setForm({ ...form, username: e.target.value })}
      />
      <TextField label="Password" type="password" fullWidth margin="normal"
        value={form.password}
        onChange={e => setForm({ ...form, password: e.target.value })}
      />
      <Button type="submit" variant="contained" fullWidth>Login</Button>
    </Box>
  );
};

export default LoginForm;
