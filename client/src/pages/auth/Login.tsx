import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";

import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CircularProgress from "@mui/material/CircularProgress";

import { createTheme, ThemeProvider } from "@mui/material/styles";

import axios from "../../services/api";
import request from "../../services/requests";

import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../data";

import { useStateContext } from "../../contexts/ContextProvider";

const defaultTheme = createTheme();

function LogIn() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const { updateAuthStatus } = useStateContext();

  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(request.login, { username, password });
      localStorage.setItem(ACCESS_TOKEN, response.data.access);
      localStorage.setItem(REFRESH_TOKEN, response.data.refresh);
      updateAuthStatus(true);
      navigate("/");
    } catch (error) {
      console.error("Login Failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-auth_back">
      <div className="bg-auth_top rounded-lg shadow-lg px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md w-full">
        <h1 className="text-4xl font-bold">Welcome to StockRev</h1>
        <ThemeProvider theme={defaultTheme}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box className="flex flex-col items-center">
              {isLoading ? (
                <CircularProgress />
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    autoComplete="username"
                    autoFocus
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="bg-blue-600 py-3 text-white rounded-lg w-full mt-6 hover:bg-blue-700 transition"
                  >
                    Login
                  </button>
                  <p className="text-neutral-500 mt-4">
                    Don't have an account?
                    <a
                      href="/signin"
                      className="text-blue-400 font-semibold text-lg ml-1 hover:underline cursor-pointer"
                    >
                      Register
                    </a>
                  </p>
                </form>
              )}
            </Box>
          </Container>
        </ThemeProvider>
      </div>
    </div>
  );
}

export default LogIn;
