import { create } from "zustand";

type AuthState = {
  accessToken: string | null;
  refreshToken: string | null;
  login: (
    username: string,
    password: string
  ) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  refreshAuthToken: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  refreshToken: null,

  // Função de login(dummy neste caso)
  login: async (username, password) => {
    if (username === "admin" && password === "admin1234") {
      set({
        accessToken: "dummy-access-token",
        refreshToken: "dummy-refresh-token",
      });
      return { success: true };
    }

    return { success: false, message: "Credenciais inválidas" };
  },

  logout: () => {
    set({ accessToken: null, refreshToken: null });
  },

  refreshAuthToken: () => {
    set({ accessToken: "refreshed-access-token" });
  },
}));
