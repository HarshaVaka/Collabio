let accessToken: string | null = null;
let expiresAt: Date | null = null;
let refreshPromise: Promise<{token: string, accessTokenExpiresAt: Date}> | null = null;

export const getAccessToken = () => accessToken;

export const setAccessToken = (token: string, expires: Date) => {
  accessToken = token;
  expiresAt = expires;
};

export const isTokenExpired = () => {
  if (!accessToken || !expiresAt) return true;
  console.log(new Date(), new Date(expiresAt))
  return Date.now() >= new Date(expiresAt).getTime();
};

export const clearToken = () => {
  accessToken = null;
  expiresAt = null;
  refreshPromise = null;
};

export const setRefreshPromise = (promise: Promise<{token: string, accessTokenExpiresAt: Date}> | null) => {
  refreshPromise = promise;
};

export const getRefreshPromise = () => refreshPromise;
