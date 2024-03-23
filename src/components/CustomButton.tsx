import React from 'react';
import Button from '@mui/material/Button';

interface CustomButtonProps {
  children: React.ReactNode;
  sx?: React.CSSProperties;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const CustomButton: React.FC<CustomButtonProps> = ({ children, ...props }) => {

  return (
    <Button
      {...props}
      sx={props.sx}
    >
      {children}
    </Button>
  );
};

export default CustomButton;