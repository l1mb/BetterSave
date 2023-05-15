import { createAsyncThunk } from "@reduxjs/toolkit";
import authApi from "@/api/auth/authApi";
import { updateUser } from "@/api/userApi";
import { StatusCodes } from "@/api/codes";
import { toast } from "react-toastify";
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

export const updateUserProfileThunk = createAsyncThunk(
  "user/updateUser",
  async (params: ThunkParam): Promise<User | null> => {
    const { getToken } = useJwtToken();
    const token = getToken();
    if (token == null) {
      params.setError("Unable to authorize");
    }
    let response = new Response();
    if (token !== null && params.value) {
      response = await updateUser(token, {
        email: params?.value?.email,
        firstName: params?.value?.firstName,
        lastName: params?.value?.lastName,
        birthday: params?.value?.birthday,
      });
    }

    const result = await response.json();

    if (response.status !== StatusCodes.Ok) {
      params.setError(result.errorMessage);

      return null;
    }

    toast.success("Сохранено");

    return result;
  }
);

export default getUserInfoThunk;
