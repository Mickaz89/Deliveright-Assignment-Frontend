import React from 'react';
import { TextField, TextFieldProps } from '@mui/material';
import { styled } from '@mui/system';

const StyledInput = styled(TextField)(({ theme }) => ({
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


interface InputProps {
    label?: string;
    inputProps?: TextFieldProps['InputProps'];
    sx?: React.CSSProperties;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    value: string,
    placeholder?: string
    fullWidth?: boolean,
    inputRef?: React.Ref<any>
}

export const Input: React.FC<InputProps> = ({ label, sx, onChange, value, placeholder, inputProps, fullWidth, inputRef }) => {

    return (
        <StyledInput
            inputRef={inputRef}
            fullWidth={fullWidth}
            onChange={onChange}
            value={value}
            sx={sx}
            label={label}
            placeholder={placeholder}
            InputProps={inputProps}
        />
    );
}

