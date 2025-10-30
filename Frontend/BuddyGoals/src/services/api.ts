import axios, { type AxiosRequestHeaders, type InternalAxiosRequestConfig } from "axios";
import { getAccessToken, isTokenExpired, setAccessToken } from "../store/tokenStore";
import { getRefreshPromise } from "../store/tokenStore";
import { setRefreshPromise } from "../store/tokenStore";
import { AuthService } from "./AuthService";

const IGNORED_ROUTES = ["/auth/login", "/auth/register"];

export const API = axios.create({
  baseURL: "http://localhost:5050/api/",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

API.interceptors.request.use(
  async (
    config: InternalAxiosRequestConfig
  ): Promise<InternalAxiosRequestConfig> => {
    if (
      config.url?.includes("/auth/login") ||
      config.url?.includes("/auth/register") ||
      config.url?.includes("/auth/refresh-token")
    ) {
      return config;
    }

    const token = getAccessToken();
    if (!isTokenExpired() && token) {
      if (config.headers) {
        config.headers["Authorization"] = `Bearer ${token}`;
      } else {
        config.headers = { Authorization: `Bearer ${token}` } as AxiosRequestHeaders;
      }
      return config;
    }

    // Token expired or missing → refresh
    if (!getRefreshPromise()) {
      setRefreshPromise(
        AuthService.fetchNewAccessToken()
          .catch((err) => {
            throw err;
          })
          .finally(() => setRefreshPromise(null))
      );
    }

    try {
      const response = await getRefreshPromise();
      if (!response) throw new Error("No token returned from refresh");
      const { token, accessTokenExpiresAt } = response;
      setAccessToken(token, accessTokenExpiresAt)
      if (config.headers) {
        config.headers["Authorization"] = `Bearer ${token}`;
      } else {
        config.headers = { Authorization: `Bearer ${token}` } as AxiosRequestHeaders;
      }
      return config;
    } catch (err) {
      window.location.href = "/auth/login";
      throw err;
    }
  },
  (error) => Promise.reject(error)
);

API.interceptors.response.use(
  (response) => {
    console.log(response.config)
    return response
  },
  async (error) => {

    const originalRequest = error.config;
    // Ignore login/register requests
    if (IGNORED_ROUTES.includes(originalRequest.url)) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // prevent infinite loop

      try {
        // Ensure only one refresh at a time
        const refreshResult =
          await (
            getRefreshPromise() ||
            setRefreshPromise(
              AuthService.fetchNewAccessToken().finally(() =>
                setRefreshPromise(null)
              )
            )
          );

        if (!refreshResult) {
          throw new Error("Failed to refresh token");
        }

        const { token:newToken, accessTokenExpiresAt } = refreshResult;
        setAccessToken(newToken, accessTokenExpiresAt);

        // Update access token in original request
        originalRequest.headers["Authorization"] = `Bearer ${newToken}`;

        // Retry original request
        return API(originalRequest);
      } catch (refreshError) {
        window.location.href = "/auth/login"; // fallback
        return Promise.reject(refreshError);
      }
    }

    // Other 401s
    if (error.response?.status === 401) {
      window.location.href = "/auth/login";
    }

    return Promise.reject(error);
  }
);
