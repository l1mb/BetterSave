/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import User from "../../types/User/user";
import loginThunk from "../thunks/auth/authThunks";

export type AuthState = {
  user: User;
  authStatus: "notauthenticated" | "authenticated";
};

const initState: AuthState = {
  user: {
    email: "",
    firstName: "",
    lastName: "",
  },
  authStatus: "notauthenticated",
};

const authSlice = createSlice({
  name: "auth",
  initialState: initState,
  reducers: {
    logout(state) {
      state.user = initState.user;
      state.authStatus = "notauthenticated";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginThunk.fulfilled, (state, action) => {
      if (action.payload !== null) {
        state.user = action.payload;
        state.authStatus = "authenticated";
      }
    });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
