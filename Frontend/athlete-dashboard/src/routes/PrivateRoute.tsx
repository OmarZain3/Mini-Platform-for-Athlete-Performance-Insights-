import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import type { ReactElement } from 'react';

const PrivateRoute = ({ children }: { children: ReactElement }) => {
  const { authenticated } = useAuth();
  return authenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
