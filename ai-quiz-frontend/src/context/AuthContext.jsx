
import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // On mount, check for JWT in localStorage
    const token = localStorage.getItem("token");
    if (token) {
      // Optionally decode token for user info
      setUser({ token });
    }
    setLoading(false);
  }, []);

  // Accept token directly after successful login API call
  const login = (token) => {
    setError(null);
    if (!token) {
      setError("No token received");
      setUser(null);
      return;
    }
    localStorage.setItem("token", token);
    setUser({ token });
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setError(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, error, loading }}>
      {children}
    </AuthContext.Provider>
  );
};


