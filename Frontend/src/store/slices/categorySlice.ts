/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import { Category } from "@/types/models";
import { addCategory, addSubcategory, getCategories } from "../thunks/category/categoryThunk";

const initState: Category[] = [];

const categorySlice = createSlice({
  name: "cards/get",
  initialState: initState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCategories.fulfilled, (state, action) => action.payload || state);
    builder.addCase(addCategory.fulfilled, (state, action) => {
      if (!action.payload) {
        return state;
      }
      const index = state.findIndex((x) => (action.payload as Category).id === x.id);
      if (index > 0) {
        state[index] = action.payload;
      } else {
        state.push(action.payload);
      }
      return state;
    });
    builder.addCase(addSubcategory.fulfilled, (state, action) => {
      if (!action.payload) {
        return state;
      }

      const index = state.findIndex((x) => x.id === action.payload?.categoryId);
      state[index].subcategories.push(action.payload);

      return state;
    });
  },
});

export default categorySlice.reducer;
