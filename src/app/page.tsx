'use client'

import { useAuth } from '../contexts/AuthContext'
import { LoginForm } from '../components/LoginForm'
import { redirect } from 'next/navigation'
import { useEffect } from 'react'

function AppContent() {
  const { user, loading } = useAuth()

  useEffect(() => {
    if (user) {
      redirect('/admin')
    }
  }, [user])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return user ? null : <LoginForm />
}

export default function Home() {
  return <AppContent />
}
