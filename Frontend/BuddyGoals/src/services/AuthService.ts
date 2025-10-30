import type { LoginPayload, RegisterPayload } from "../types/Auth.types";
import { API } from "./api";
import { setAccessToken } from "../store/tokenStore";

export class AuthService {
  static registerUser = async (payload: RegisterPayload) => {
    const response = await API.post("/auth/register", payload);
     const { accessToken, accessTokenExpiresAt } = response.data;

    setAccessToken(accessToken, accessTokenExpiresAt);
    return accessToken;
  };
  static loginUser = async (payload: LoginPayload) => {
    const response = await API.post("/auth/login", payload, {
      withCredentials: true,
    });
    const { accessToken, accessTokenExpiresAt } = response.data;

    setAccessToken(accessToken, accessTokenExpiresAt);
    return accessToken;
  };
  static logoutUser = async (): Promise<void> => {
    await API.post("/auth/logout");
  };
  static fetchUser = async () => {
    const response = await API.get("/user/me",{
      withCredentials: true,
    });
    return response.data;
  };
  static fetchNewAccessToken = async () => {
    const response = await API.get("/auth/refresh-token", {
      withCredentials: true,
    });
    const { accessToken, accessTokenExpiresAt } = response.data;

    setAccessToken(accessToken, accessTokenExpiresAt);
    return accessToken;
  };
}