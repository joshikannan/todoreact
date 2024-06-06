import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user", // Name of the slice
  initialState: {
    name: "kannan",
    email: "",
  },
  reducers: {
    // Define the userdata action

    userdata: (state, action) => {
      console.log("action", action);
      state.name = action.payload.name;
      state.email = action.payload.email;
    },
  },
});

export const { userdata } = userSlice.actions;
export default userSlice.reducer;
