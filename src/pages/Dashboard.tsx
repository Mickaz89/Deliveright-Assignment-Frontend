import React, { useEffect, useState } from 'react';
import { Box, Grid } from '@mui/material';
import { useAuthContext } from '../auth/useAuthContext';
import CustomButton from '../components/CustomButton';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { createTask, fetchTasks } from '../redux/tasks.slice';
import { TaskStatus } from '../interfaces'
import { RootState } from '../redux/store';
import { Greeting } from '../components/Greeting';
import { TaskInput } from '../components/TaskInput';
import { TaskList } from '../components/TaskList';
import { RootContainer } from '../styles';

export const Dashboard = () => {
    const { user, logout } = useAuthContext();
    const dispatch = useAppDispatch();
    const tasks = useAppSelector((state: RootState) => state.tasks.tasks);

    const [content, setContent] = useState<string>('');
    const isDisabled = content === '';

    useEffect(() => {
        dispatch(fetchTasks())
    }, [dispatch]);

    const inputRef = React.useRef<HTMLInputElement>(null);

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch(createTask({ content, user: user._id, status: TaskStatus.OPEN }))
        setContent('');
        inputRef.current?.blur();
    }

    return (
        <RootContainer>
            <Box>
                <CustomButton sx={{padding: 2}} onClick={logout}>
                    Logout
                </CustomButton>
                <Grid container justifyContent="center">
                    <Grid item xs={10} sm={10} md={8} lg={6}>
                        <Greeting user={user} />
                    </Grid>
                </Grid>
            </Box>

            <Grid container justifyContent="center">
                <Grid item xs={10} sm={10} md={8} lg={6}>
                    <TaskInput onSubmit={onSubmit} inputRef={inputRef} setContent={setContent} content={content} disabled={isDisabled} />
                    <TaskList tasks={tasks} />
                </Grid>
            </Grid>
        </RootContainer>
    );
};

export default Dashboard;