/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import { AccountModel } from "@/types/models";
import getAccountsThunk from "../thunks/account/accountThunk";

const initState: AccountModel[] = [];

const accountSlice = createSlice({
  name: "account",
  initialState: initState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAccountsThunk.fulfilled, (state, action) => {
      if (action.payload !== null) {
        return action.payload;
      }

      return state;
    });
  },
});

export default accountSlice.reducer;
