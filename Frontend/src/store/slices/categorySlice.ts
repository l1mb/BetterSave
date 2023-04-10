/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import { Category } from "@/types/models";
import getCategories from "../thunks/category/categoryThunk";

const initState: Category[] = [];

const categorySlice = createSlice({
  name: "cards/get",
  initialState: initState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCategories.fulfilled, (state, action) => action.payload || state);
  },
});

export default categorySlice.reducer;
