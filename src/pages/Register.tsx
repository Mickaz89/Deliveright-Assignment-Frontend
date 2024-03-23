import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { Box, Grid, Typography } from '@mui/material';
import { useAuthContext } from '../auth/useAuthContext';
import { Input } from '../components/Input';
import CustomButton from '../components/CustomButton';
import { RootContainer } from '../styles';


export const Register = () => {
    const { register, error } = useAuthContext();

    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const onSubmit = async (event: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent) => {
        await register(username, password, name);
    }

  return (
    <RootContainer>
        <Box height="100%" display="flex" justifyContent="center" flexDirection="column" alignItems="center">
          <Grid container justifyContent="center">
            <Grid item xs={10} sm={10} md={8} lg={6}>
              <Box display="flex" flexDirection="column" >
                <Input onChange={(e) => setName(e.target.value)} value={name} label="Name" />
                <Input onChange={(e) => setUsername(e.target.value)} value={username} label="Username" sx={{ marginTop: 2 }}/>
                <Input
                type="password" onChange={(e) => setPassword(e.target.value)}
                value={password}
                label="Password"
                sx={{ marginTop: 2 }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    onSubmit(e);
                  }
                }}
                />
                <Box mt={2} display="flex" flexDirection={"column"} alignItems={"center"}>
                {error && <Typography color="error">{error}</Typography>}
                  <Typography variant="body2" sx={{ marginTop: 2, color: "white" }}>
                  Already have an account? <Link style={{color:"white"}}  to="/login">Sign In</Link>
                  </Typography>
                </Box>
                <CustomButton sx={{ marginTop: 2 }} onClick={(e) => onSubmit(e)}>Register</CustomButton>
              </Box>
            </Grid>
          </Grid>
      </Box>
    </RootContainer>
  );
}

export default Register;
