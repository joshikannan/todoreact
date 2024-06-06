import { Stack, Typography } from "@mui/material";
import React from "react";

const Home = () => {
  return (
    <div>
      <Stack sx={{ height: "100%", pt: 5, mt: "70px" }} alignItems={"center"}>
        <Typography variant="h2">Welcome to Home Page</Typography>
      </Stack>
    </div>
  );
};

export default Home;
