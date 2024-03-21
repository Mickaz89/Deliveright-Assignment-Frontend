import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Grid, Typography } from '@mui/material';
import { useAuthContext } from '../auth/useAuthContext';
import { Input } from '../components/Input';
import CustomButton from '../components/CustomButton';


export const Login = () => {
  const { login, error } = useAuthContext();

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const submit = async () => {
    await login(username, password);
  }
  return (
    <Box height={"100%"} display="flex" justifyContent="center" flexDirection="column" alignItems="center">
      <Grid container justifyContent="center">
        <Grid item xs={10} sm={10} md={8} lg={6}>
          <Box display="flex" flexDirection="column" >
            <Input onChange={(e) => setUsername(e.target.value)} value={username} label="Username" />
            <Input onChange={(e) => setPassword(e.target.value)} value={password} sx={{ marginTop: 2 }} label="Password" />
            <Box mt={2} display="flex" flexDirection={"column"} alignItems={"center"}>
            {error && error !== null && <Typography color="error">{error}</Typography>}
              <Typography variant="body2" sx={{ marginTop: 2, color: "white" }}>
                Don't have an account? <Link style={{color:"white"}} to="/register">Sign Up</Link>
              </Typography>
            </Box>
            <CustomButton sx={{ marginTop: 2 }} onClick={submit}>Login</CustomButton>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Login;
