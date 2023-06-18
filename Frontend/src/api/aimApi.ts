import { Aim } from "@/types/User/goals/goals";
import { AimProgressModel } from "@/types/models";
import { apiDelete, apiGet, apiGetProtected, apiPost } from "./api";
import routes from "./routes";

export const getUserAims = (userId: string) => apiGet(`${routes.userAim}/${userId}`);

export const createAim = (body: Partial<Aim>) => apiPost(`${routes.createAim}`, body);

export const deleteAim = (id: string) => {
  apiDelete(`${routes.aims}/DeleteAim/${id}`);
};

export const getProgress = async (token: string): Promise<AimProgressModel[]> => {
  const result = await apiGetProtected(`${routes.getProgress}`, token);
  return result.json();
};
