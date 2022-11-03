import signInDto from "../../../types/auth/signInDto";
import { apiPost } from "../api";
import routes from "../routes";

const signIn = (body: signInDto) => {
  console.log(routes.signInRoute);
  console.log(body);
  return apiPost<signInDto>(routes.signInRoute, body);
};

const signUp = (body: signInDto) =>
  apiPost<signInDto>(routes.signUpRoute, body);

export default { signIn, signUp };
