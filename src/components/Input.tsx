import React from 'react';
import { TextFieldProps } from '@mui/material';
import { StyledInput } from '../styles';

interface InputProps {
    type?: string,
    label?: string;
    inputProps?: TextFieldProps['InputProps'];
    sx?: React.CSSProperties;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    value: string,
    placeholder?: string
    fullWidth?: boolean,
    inputRef?: React.Ref<any>
}

export const Input: React.FC<InputProps> = ({ type, label, sx, onChange, value, placeholder, inputProps, fullWidth, inputRef }) => {

    return (
        <StyledInput
            type={type}
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

