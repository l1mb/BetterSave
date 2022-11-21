/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import { Card } from "../../types/User/Cards/card";
import getCardsThunk from "../thunks/cardThunk";

export type CardState = Card;

const initState: CardState[] = [];

const authSlice = createSlice({
  name: "auth",
  initialState: initState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCardsThunk.fulfilled, (state, action) => {
      if (action.payload !== null) {
        state = [...state, ...action.payload];
      }
    });
  },
});

export default authSlice.reducer;
