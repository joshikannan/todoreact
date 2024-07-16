import React, { useState } from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Loader from "../components/loader";
import { enqueueSnackbar } from "notistack";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../reducers/loginSlice";
import { userdata } from "../reducers/userSlice";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  Stack,
  InputAdornment,
  IconButton,
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  Container,
} from "@mui/material";

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const userData = { email, password };
  const [loader, setLoader] = useState(false);

  const handleSubmit = async (event) => {
    setLoader(true);
    event.preventDefault();
    try {
      const response = await axios.post(
        `https://nodeusertodo-2.onrender.com/users/login`,
        userData
      );
      console.log("handleSubmit", response.data);
      const user = response.data.user;

      if (user) {
        localStorage.setItem("username", user.name);
        localStorage.setItem("email", user.email);
        localStorage.setItem("userid", user._id);

        if (response.status === 200) {
          enqueueSnackbar("Login Successfully", {
            variant: "success",
            anchorOrigin: { vertical: "top", horizontal: "right" },
            autoHideDuration: 1000,
          });
          setTimeout(() => {
            console.log("dispatch user", {
              name: user.name,
              email: user.email,
            });
            dispatch(
              userdata({
                name: user.name,
                email: user.email,
              })
            );
            dispatch(login());
            setLoader(false);
            navigate("/");
          }, 300);
        } else {
          enqueueSnackbar(response.data.message, {
            variant: "error",
            anchorOrigin: { vertical: "top", horizontal: "right" },
            autoHideDuration: 1000,
          });
          setLoader(false);
        }
      } else {
        enqueueSnackbar("User data not found", {
          variant: "warning",
          anchorOrigin: { vertical: "top", horizontal: "right" },
          autoHideDuration: 1000,
        });
        setLoader(false);
      }
    } catch (error) {
      console.log("handleSubmit error", error);
      const errorMessage =
        error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : "Login failed. Please try again.";

      enqueueSnackbar(errorMessage, {
        variant: "error",
        anchorOrigin: { vertical: "top", horizontal: "right" },
        autoHideDuration: 1000,
      });
      setLoader(false);
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <>
      {loader && <Loader />}
      <Stack
        sx={{
          width: "100%",
          height: "90vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Container maxWidth="xs" sx={{}}>
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              bgcolor: "background.paper",
              padding: 3,
              borderRadius: 2,
              boxShadow: 3,
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              //   noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Grid
                container
                fullWidth
                justifyContent="center"
                sx={{ width: "100%" }}
              >
                <Grid item fullWidth sx={{ textAlign: "right", width: "100%" }}>
                  <Link href="/forgetpassword" variant="body2">
                    {"Forget Password ?"}
                  </Link>
                </Grid>
              </Grid>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container justifyContent="center">
                <Grid item>
                  <Link href="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </Stack>
    </>
  );
};

export default SignIn;
