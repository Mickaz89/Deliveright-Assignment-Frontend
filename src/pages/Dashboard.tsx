import React from 'react';
import { Box, Grid, IconButton, InputAdornment, Paper, Theme, useTheme } from '@mui/material';
import { AddCircleOutlineOutlined, ArrowCircleUpOutlined, Visibility } from '@mui/icons-material';
import { useAuthContext } from '../auth/useAuthContext';
import CustomButton from '../components/CustomButton';
import { Input } from '../components/Input';

export const Dashboard = () => {
    const theme: Theme = useTheme();
    const { logout } = useAuthContext();

    const [input, setInput] = React.useState<string>('');
    const [disabled, setDisabled] = React.useState<boolean>(true);

    React.useEffect(() => {
        setDisabled(input === '');
    }, [input]);

    return (
        <Box height="100%">
            <Box p={5}>
                <CustomButton onClick={() => logout()}>
                    Logout
                </CustomButton>
            </Box>
                <Grid container justifyContent="center">
                    <Grid item xs={10} sm={10} md={8} lg={6}>
                        <Input
                            fullWidth
                            onChange={(e) => setInput(e.target.value)}
                            value={input}
                            placeholder='Add task'
                            inputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AddCircleOutlineOutlined sx={{ color: theme.palette.grey[700] }} />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton disabled={disabled}>
                                            <ArrowCircleUpOutlined sx={{ color: disabled ? theme.palette.grey[700] : theme.palette.primary.dark }} />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <Box mt={10}>
                            <Paper elevation={3 }>
                                <Box p={5}>
                                    Hello
                                </Box>
                            </Paper>
                        </Box>
                    </Grid>
                </Grid>
        </Box>
    );
};

export default Dashboard;
