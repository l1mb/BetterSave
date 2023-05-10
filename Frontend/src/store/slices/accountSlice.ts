/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import { AccountModel } from "@/types/models";
import getAccountsThunk, {
  createAccountThunk,
  deleteAccountThunk,
  updateAccountThunk,
} from "../thunks/account/accountThunk";

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
    builder.addCase(createAccountThunk.fulfilled, (state, action) => {
      if (action.payload != null) {
        return [...state, action.payload];
      }
      return state;
    });
    builder.addCase(deleteAccountThunk.fulfilled, (state, action) => {
      if (action.payload != null) {
        return state.filter((x) => x.id !== action.payload);
      }
      return state;
    });
    builder.addCase(updateAccountThunk.fulfilled, (state, action) => {
      if (action.payload != null) {
        const index = state.findIndex((x) => x.id === action.payload.id);
        if (index > -1) {
          state[index] = action.payload;
        }
        return state;
      }
      return state;
    });
  },
});

export default accountSlice.reducer;
