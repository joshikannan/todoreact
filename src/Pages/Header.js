import React from "react";
import { Stack, Button } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../reducers/loginSlice";

const Header = () => {
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
          bgcolor: "lightblue",
          px: 5,
        }}
      >
        <Button variant="outlined">{`${user.name || "User Name"}`}</Button>
        <Stack direction={"row"} spacing={3}>
          {/* Use onClick to call the navigate function directly */}
          {location.pathname !== "/" && (
            <Button
              variant="outlined"
              onClick={() => {
                navigate("/");
              }}
            >
              Home
            </Button>
          )}
          {location.pathname !== "/todo" && (
            <Button variant="outlined" onClick={() => navigate("/todo")}>
              Todo
            </Button>
          )}
          {location.pathname !== "/login" && (
            <Button
              variant="outlined"
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
