import React from 'react';
import { Box, Theme, useTheme } from '@mui/material';
import { CreateTask, Task } from '../interfaces';
import { useAppDispatch } from '../redux/hooks';
import { deleteTask, updateTask } from '../redux/tasks.slice';
import { TaskCard } from './TaskCard';




interface TaskListProps {
    tasks: Task[];
}

export const TaskList: React.FC<TaskListProps> = ({ tasks }) => {

    const theme: Theme = useTheme();
    const dispatch = useAppDispatch()

    const handleUpdateTask = (id: string, task: Partial<CreateTask>) => {
        dispatch(updateTask(id, task));
    };

    const handleDeleteTask = (id: string) => {
        dispatch(deleteTask(id));
    };

    return (
        <Box sx={{ marginTop: 3, height: '450px', overflowY: 'auto' }}>
            {tasks.map((task: Task, index: number) => (
                <TaskCard
                    key={index}
                    task={task}
                    handleUpdateTask={handleUpdateTask}
                    handleDeleteTask={handleDeleteTask}
                />
            ))}
        </Box>
    )
}