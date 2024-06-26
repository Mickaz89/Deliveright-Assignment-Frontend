import React, { useState, useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteOutlineOutlined from '@mui/icons-material/DeleteOutlineOutlined';
import { StyledCheckbox, StyledIconButton, StyledPaper, StyledStandardTextField } from '../styles';
import { TaskStatus, Task, CreateTask } from '../interfaces';

interface TaskCardProps {
    task: Task;
    handleUpdateTask: (id: string, task: Partial<CreateTask>) => void;
    handleDeleteTask: (id: string) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, handleUpdateTask, handleDeleteTask }) => {

    const [content, setContent] = useState<string>(task.content);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setContent(task.content);
    }, [task]);

    const onSubmit = (event: React.FormEvent<HTMLFormElement> | React.KeyboardEvent) => {
        event.preventDefault();
        handleUpdateTask(task._id, { content });
        if (inputRef.current) {
            inputRef.current.blur();
        }
    };

    return (
        <StyledPaper task={task} elevation={3}>
            <Box display="flex" flexDirection="row" alignItems="center" justifyContent="space-between">
                <Box alignItems="center" display="flex" flexDirection="row" width={"100%"}>
                    <StyledCheckbox
                        checked={task.status === TaskStatus.CLOSED}
                        onChange={() => handleUpdateTask(task._id, { status: task.status === TaskStatus.OPEN ? TaskStatus.CLOSED : TaskStatus.OPEN })}
                        icon={<RadioButtonUncheckedIcon />}
                        checkedIcon={<CheckCircleIcon />}
                    />

                        <StyledStandardTextField
                            disabled={task.status === TaskStatus.CLOSED}
                            variant='standard'
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            inputRef={inputRef}
                            fullWidth
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  e.preventDefault();
                                  onSubmit(e);
                                }
                              }}
                        />

                </Box>
                <Box>
                    <StyledIconButton onClick={() => handleDeleteTask(task._id)}>
                        <DeleteOutlineOutlined />
                    </StyledIconButton>
                </Box>
            </Box>
        </StyledPaper>
    );
};