// const signIn = (body: ) => apiPost<signInDto>(routes.signInRoute, body);

import { apiGet } from "../api";
import routes from "../routes";

// const signUp = (body: signInDto) => apiPost<signInDto>(routes.signUpRoute, body);

// const getInfo = (token: string) => apiGetProtected(routes.getInfo, token);

function getCategories(userId: string): Promise<Response> {
  const result = apiGet(`${routes.userCategories}/${userId}`);
  return result;
}

export default { getCategories };
