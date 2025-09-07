import React, { createContext, useContext, useState, useEffect } from 'react'
import { getAuth, sendPasswordResetEmail } from 'firebase/auth'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Fetch user profile from backend using Firebase ID token
  useEffect(() => {
    const fetchProfile = async () => {
      const auth = getAuth();
      const currentUser = auth.currentUser;
      if (!currentUser) {
        setIsAuthenticated(false);
        setUser(null);
        return;
      }
      try {
        const idToken = await currentUser.getIdToken();
        const res = await fetch('http://localhost:5000/me', {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        });
        if (!res.ok) throw new Error('Failed to fetch profile');
        const data = await res.json();
        setUser(data);
        setIsAuthenticated(true);
      } catch (err) {
        setIsAuthenticated(false);
        setUser(null);
      }
    };
    fetchProfile();
  }, []);


  // You may want to update this login to use Firebase Auth
  const login = async (email, password) => {
    // This should use Firebase Auth signInWithEmailAndPassword
    // and then fetch the profile as above
    setIsAuthenticated(true)
    return Promise.resolve()
  }


  // You may want to update this register to use Firebase Auth
  const register = (userData) => {
    setUser({ ...user, ...userData })
    setIsAuthenticated(true)
    return Promise.resolve()
  }


  const logout = () => {
    setIsAuthenticated(false)
    setUser(null)
  }

  const updateProfile = (updatedData) => {
    setUser(prev => ({ ...prev, ...updatedData }))
  }

  // Reset password using Firebase Auth
  const resetPassword = async (email) => {
    const auth = getAuth();
    await sendPasswordResetEmail(auth, email);
  }

  const value = {
    user,
    isAuthenticated,
    login,
    register,
    logout,
    updateProfile,
    resetPassword
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}