import { useState, useCallback } from "react";
import {
  getQuizzes,
  getQuizById,
  createQuiz,
  updateQuiz,
  deleteQuiz,
  getHighScore,
} from "../api/quizApi";

export function useQuizzes() {
  const [quizzes, setQuizzes] = useState([]);
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchQuizzes = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await getQuizzes();
      setQuizzes(data);
    } catch (err) {
      setError(err.message || "Failed to fetch quizzes");
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchQuizById = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await getQuizById(id);
      setQuiz(data);
    } catch (err) {
      setError(err.message || "Failed to fetch quiz");
    } finally {
      setLoading(false);
    }
  }, []);

  const createNewQuiz = useCallback(async (quizData) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await createQuiz(quizData);
      setQuiz(data);
      return data;
    } catch (err) {
      setError(err.message || "Failed to create quiz");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateExistingQuiz = useCallback(async (id, quizData) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await updateQuiz(id, quizData);
      setQuiz(data);
      return data;
    } catch (err) {
      setError(err.message || "Failed to update quiz");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteExistingQuiz = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      await deleteQuiz(id);
      setQuiz(null);
    } catch (err) {
      setError(err.message || "Failed to delete quiz");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchHighScore = useCallback(async (quizId) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await getHighScore(quizId);
      return data;
    } catch (err) {
      setError(err.message || "Failed to fetch high score");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    quizzes,
    quiz,
    loading,
    error,
    fetchQuizzes,
    fetchQuizById,
    createNewQuiz,
    updateExistingQuiz,
    deleteExistingQuiz,
    fetchHighScore,
  };
}
