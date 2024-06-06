import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
  name: "login", // Name of the slice
  initialState: {
    isLoggedIn: false,
  },
  reducers: {
    // Define the login action
    login: (state) => {
      state.isLoggedIn = true; // Set login status to true (logged in)
    },
    // Define the logout action
    logout: (state) => {
      state.isLoggedIn = false; // Set login status to false (logged out)
    },
  },
});

export const { login, logout } = loginSlice.actions;
export default loginSlice.reducer;
