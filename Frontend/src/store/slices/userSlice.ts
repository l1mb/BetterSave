/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import User from "@/types/User/user";
import { updateUserProfileThunk } from "../thunks/user/userThunks";

export type UserState = {
  user: User;
};

const initState: UserState = {
  user: null,
};

const userSlice = createSlice({
  name: "user/updateUser",
  initialState: initState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(updateUserProfileThunk.fulfilled, (state, action) => {
      if (action.payload) {
        state.user = action.payload;
      }
      return state;
    });
  },
});

export default userSlice.reducer;
