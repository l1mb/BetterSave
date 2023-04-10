import { createAsyncThunk } from "@reduxjs/toolkit";
import authApi from "@/api/auth/authApi";
import useJwtToken from "../../../hooks/useJwtToken";
import signInDto from "../../../types/auth/signInDto";
import User from "../../../types/User/user";

type ThunkParam<T> = {
  body: T;
  setError: (err: string) => void;
};

const loginThunk = createAsyncThunk(
  "auth/login",
  // Declare the type your function argument here:
  async (params: ThunkParam<signInDto>): Promise<User | null> => {
    const response = await authApi.signIn(params.body);
    // Inferred return type: Promise<MyData>
    const result = await response.json();

    if (response.status !== 200) {
      params.setError(result.errorMessage);
      return null;
    }
    const { setToken } = useJwtToken();

    setToken(result.token);

    return result.user as User;
  }
);

export default loginThunk;
