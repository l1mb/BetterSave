import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiResponse, Category, ErrorResponse } from "@/types/models";
import categoryApi from "@/api/category/categoryApi";
import { toast } from "react-toastify";
import useJwtToken from "../../../hooks/useJwtToken";

const getCategories = createAsyncThunk("category/getAll", async (): Promise<Category[] | null> => {
  const { decodeToken } = useJwtToken();

  const token = decodeToken();

  if (!token) {
    return null;
  }

  const response = await categoryApi.getCategories(token.UserId);
  const result: ApiResponse<Category[]> = await response.json();

  if (response.status !== 200) {
    toast.error((result as ErrorResponse)?.errorMessage);
    return null;
  }

  return result as Category[];
});

export default getCategories;
