import React, { useEffect, useState } from 'react';
import { Box, Grid, IconButton, InputAdornment, Paper, Theme, useTheme, Typography } from '@mui/material';
import { AddCircleOutlineOutlined, ArrowCircleUpOutlined, Visibility } from '@mui/icons-material';
import { useAuthContext } from '../auth/useAuthContext';
import CustomButton from '../components/CustomButton';
import { Input } from '../components/Input';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { createTask, fetchTasks } from '../redux/tasks.slice';
import { Task, TaskStatus, User } from '../interfaces'
import { RootState } from '../redux/store';
import { styled } from '@mui/system';

const RootContainer = styled('div')(({ theme }) => ({
    width: '100vw',
    height: '100vh',
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: theme.palette.background.default,
    margin: 0,
    padding: 0,
    overflow: 'hidden',
}));


export const Dashboard = () => {

    const { user }: { user: User } = useAuthContext();

    const dispatch = useAppDispatch();
    const theme: Theme = useTheme();
    const { logout } = useAuthContext();

    const [content, setContent] = useState<string>('');
    const [disabled, setDisabled] = useState<boolean>(true);

    const tasks: Task[] = useAppSelector((state: RootState) => state.tasks.tasks);

    useEffect(() => {
        setDisabled(content === '');
    }, [content]);

    useEffect(() => {
        dispatch(fetchTasks())
    }, []);

    const onSubmit = () => {
        dispatch(createTask({ content, user: user._id, status: TaskStatus.OPEN }))
    }

    return (
        <RootContainer>
            <Box p={5}>
                <CustomButton onClick={() => logout()}>
                    Logout
                </CustomButton>
            </Box>
            <Grid container justifyContent="center">
                <Grid item xs={10} sm={10} md={8} lg={6}>
                    <Input
                        fullWidth
                        onChange={(e) => setContent(e.target.value)}
                        value={content}
                        placeholder='Add task'
                        inputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <AddCircleOutlineOutlined sx={{ color: theme.palette.grey[700] }} />
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton disabled={disabled} onClick={onSubmit}>
                                        <ArrowCircleUpOutlined sx={{ color: disabled ? theme.palette.grey[700] : theme.palette.primary.dark }} />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Box sx={{ marginTop: '25px', height: '450px', overflowY: 'auto' }}>
                        {tasks.map((task: Task, index: number) => (
                            <Paper elevation={3} key={index} sx={{
                                borderRadius: '10px',
                                padding: '15px',
                                marginBottom: '10px',
                                height: '50px',
                                backgroundColor: theme.palette.darkGrey,
                                ':hover': {
                                    backgroundColor: theme.palette.lightGrey,
                                },
                            }}>


                                    <Typography fontWeight={'light'}>
                                        {task.content}
                                    </Typography>

                            </Paper>
                        ))}
                    </Box>
                </Grid>
            </Grid>
        </RootContainer>
    );
};

export default Dashboard;
