import { useAuthStore } from "../stores/authStores";

// Hook para acessar tokens
export const useAuthTokens = () => {
  return useAuthStore((state) => ({
    accessToken: state.accessToken,
    refreshToken: state.refreshToken,
  }));
};

export const useAuthActions = () => {
  const login = useAuthStore((state) => state.login);
  const logout = useAuthStore((state) => state.logout);
  const refreshAuthToken = useAuthStore((state) => state.refreshAuthToken);

  return { login, logout, refreshAuthToken };
};
