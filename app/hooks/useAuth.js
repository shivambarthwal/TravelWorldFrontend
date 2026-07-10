import { useState, useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore.js";

/**
 * Hydration-safe custom hook to consume the Zustand auth store in Next.js Client Components.
 * Ensures that client-rendered markup depending on persisted localStorage authentication state
 * matches the server-side output during initial page load.
 */
export const useAuth = () => {
  const store = useAuthStore();
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // Runs after component mounts on client side, meaning hydration has completed.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsHydrated(true);
  }, []);

  return {
    // If not hydrated, return initial server defaults. Otherwise, return persisted store state.
    user: isHydrated ? store.user : null,
    accessToken: isHydrated ? store.accessToken : null,
    refreshToken: isHydrated ? store.refreshToken : null,
    isAuthenticated: isHydrated ? store.isAuthenticated : false,
    
    // Store actions do not cause hydration mismatch and are safe to invoke directly
    setAuth: store.setAuth,
    setTokens: store.setTokens,
    clearAuth: store.clearAuth,
    updateUser: store.updateUser,
    
    isHydrated,
  };
};
