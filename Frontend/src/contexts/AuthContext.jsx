// In your AuthContext.js
import React, { createContext, useContext, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    try {
      // 1. Authenticate with your backend (or Firebase)
      //    This is where your Firebase Auth logic would go
      //    Example: const authResponse = await axios.post('/api/auth/login', { email, password });

      // 2. Fetch the user's full profile from MongoDB
      //    (This assumes your auth logic is successful)
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

export const  useAuth = () => {
  return useContext(AuthContext);
};
