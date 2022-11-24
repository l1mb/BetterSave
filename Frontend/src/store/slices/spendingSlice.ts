/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import { Card } from "../../types/User/Cards/card";
import { SpendingReportDto } from "../../types/User/Spending/spending";
import getSpendingThunk from "../thunks/spendingThunks";

export type CardState = Card;

const initState: SpendingReportDto[] = [];

const cardSlice = createSlice({
  name: "cards/get",
  initialState: initState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSpendingThunk.fulfilled, (state, action) => [
      ...action.payload,
    ]);
  },
});

export default cardSlice.reducer;
