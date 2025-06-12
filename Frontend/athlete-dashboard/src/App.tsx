import { Routes, Route } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';
import UploadForm from './components/UploadForm';
import MetricForm from './components/MetricForm';
import PrivateRoute from './routes/PrivateRoute';
import Layout from './components/Layout';
import './App.css';

const App = () => {
  return (
    <Routes>
      {/* Public route */}
      <Route path="/login" element={<LoginForm />} />

      {/* Protected routes with shared layout */}
      <Route element={<PrivateRoute><Layout /></PrivateRoute>}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/upload" element={<UploadForm />} />
        <Route path="/metrics" element={<MetricForm />} />
      </Route>
    </Routes>
  );
};

export default App;
