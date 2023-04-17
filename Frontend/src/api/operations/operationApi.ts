import { CreateOperationModel, OperationModel } from "@/types/models";
import { apiGet, apiPost } from "../api";
import routes from "../routes";

const fetchAllUserOperations = async (uid: string): Promise<OperationModel[]> => {
  const result = await apiGet(`${routes.getOperations}/${uid}`);
  return result.json();
};

export const createOperation = async (body: CreateOperationModel): Promise<OperationModel> => {
  const result = await apiPost(`${routes.createOperation}`, body);
  return result.json();
};

export default fetchAllUserOperations;
