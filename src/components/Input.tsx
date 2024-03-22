import React from 'react';
import { TextFieldProps } from '@mui/material';
import { StyledInput } from '../styles';

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

