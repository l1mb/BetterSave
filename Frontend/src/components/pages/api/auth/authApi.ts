import signInDto from "../../../types/auth/signInDto";
import { apiGetProtected, apiPost } from "../api";
import routes from "../routes";

const signIn = (body: signInDto) => apiPost<signInDto>(routes.signInRoute, body);

const signUp = (body: signInDto) => apiPost<signInDto>(routes.signUpRoute, body);

const getInfo = (token: string) => apiGetProtected(routes.getInfo, token);

export default { signIn, signUp, getInfo };
