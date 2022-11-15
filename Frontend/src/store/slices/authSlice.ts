/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import User from "../../types/User/user";

type authSliceProps = {
  user: User;
  authStatus: "notauthenticated" | "authenticated";
};

const initState: authSliceProps = {
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
    login(state, action: PayloadAction<User>) {
      state.user = action.payload;
      state.authStatus = "authenticated";
    },
    logout(state, action: PayloadAction<User>) {
      state.user = action.payload;
      state.authStatus = "notauthenticated";
    },
  },
});

export default authSlice;
