import React, { useState, useEffect } from "react";
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
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Stack } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "../components/loader";
import { enqueueSnackbar } from "notistack";
import VerificationInput from "react-verification-input";
import Countdown from "react-countdown";

const Forgetpassword = () => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [email, setEmail] = useState("");

  const forgetPassword = async (e) => {
    setLoader(true);
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:5000/users/forgetpassword`,
        { email }
      );
      console.log("forgetpassword", response);
      if (response.data.status == 200) {
        enqueueSnackbar(response.data.message, {
          variant: "success",
          anchorOrigin: { vertical: "top", horizontal: "right" },
          autoHideDuration: 4000,
        });
        navigate("/resetcode", { state: { email } });

        setLoader(false);
      }
      if (response.data.status == 404) {
        enqueueSnackbar(response.data.message, {
          variant: "warning",
          anchorOrigin: { vertical: "top", horizontal: "right" },
          autoHideDuration: 4000,
        });
        setLoader(false);
      }
    } catch (err) {
      setLoader(false);
      enqueueSnackbar(err.response.data.message || err.message, {
        variant: "error",
        anchorOrigin: { vertical: "top", horizontal: "right" },
        autoHideDuration: 4000,
      });
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
              Forget Password
            </Typography>
            <Box
              component="form"
              onSubmit={forgetPassword}
              noValidate
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

export default Forgetpassword;
