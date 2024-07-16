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
import { Stack } from "@mui/material";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import Loader from "../components/loader";
import { enqueueSnackbar } from "notistack";
import VerificationInput from "react-verification-input";
import Countdown from "react-countdown";

const ResetCode = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [email, setEmail] = useState(location.state?.email || "");

  useEffect(() => {
    if (!email) {
      navigate("/forgetpassword");
    }
  }, []);

  const [resetCode, setresetCode] = useState("");
  //   const [codebox, setCodebox] = useState(true);
  const [countdownStartTime, setCountdownStartTime] = useState(
    Date.now() + 300000 // 5 min
  );

  const handleChange = (value) => {
    setresetCode(value);
  };

  const Completionist = () => {
    return <span>Time Expires, Try again</span>;
  };

  // useEffect(() => {
  //   if (!codebox) {
  //     // Perform actions when codebox is false, if needed
  //     console.log("Time expired. Reset code box is now hidden.");
  //   }
  // }, [codebox]);
  // Renderer callback with condition
  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      setresetCode("");
      enqueueSnackbar("Timeout , Retry", {
        variant: "warning",
        anchorOrigin: { vertical: "top", horizontal: "right" },
        autoHideDuration: 4000,
      });
      setTimeout(() => {
        navigate("/forgetpassword");
      }, 1000);

      return <Completionist />;
    } else {
      // Render a countdown
      return <span>{`Code expires in  ${minutes}:${seconds}`}</span>;
    }
  };

  const ResetCode = async (e) => {
    setLoader(true);
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:5000/users/resetCode`,
        { email, resetCode }
      );
      console.log("resetpassword", response);
      if (response.data.status == 410) {
        enqueueSnackbar(response.data.message, {
          variant: "warning",
          anchorOrigin: { vertical: "top", horizontal: "right" },
          autoHideDuration: 4000,
        });
        setLoader(false);
      }
      if (response.data.status == 200) {
        enqueueSnackbar(response.data.message, {
          variant: "success",
          anchorOrigin: { vertical: "top", horizontal: "right" },
          autoHideDuration: 4000,
        });
        setLoader(false);
        navigate("/resetpassword", { state: { email } });
      }
    } catch (err) {
      setLoader(false);
      console.log(err);
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
              Enter Reset Code
            </Typography>
            <Box
              component="form"
              onSubmit={ResetCode}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                disabled
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                // onChange={(e) => setEmail(e.target.value)}
              />
              {/* {codebox && ( */}
              <Stack
                spacing={2}
                sx={{
                  width: "100%",
                  alignItems: "center",
                  my: 2,
                }}
              >
                <Typography
                  color={"primary"}
                  component="h1"
                  sx={{
                    fontSize: "16px",
                    fontWeight: 800,
                  }}
                >
                  Enter 6-digit ResetCode sent to the email
                </Typography>

                <VerificationInput
                  length={6}
                  autoFocus={true}
                  value={resetCode}
                  onChange={handleChange}
                  placeholder=""
                />
                <Countdown date={countdownStartTime} renderer={renderer} />
              </Stack>
              {/* )} */}
              <Grid container justifyContent="right">
                <Grid item>
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

export default ResetCode;
