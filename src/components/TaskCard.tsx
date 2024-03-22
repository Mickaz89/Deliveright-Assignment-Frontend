import React from 'react';
import { Box, Paper, Theme, Typography, useTheme } from '@mui/material';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteOutlineOutlined from '@mui/icons-material/DeleteOutlineOutlined';
import { StyledCheckbox, StyledIconButton, StyledPaper } from '../styles';
import { TaskStatus, Task, CreateTask } from '../interfaces';

interface TaskCardProps {
  task: Task;
  handleUpdateTask: (id: string, task: Partial<CreateTask>) => void;
  handleDeleteTask: (id: string) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, handleUpdateTask, handleDeleteTask }) => {

  return (
    <StyledPaper task={task} elevation={3}>
      <Box display="flex" flexDirection="row" alignItems="center" justifyContent="space-between">
        <Box alignItems="center" display="flex" flexDirection="row" >
          <StyledCheckbox
            checked={task.status === TaskStatus.CLOSED}
            onChange={() => handleUpdateTask(task._id, { status: task.status === TaskStatus.OPEN ? TaskStatus.CLOSED : TaskStatus.OPEN })}
            icon={<RadioButtonUncheckedIcon />}
            checkedIcon={<CheckCircleIcon />}
          />
          <Typography sx={{ marginLeft: "10px" }} fontWeight={'light'}>
            {task.content}
          </Typography>
        </Box>
        <Box>
          <StyledIconButton onClick={() => handleDeleteTask(task._id)}>
            <DeleteOutlineOutlined  />
          </StyledIconButton>
        </Box>
      </Box>
    </StyledPaper>
  );
};