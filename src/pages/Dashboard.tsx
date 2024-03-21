import React, { useEffect, useState, useRef } from 'react';
import { Box, Grid, IconButton, InputAdornment, Paper, Theme, useTheme, Typography, Checkbox } from '@mui/material';
import { AddCircleOutlineOutlined, ArrowCircleUpOutlined, DeleteOutlineOutlined } from '@mui/icons-material';
import CircleIcon from '@mui/icons-material/Circle';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { useAuthContext } from '../auth/useAuthContext';
import CustomButton from '../components/CustomButton';
import { Input } from '../components/Input';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { createTask, deleteTask, fetchTasks, updateTask } from '../redux/tasks.slice';
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

    const inputRef = React.useRef<HTMLInputElement>(null);

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch(createTask({ content, user: user._id, status: TaskStatus.OPEN }))
        setContent('');
        if (inputRef.current) {
            inputRef.current.blur();
          }
    }

    return (
        <RootContainer>
            <Box  width={"100%"}>
                <Box p={5}>
                    <CustomButton onClick={() => logout()}>
                        Logout
                    </CustomButton>
                </Box>
                <Grid container justifyContent="center">
                    <Grid item xs={10} sm={10} md={8} lg={6}>
                        <Box display={"flex"} flexDirection={"row"} alignItems={"self-end"}>
                            <Typography variant="h4" color="white">
                                        Hello {user.name}
                            </Typography>
                            <Typography color="white">
                                <CircleIcon sx={{color: theme.palette.primary.dark, fontSize:"10px"}} />
                            </Typography>
                        </Box>
                        <Typography variant="h5" color={theme.palette.grey[600]} sx={{marginBottom:3}}>
                            Run your day or your day will run you
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
            <Grid container justifyContent="center">
                <Grid item xs={10} sm={10} md={8} lg={6}>
                    <form onSubmit={onSubmit}>
                        <Input
                            inputRef={inputRef}
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
                                        <IconButton disabled={disabled} type="submit">
                                            <ArrowCircleUpOutlined sx={{ color: disabled ? theme.palette.grey[700] : theme.palette.primary.dark }} />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </form>
                    <Box sx={{ marginTop: 3, height: '450px', overflowY: 'auto' }}>
                        {tasks.map((task: Task, index: number) => (
                            <Paper elevation={3} key={index} sx={{
                                opacity: task.status === TaskStatus.CLOSED ? 0.3 : 1,
                                borderRadius: '10px',
                                padding: '15px',
                                marginBottom: '10px',
                                height: '50px',
                                backgroundColor: theme.palette.darkGrey,
                                ':hover': {
                                    backgroundColor: theme.palette.lightGrey,
                                },
                            }}>
                                <Box display="flex" flexDirection="row" alignItems="center" justifyContent="space-between">
                                    <Box alignItems="center" display="flex" flexDirection="row" >
                                        <Checkbox
                                            checked={task.status === TaskStatus.CLOSED}
                                            onChange={() => dispatch(updateTask(task._id, { status: task.status === TaskStatus.OPEN ? TaskStatus.CLOSED : TaskStatus.OPEN }))}
                                            icon={<RadioButtonUncheckedIcon />}
                                            checkedIcon={<CheckCircleIcon />}
                                        />
                                        <Typography sx={{ marginLeft: "10px" }} fontWeight={'light'}>
                                            {task.content}
                                        </Typography>
                                    </Box>
                                    <Box>
                                        <IconButton onClick={() => dispatch(deleteTask(task._id))}>
                                            <DeleteOutlineOutlined  />
                                        </IconButton>
                                    </Box>
                                </Box>
                            </Paper>
                        ))}
                    </Box>
                </Grid>
            </Grid>
        </RootContainer>
    );
};

export default Dashboard;
