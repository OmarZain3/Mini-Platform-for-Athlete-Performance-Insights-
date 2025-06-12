import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Box } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import API from '../api/axios';
import logo from '../assets/see logo.png';




const LoginForm = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ username: '', password: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      const formData = new URLSearchParams();
      formData.append('username', form.username);
      formData.append('password', form.password);
  
      const response = await API.post<{ access_token: string; token_type: string }>(
        '/auth/login',
        formData,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );
  
      console.log("Login success:", response.data);
      login(response.data.access_token);
      navigate('/');
    } catch (err: any) {
      if (err.response) {
        console.error("Login error response:", err.response);
        alert(`Login failed: ${err.response.status} - ${err.response.data?.detail || 'Unknown error'}`);
      } else if (err.request) {
        console.error("No response from backend:", err.request);
        alert("Login failed: No response from server");
      } else {
        console.error("Other error:", err.message);
        alert("Login failed: unknown error");
      }
    }
  };
  
  

  return (
    <Box sx={{ width: 300, margin: 'auto' }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
        <img 
          src={logo} 
          alt="Logo" 
          style={{ width: '350px', height: 'auto' }}
        />
      </Box>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField label="Username" fullWidth margin="normal"
          value={form.username}
          onChange={e => setForm({ ...form, username: e.target.value })}
        />
        <TextField label="Password" type="password" fullWidth margin="normal"
          value={form.password}
          onChange={e => setForm({ ...form, password: e.target.value })}
        />
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
        </div>
        <Button type="submit" variant="contained" fullWidth>Login</Button>
      </Box>
    </Box>
  );
};

export default LoginForm;
