/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import { Card } from "../../types/User/Cards/card";
import { SpendingReportDto } from "../../types/User/Spending/spending";
import getSpendingThunk, { createSpendingThunk, deleteSpendingThunk } from "../thunks/spendingThunks";

export type CardState = Card;

const initState: SpendingReportDto[] = [];

const cardSlice = createSlice({
  name: "cards/get",
  initialState: initState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSpendingThunk.fulfilled, (state, action) => [...action.payload]);
    builder.addCase(createSpendingThunk.fulfilled, (state, action) => {
      if (action.payload) {
        return [...state, action.payload];
      }
      return state;
    });
    builder.addCase(deleteSpendingThunk.fulfilled, (state, action) => {
      const index = state.findIndex((item) => item.id === action.payload);
      state.splice(index, 1);
      return state;
    });
  },
});

export default cardSlice.reducer;
