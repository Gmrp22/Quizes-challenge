import api from "./axios";

export const register = async (username, password) => {
  return api.post("/auth/register", { username, password });
};

export const login = async (username, password) => {
  return api.post("/auth/login", { username, password });
};
