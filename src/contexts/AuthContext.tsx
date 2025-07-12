'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { User, LoginRequest } from '../types'
import { apiClient } from '../lib/api'

interface AuthContextType {
  user: User | null
  login: (credentials: LoginRequest) => Promise<void>
  logout: () => void
  loading: boolean
  isAdmin: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('access_token')
    if (token) {
      apiClient.setToken(token)
      apiClient.getUserProfile()
        .then(setUser)
        .catch(() => {
          localStorage.removeItem('access_token')
          apiClient.setToken(null)
        })
        .finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [])

  const login = async (credentials: LoginRequest) => {
    const response = await apiClient.login(credentials)
    localStorage.setItem('access_token', response.access_token)
    setUser(response.user)
  }

  const logout = () => {
    localStorage.removeItem('access_token')
    apiClient.logout()
    setUser(null)
  }

  const value = {
    user,
    login,
    logout,
    loading,
    isAdmin: user?.role === 'admin' || user?.username === 'admin',
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
