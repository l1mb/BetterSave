import { UpdateUserProfileRequest } from "@/types/models";
import { apiPutProtected, apiGetProtected } from "./api";
import routes from "./routes";

export const getInfoAboutUser = (token: string) => apiGetProtected(`${routes.user}/GetInfoAboutUser`, token);

export const updateUser = (token: string, body: Partial<UpdateUserProfileRequest>) =>
  apiPutProtected(`${routes.user}/UpdateUser`, token, body);

export default { getInfoAboutUser, updateUser };
