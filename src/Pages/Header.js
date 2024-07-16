import React from "react";
import { Stack, Button, Chip } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../reducers/loginSlice";
import { useTheme } from "@mui/material/styles";

const Header = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  console.log("user", user);

  return (
    <Stack
      width={"100%"}
      height={"auto"}
      sx={{ position: "fixed", top: 0, zIndex: 10 }}
    >
      <Stack
        direction={"row"}
        justifyContent="space-between"
        alignItems={"center"}
        spacing={3}
        sx={{
          minHeight: "70px",
          bgcolor: theme.palette.primary.main,
          px: 5,
        }}
      >
        <Chip
          label={`${user.name || "User Name"}`}
          color="primary"
          variant="outlined"
          sx={{ background: "white" }}
        />

        <Stack direction={"row"} spacing={3}>
          {/* Use onClick to call the navigate function directly */}
          {location.pathname !== "/" && (
            <Button
              variant="contained"
              color="secondary"
              sx={{ color: theme.palette.primary.main }}
              onClick={() => {
                navigate("/");
              }}
            >
              Home
            </Button>
          )}
          {location.pathname !== "/todo" && (
            <Button
              variant="contained"
              color="secondary"
              sx={{ color: theme.palette.primary.main }}
              onClick={() => navigate("/todo")}
            >
              Todo
            </Button>
          )}
          {location.pathname !== "/login" && (
            <Button
              variant="contained"
              color="secondary"
              sx={{ color: theme.palette.primary.main }}
              onClick={() => {
                localStorage.removeItem("username");
                localStorage.removeItem("email");
                localStorage.removeItem("userid");
                dispatch(logout());
              }}
            >
              Logout
            </Button>
          )}{" "}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Header;
