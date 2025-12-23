import { useState } from "react";
import { register, login } from "../api/authApi";
import { useAuth } from "../context/useAuth";

export function useAuthApi() {
  const { login: setAuthToken } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const registerUser = async (username, password) => {
    setLoading(true);
    setError(null);
    try {
      await register(username, password);
      return true;
    } catch (err) {
  setError("Registration failed. Please try again.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const loginUser = async (username, password) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await login(username, password);
      setAuthToken(data.token);
      return true;
    } catch (err) {
  setError("Login failed. Please check your credentials and try again.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { registerUser, loginUser, loading, error };
}
