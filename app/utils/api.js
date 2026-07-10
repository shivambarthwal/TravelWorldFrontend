import axios from "axios";
import { useAuthStore } from "../store/useAuthStore.js";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Create custom Axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Variables to manage refresh token state and request queueing
let isRefreshing = false;
let failedQueue = [];

// Helper to process queued requests once refresh succeeds/fails
const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// Request Interceptor: Automatically inject Access Token into headers
api.interceptors.request.use(
  (config) => {
    const { accessToken } = useAuthStore.getState();
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Intercept 401 Unauthorized errors and refresh tokens
api.interceptors.response.use(
  (response) => {
    // Simply return the response if it was successful
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Only attempt token refresh for 401 errors, and avoid retrying if already done
    if (error.response?.status === 401 && !originalRequest._retry) {

      // If the request itself was the refresh endpoint or logout, do not try to refresh
      if (originalRequest.url?.includes("/auth/refresh") || originalRequest.url?.includes("/auth/logout")) {
        useAuthStore.getState().clearAuth();
        return Promise.reject(error);
      }

      // If we are already refreshing, queue the request
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers["Authorization"] = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      // Mark request as retried
      originalRequest._retry = true;
      isRefreshing = true;

      const { refreshToken } = useAuthStore.getState();

      // If no refresh token exists, clear auth and reject
      if (!refreshToken) {
        useAuthStore.getState().clearAuth();
        return Promise.reject(error);
      }

      return new Promise((resolve, reject) => {
        // Use raw axios to prevent request interceptor intercepting refresh call
        axios
          .post(`${API_URL}/auth/refresh`, { refreshToken })
          .then(({ data }) => {
            // Backend returns data in ApiResponse format: { success: true, message: "...", data: { accessToken, refreshToken } }
            const { accessToken: newAccessToken, refreshToken: newRefreshToken } = data.data;

            // Save new credentials in store
            useAuthStore.getState().setTokens(newAccessToken, newRefreshToken);

            // Update headers of original request
            originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

            // Resolve all other queued requests
            processQueue(null, newAccessToken);

            // Replay original request
            resolve(api(originalRequest));
          })
          .catch((err) => {
            // Refresh token is invalid/expired
            processQueue(err, null);
            useAuthStore.getState().clearAuth();

            // Client-side routing fallback if appropriate
            if (typeof window !== "undefined") {
              // Redirect to login page or reload to clean state
              window.location.href = "/login";
            }
            reject(err);
          })
          .finally(() => {
            isRefreshing = false;
          });
      });
    }

    // Return any other errors directly
    return Promise.reject(error);
  }
);

export default api;
