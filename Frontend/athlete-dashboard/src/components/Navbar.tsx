import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { useNavigate, NavLink } from 'react-router-dom';
import logo from '../assets/see logo pic.png';
const Navbar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const linkStyle = {
    color: 'white',
    textDecoration: 'none',
    marginRight: '1rem',
  };

  const activeStyle = {
    color: '#94C94A',
    fontWeight: 'bold',
    borderBottom: '2px solid #94C94A',
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <img src={logo} alt="Logo" style={{ width: '50px', height: 'auto' }} />
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Athlete Insights
        </Typography>

        <NavLink
          to="/"
          style={({ isActive }) => ({
            ...linkStyle,
            ...(isActive ? activeStyle : {}),
          })}
        >
          <Button color="inherit">Dashboard</Button>
        </NavLink>

        <NavLink
          to="/upload"
          style={({ isActive }) => ({
            ...linkStyle,
            ...(isActive ? activeStyle : {}),
          })}
        >
          <Button color="inherit">Upload</Button>
        </NavLink>

        <NavLink
          to="/metrics"
          style={({ isActive }) => ({
            ...linkStyle,
            ...(isActive ? activeStyle : {}),
          })}
        >
          <Button color="inherit">Metrics</Button>
        </NavLink>

        <Button color="inherit" onClick={() => { logout(); navigate('/login'); }}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
