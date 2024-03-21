import React, {useEffect, useState} from 'react';
import { Box, Grid, IconButton, InputAdornment, Paper, Theme, useTheme } from '@mui/material';
import { AddCircleOutlineOutlined, ArrowCircleUpOutlined, Visibility } from '@mui/icons-material';
import { useAuthContext } from '../auth/useAuthContext';
import CustomButton from '../components/CustomButton';
import { Input } from '../components/Input';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { fetchTasks } from '../redux/tasks.slice';
import { Task } from '../interfaces'
import { RootState } from '../redux/store';

export const Dashboard = () => {

    const dispatch = useAppDispatch();
    const theme: Theme = useTheme();
    const { logout } = useAuthContext();

    const [input, setInput] = useState<string>('');
    const [disabled, setDisabled] = useState<boolean>(true);

    const tasks: Task[] = useAppSelector((state: RootState) => state.tasks.tasks);

    useEffect(() => {
        setDisabled(input === '');
    }, [input]);

    useEffect(() => {
        dispatch(fetchTasks())
    }, []);

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
                            {tasks.map((task: Task, index: number) => (
                                <Paper elevation={3} key={index}>
                                    <Box mb={2} p={5}>
                                        {task.content}
                                    </Box>
                                </Paper>
                            ))}
                        </Box>
                    </Grid>
                </Grid>
        </Box>
    );
};

export default Dashboard;
