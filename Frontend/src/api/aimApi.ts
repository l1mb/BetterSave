import { Aim } from "@/types/User/goals/goals";
import { apiDelete, apiGet, apiPost } from "./api";
import routes from "./routes";

export const getUserAims = (userId: string) => apiGet(`${routes.userAim}/${userId}`);

export const createAim = (body: Partial<Aim>) => apiPost(`${routes.aims}`, body);

export const deleteAim = (id: string) => {
  apiDelete(`${routes.aims}/${id}`);
};
