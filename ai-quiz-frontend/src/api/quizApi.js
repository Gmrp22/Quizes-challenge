import api from "./axios";

export const getQuizzes = async () => api.get("/quizzes");

export const getQuizById = async (id) => api.get(`/quizzes/${id}`);

export const createQuiz = async (quiz) => api.post("/quizzes", quiz);

export const updateQuiz = async (id, quiz) => api.put(`/quizzes/${id}`, quiz);

export const deleteQuiz = async (id) => api.delete(`/quizzes/${id}`);

export const getHighScore = async (quizId) => api.get(`/quizzes/highscore/${quizId}`);
