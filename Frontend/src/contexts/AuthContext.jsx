import React, { createContext, useContext, useState } from 'react'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    bio: 'Full-stack developer passionate about creating amazing user experiences',
    skills: ['React', 'Node.js', 'Python', 'UI/UX Design'],
    badges: ['Early Adopter', 'Team Player', 'Innovator'],
    collaborationStreak: 15,
    level: 'Expert',
    joinDate: '2023-01-15',
    location: 'San Francisco, CA',
    website: 'https://johndoe.dev',
    github: 'johndoe',
    linkedin: 'johndoe'
  })

  const [isAuthenticated, setIsAuthenticated] = useState(true)

  const login = (email, password) => {
    // Mock login - in real app, this would make API call
    setIsAuthenticated(true)
    return Promise.resolve()
  }

  const register = (userData) => {
    // Mock registration - in real app, this would make API call
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

  const value = {
    user,
    isAuthenticated,
    login,
    register,
    logout,
    updateProfile
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}