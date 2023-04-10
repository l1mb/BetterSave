import { createAsyncThunk } from "@reduxjs/toolkit";
import authApi from "@/api/auth/authApi";
import useJwtToken from "../../../hooks/useJwtToken";
import User from "../../../types/User/user";

type ThunkParam = {
  onTokenInvalid: () => void;
};

const getUserInfoThunk = createAsyncThunk("user/info", async (params: ThunkParam): Promise<User | null> => {
  const { getToken } = useJwtToken();
  const token = getToken();

  if (token == null) {
    params.onTokenInvalid();
  }
  const response = await authApi.getInfo(token as string);
  const result = await response.json();

  if (response.status !== 200) {
    params.onTokenInvalid();
    return null;
  }

  return result as User;
});

export default getUserInfoThunk;
