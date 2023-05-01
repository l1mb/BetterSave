/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import User from "../../types/User/user";
import loginThunk from "../thunks/auth/authThunks";
import getUserInfoThunk from "../thunks/user/userThunks";

export type AppState = {
  user: User;
  authStatus: "notauthenticated" | "authenticated";
  isHamburgerMenuOpen: boolean;
};

const initState: AppState = {
  user: {
    email: "",
    firstName: "",
    lastName: "",
  },
  authStatus: "notauthenticated",
  isHamburgerMenuOpen: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initState,
  reducers: {
    logout(state) {
      state.user = initState.user;
      state.authStatus = "notauthenticated";
      localStorage.removeItem("token");
    },
    setHamburgerState(state) {
      state.isHamburgerMenuOpen = !state.isHamburgerMenuOpen;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginThunk.fulfilled, (state, action) => {
      if (action.payload !== null) {
        state.user = action.payload;
        state.authStatus = "authenticated";
      }
    });
    builder.addCase(getUserInfoThunk.fulfilled, (state, action) => {
      if (action.payload !== null) {
        state.user = action.payload;
        state.authStatus = "authenticated";
      }
    });
  },
});

export const { logout, setHamburgerState } = authSlice.actions;

export default authSlice.reducer;
