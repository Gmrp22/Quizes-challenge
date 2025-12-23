import { useState, useCallback } from "react";
import { createAttempt, getAttempts } from "../api/attemptsApi";

export function useAttempts() {
  const [attempts, setAttempts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAttempts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await getAttempts();
      setAttempts(data);
    } catch (err) {
      setError(err.message || "Failed to fetch attempts");
    } finally {
      setLoading(false);
    }
  }, []);

  const createNewAttempt = useCallback(async (attemptData) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await createAttempt(attemptData);
      setAttempts((prev) => [...prev, data]);
      return data;
    } catch (err) {
      setError(err.message || "Failed to create attempt");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    attempts,
    loading,
    error,
    fetchAttempts,
    createNewAttempt,
  };
}
