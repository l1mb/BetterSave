import { Aim } from "../../components/goals/addGoal";
import { apiDelete, apiGetProtected, apiPost } from "./api";
import routes from "./routes";

export const getUserAims = (token: string) =>
  apiGetProtected(`${routes.userAim}`, token);

export const createAim = (body: Partial<Aim>) =>
  apiPost(`${routes.aims}`, body);

export const deleteAim = (id: string) => {
  apiDelete(`${routes.aims}/${id}`);
};
