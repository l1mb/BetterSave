// const signIn = (body: ) => apiPost<signInDto>(routes.signInRoute, body);

import { AddCategoryRequest } from "@/types/models";
import { apiGet, apiPost } from "../api";
import routes from "../routes";

// const signUp = (body: signInDto) => apiPost<signInDto>(routes.signUpRoute, body);

// const getInfo = (token: string) => apiGetProtected(routes.getInfo, token);

function getCategories(userId: string): Promise<Response> {
  const result = apiGet(`${routes.userCategories}/${userId}`);
  return result;
}

function createCategory(param: AddCategoryRequest): Promise<Response> {
  return apiPost(`${routes.category}/AddCategory`, param);
}

export default { getCategories, createCategory };
