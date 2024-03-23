import React from "react";
import { Box, Grid, Theme, Typography, useTheme } from "@mui/material";
import CircleIcon from '@mui/icons-material/Circle';

interface GreetingProps {
    user: string
}

export const Greeting: React.FC<GreetingProps> = ({ user }) => {

    const theme: Theme = useTheme();

    return (
        <>
            <Box display={"flex"} flexDirection={"row"} alignItems={"self-end"}>
                <Typography variant="h4" color="white">
                    Hello { user }
                </Typography>
                <Typography color="white">
                    <CircleIcon sx={{ color: theme.palette.primary.dark, fontSize: "10px" }} />
                </Typography>
            </Box>
            <Typography variant="h5" color={theme.palette.grey[600]} sx={{ marginBottom: 3 }}>
                Run your day or your day will run you
            </Typography>
        </>
    )
};