import React from 'react';
import { Input } from './Input';
import { IconButton, InputAdornment, Theme, useTheme } from '@mui/material';
import { AddCircleOutlineOutlined, ArrowCircleUpOutlined } from '@mui/icons-material';

interface TaskInputProps {
    onSubmit: (event: React.FormEvent<HTMLFormElement> | React.KeyboardEvent) => void;
    inputRef: React.Ref<any>;
    setContent: (content: string) => void;
    content: string;
    disabled: boolean;
}

export const TaskInput: React.FC<TaskInputProps> = ({ onSubmit, inputRef, setContent, content, disabled }) => {
    const theme: Theme = useTheme();
    return (
        <Input
            inputRef={inputRef}
            fullWidth
            onChange={(e) => setContent(e.target.value)}
            value={content}
            placeholder='Add task'
            onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  onSubmit(e);
                }
              }}
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
    )
};