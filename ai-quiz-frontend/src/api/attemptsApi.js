import api from "./axios";

export const createAttempt = async (attempt) => api.post("/attempts", attempt);

export const getAttempts = async () => api.get("/attempts");
