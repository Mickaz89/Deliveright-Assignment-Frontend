import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import { Box, ThemeProvider, createTheme } from '@mui/material';
import { useAuthContext } from './auth/useAuthContext';
import Register from './pages/Register';
import { Dashboard } from './pages/Dashboard';


const App = () => {
  const { isAuthenticated } = useAuthContext() || {};

  const theme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Box sx={{ backgroundColor: 'black', height:'100vh'}}>
          <Routes>
            <Route path="/register" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Register />} />
            <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />} />
            <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </Box>
      </Router>
    </ThemeProvider>
  );
};

export default App;
