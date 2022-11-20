import { createAsyncThunk } from "@reduxjs/toolkit";
import authApi from "../../../pages/api/auth/authApi";
import signInDto from "../../../types/auth/signInDto";
import User from "../../../types/User/user";

type ThunkParam<T> = {
  body: T;
  setError: (err: string) => void;
};

const loginThunk = createAsyncThunk(
  "prikol",
  // Declare the type your function argument here:
  async (params: ThunkParam<signInDto>) => {
    const response = await authApi.signIn(params.body);
    // Inferred return type: Promise<MyData>
    const result = await response.json();
    if (response.status !== 200) {
      params.setError(result.errorMessage);
    }
    return result as User;
  }
);

export default loginThunk;
