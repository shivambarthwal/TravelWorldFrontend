import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,

      // Initialize auth state with user data and tokens
      setAuth: (user, accessToken, refreshToken) =>
        set({
          user,
          accessToken,
          refreshToken,
          isAuthenticated: true,
        }),

      // Update access and refresh tokens (used during refresh)
      setTokens: (accessToken, refreshToken) =>
        set({
          accessToken,
          refreshToken,
        }),

      // Clear auth state (used during logout/expiration)
      clearAuth: () =>
        set({
          user: null,
          accessToken: null,
          refreshToken: null,
          isAuthenticated: false,
        }),

      // Update user details without affecting tokens
      updateUser: (user) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...user } : user,
        })),
    }),
    {
      name: "travel-world-auth-session", // Key in localStorage
    }
  )
);
