import React from 'react';
import { TextField, useTheme, TextFieldProps } from '@mui/material';
import { makeStyles, createStyles } from '@mui/styles';

import { Theme } from '@mui/material';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
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
    },
  })
);


interface InputProps {
    label?: string;
    inputProps?: TextFieldProps['InputProps'];
    sx?: React.CSSProperties;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    value: string,
    placeholder?: string
    fullWidth?: boolean
}

export const Input: React.FC<InputProps> = ({ label, sx, onChange, value, placeholder, inputProps, fullWidth }) => {

    const classes = useStyles();
    const theme: Theme = useTheme();

    return (
        <TextField
            fullWidth={fullWidth}
            onChange={onChange}
            value={value}
            sx={sx}
            className={classes.root}
            label={label}
            placeholder={placeholder}
            InputProps={inputProps}
        />
    );
}

