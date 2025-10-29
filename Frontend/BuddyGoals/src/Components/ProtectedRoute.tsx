import { Navigate, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  getAccessToken,
  getRefreshPromise,
  isTokenExpired,
  setRefreshPromise
} from "@/store/tokenStore";
import { AuthService } from "@/services/AuthService";
import { GlobalLoader } from "./GlobalLoader";

export function ProtectedRoute() {
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    const validateToken = async () => {
      try {
        const token = getAccessToken();

        // Case 1: Token exists and not expired
        if (token && !isTokenExpired()) {
          setIsAuthorized(true);
          return;
        }

        // Case 2: Token missing or expired → try refreshing
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
          await getRefreshPromise();
          const newToken = getAccessToken();
          if (newToken && !isTokenExpired()) {
            setIsAuthorized(true);
          } else {
            setIsAuthorized(false);
          }
        } catch (refreshErr) {
          console.error("Refresh failed:", refreshErr);
          setIsAuthorized(false);
        }
      } catch (err) {
        console.error("Auth validation failed:", err);
        setIsAuthorized(false);
      }
    };

    validateToken();
  }, []);

  if (isAuthorized === null) return <GlobalLoader />;

  return isAuthorized ? <Outlet /> : <Navigate to="/auth/login" replace />;
}
