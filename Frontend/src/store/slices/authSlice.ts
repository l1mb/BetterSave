/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import User from "../../types/User/user";

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
  authStatus: "authenticated",
};

const authSlice = createSlice({
  name: "auth",
  initialState: initState,
  reducers: {
    login(state, action: PayloadAction<User>) {
      state.user = action.payload;
      state.authStatus = "authenticated";
    },
    logout(state) {
      state.user = initState.user;
      state.authStatus = "notauthenticated";
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
