import { Container } from '@mui/material';
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <>
      <Navbar />
      <Container sx={{ mt: 3 }}>
        <Outlet /> 
      </Container>
    </>
  );
};

export default Layout;
