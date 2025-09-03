import React, {FC, useState} from "react";
import {Failure, Loading, Success} from "../result/Result.ts";
import {Button, TextField, Box, Typography} from "@mui/material";
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormHelperText from '@mui/material/FormHelperText';
import Alert from '@mui/material/Alert';

type Props = {
    viewModel: ReturnType<typeof import("../viewmodel/useLoginViewModel").useLoginViewModel>;
};

export function LoginForm({ viewModel }: Props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {login, emailError, passwordError, result} = viewModel;
    const [showPassword, setShowPassword] = useState(false);

    return (
        <Box
            display="flex"
            flexDirection="column"
            gap={2}
            width={300}
            margin="auto"
            mt={5}
        >
            <Typography
                variant="h4"
                textAlign="center"
            >
                Login
            </Typography>

            <TextField
                id="outlined-error-helper-text"
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={!!emailError}
                helperText={emailError || " "}
            />

            <FormControl
                variant="outlined"
                error={!!passwordError}
            >
                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}                              // bind state
                    onChange={(e) => setPassword(e.target.value)} // update state
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label={
                                    showPassword ? 'hide the password' : 'display the password'
                                }
                                onClick={() => setShowPassword((show) => !show)}
                                edge="end"
                            >
                                {showPassword ? <Visibility/> : <VisibilityOff/>}
                            </IconButton>
                        </InputAdornment>
                    }
                    label="Password"
                />
                {passwordError && (
                    <FormHelperText>{passwordError}</FormHelperText>
                )}
            </FormControl>


            <Button
                variant="contained"
                color="primary"
                loading={result instanceof Loading}
                onClick={() => login(email, password)}
            >
                Login
            </Button>


            {result instanceof Success && (
                <Alert variant="filled" severity="success" sx={{mt: 2}}>
                    {result?.data}
                </Alert>
            )}


            {result instanceof Failure && (
                <Alert variant="filled" severity="error" sx={{mt: 2}}>
                    {result?.exception.message}
                </Alert>
            )}

        </Box>
    );
}

