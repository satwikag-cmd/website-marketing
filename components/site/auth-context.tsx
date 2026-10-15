'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  type User,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth'
import { auth, googleProvider } from '@/lib/firebase'

interface AuthContextType {
  user: User | null
  loading: boolean
  showWelcomeModal: boolean
  setShowWelcomeModal: (show: boolean) => void
  signedOutNotice: boolean
  setSignedOutNotice: (show: boolean) => void
  signInWithGoogle: () => Promise<User | null>
  signOutUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [showWelcomeModal, setShowWelcomeModal] = useState(false)
  const [signedOutNotice, setSignedOutNotice] = useState(false)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider)
      if (result?.user) {
        setSignedOutNotice(false)
        setShowWelcomeModal(true)
        router.push('/')
      }
      return result.user
    } catch (error: any) {
      // User closed popup or cancelled
      if (error?.code !== 'auth/popup-closed-by-user') {
        console.error('Google Sign-In Error:', error)
      }
      return null
    }
  }

  const signOutUser = async () => {
    try {
      await signOut(auth)
      setShowWelcomeModal(false)
      setSignedOutNotice(true)
    } catch (error) {
      console.error('Sign Out Error:', error)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        showWelcomeModal,
        setShowWelcomeModal,
        signedOutNotice,
        setSignedOutNotice,
        signInWithGoogle,
        signOutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
