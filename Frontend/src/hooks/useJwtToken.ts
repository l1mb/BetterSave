import jwtDecode from "jwt-decode";

interface JWT {
  name: string;
  exp: number;
  UserId: string;
  // whatever else is in the JWT.
}

const useJwtToken = () => {
  const getToken = () => localStorage.getItem("token");
  const setToken = (token: string) => {
    localStorage.setItem("token", token);
  };

  const decodeToken = (): JWT | null => {
    const token = localStorage.getItem("token");
    if (token) {
      return jwtDecode<JWT>(token) as JWT;
    }
    return null;
  };

  const getUserId = (): string => decodeToken()?.UserId || "";

  return { getToken, setToken, decodeToken, getUserId };
};

export default useJwtToken;
