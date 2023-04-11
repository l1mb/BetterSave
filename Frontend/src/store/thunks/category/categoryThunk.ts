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

const addCategory = createAsyncThunk(
  "category/createCategory",
  async (param: { name: string; icon: string; color: string }): Promise<Category | null> => {
    const { decodeToken } = useJwtToken();

    const token = decodeToken();

    const response = await categoryApi.createCategory({ ...param, userId: token?.UserId || "" });
    const result: ApiResponse<Category> = await response.json();

    if (response.status !== 201) {
      toast.error((result as ErrorResponse)?.errorMessage);
      return null;
    }
    toast.success(`Категория "${param.name}" была добавлена успешно`);
    return result as Category;
  }
);

export { getCategories, addCategory };
