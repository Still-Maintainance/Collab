import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // useEffect to handle session persistence on initial load
  useEffect(() => {
    const checkSession = async () => {
      const userEmail = localStorage.getItem("userEmail");
      if (userEmail) {
        try {
          const profileResponse = await axios.get(
            `http://localhost:5000/profile/${userEmail}`
          );
          setUser(profileResponse.data);
        } catch (error) {
          console.error("Failed to restore session:", error);
          // Clear invalid session data if the API call fails
          localStorage.removeItem("userEmail");
          setUser(null);
        }
      }
    };

    checkSession();
  }, []); // The empty dependency array ensures this runs only once on mount

  const login = async (email, password) => {
    try {
      // 1. Authenticate with your backend (or Firebase)
      //    Example: const authResponse = await axios.post('/api/auth/login', { email, password });
      //    ... (Your authentication logic here) ...

      // 2. Fetch the user's full profile from MongoDB
      const profileResponse = await axios.get(
        `http://localhost:5000/profile/${email}`
      );

      // 3. Save the email to localStorage for session persistence
      localStorage.setItem("userEmail", email);

      // 4. Set the user data in the global context
      setUser(profileResponse.data);
    } catch (error) {
      console.error("Login failed:", error);
      // Clear any potential session data and re-throw the error
      localStorage.removeItem("userEmail");
      setUser(null);
      throw error; // Re-throw to be caught by the SignIn component
    }
  };

  const logout = () => {
    localStorage.removeItem("userEmail");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};