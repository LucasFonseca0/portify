import axios from "axios";
import { useAuthStore } from "../stores/authStores";

//Cria uma instância Axios com interceptadores de autenticação.

export const createAxiosWithAuthInterceptor = () => {
  const api = axios.create({});

  api.interceptors.request.use(
    (config) => {
      const token = useAuthStore.getState().accessToken;

      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }

      return config;
    },
    (error) => Promise.reject(error)
  );

  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const refreshAuthToken = useAuthStore.getState().refreshAuthToken;
          await refreshAuthToken();

          const newToken = useAuthStore.getState().accessToken;
          originalRequest.headers["Authorization"] = `Bearer ${newToken}`;

          return api(originalRequest);
        } catch (refreshError) {
          console.error("Erro ao atualizar o token:", refreshError);

          const logout = useAuthStore.getState().logout;
          logout();

          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    }
  );

  return api;
};
