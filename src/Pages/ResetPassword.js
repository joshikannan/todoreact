import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Stack, InputAdornment, IconButton } from "@mui/material";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import Loader from "../components/loader";
import { enqueueSnackbar } from "notistack";
import VerificationInput from "react-verification-input";
import Countdown from "react-countdown";
import { Password } from "@mui/icons-material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const ResetPassword = () => {
  const location = useLocation();
  const email = location.state?.email || "";

  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (!email) {
      navigate("/forgetpassword");
    }
  }, []);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const resetPassword = async (e) => {
    setLoader(true);
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:5000/users/resetpassword`,
        { email, password }
      );
      console.log("resetPassword", response);
      if (response.status == 200) {
        enqueueSnackbar(response.data.message, {
          variant: "success",
          anchorOrigin: { vertical: "top", horizontal: "right" },
          autoHideDuration: 4000,
        });
        setLoader(false);
        navigate("/signin");
      }
    } catch (err) {
      setLoader(false);
      enqueueSnackbar(err.response.data.message || err.message, {
        variant: "error",
        anchorOrigin: { vertical: "top", horizontal: "right" },
        autoHideDuration: 4000,
      });
      navigate("/forgetpassword");
      return { status: 500, Message: err.message };
    }
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
              Reset Password
            </Typography>
            <Typography color={"primary"} component="h1" variant="h6">
              Enter Your New Password
            </Typography>
            <Box
              component="form"
              onSubmit={resetPassword}
              noValidate
              sx={{ mt: 1 }}
            >
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

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Continue
              </Button>
              <Grid container justifyContent="center">
                <Grid item>
                  <Link href="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/signin" variant="body2">
                    {"Already having account ? Sign In"}
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

export default ResetPassword;
