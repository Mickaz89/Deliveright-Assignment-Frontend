import { Checkbox, TextField, IconButton, Paper } from "@mui/material";
import { styled } from "@mui/system";
import { TaskStatus, Task } from "./interfaces";

interface StyledPaperProps {
    task: Task;
  }

export const StyledInput = styled(TextField)(({ theme }) => ({
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: theme.palette.grey[700],
      },
      '&:hover fieldset': {
        borderColor: theme.palette.primary.dark,
      },
      '&.Mui-focused fieldset': {
        borderColor: theme.palette.primary.dark,
      },
    },
    '& .MuiInputLabel-root': {
      color: theme.palette.primary.light,
    },
    '& .MuiInputBase-input': {
      color: theme.palette.grey[400],
      '&::placeholder': {
        color: theme.palette.grey[300],
      },
    },
  }));

export const RootContainer = styled('div')(({ theme }) => ({
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

export const StyledCheckbox = styled(Checkbox)(({ theme }) => ({
    '&:hover': {
        color: theme.palette.primary.dark,
      },
      '&.Mui-checked': {
        color: theme.palette.primary.dark,
        '&:hover': {
          color: theme.palette.primary.dark, // color when checked and hovering
        },
      },
}));

export const StyledIconButton = styled(IconButton)(({ theme }) => ({
    '&:hover': {
        color: theme.palette.primary.dark, // color when hovering
      },
}));

export const StyledPaper = styled(Paper)<StyledPaperProps>(({ theme, task }) => ({
    opacity: task.status === TaskStatus.CLOSED ? 0.3 : 1,
    borderRadius: '10px',
    padding: '15px',
    marginBottom: '10px',
    height: '50px',
    backgroundColor: theme.palette.darkGrey,
    '&:hover': {
      backgroundColor: theme.palette.lightGrey,
    },
  }));
