import { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'

const AuthContext = createContext()

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const backendPath = import.meta.env.VITE_BACKEND_PATH || 'http://localhost:9090'
  const loginToken = import.meta.env.VITE_LOGIN_TOKEN || 'loginToken'

  const checkToken = async () => {
    const token = localStorage.getItem(loginToken)
    if (!token) {
      setLoading(false)
      return
    }

    try {
      const response = await axios.post(
        `${backendPath}/api/login`,
        { message: 'token' },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      if (response.data.code === 200) {
        setUser({ username: response.data.username })
      }
    } catch (error) {
      localStorage.removeItem(loginToken)
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  const login = async (username, password) => {
    try {
      const response = await axios.post(`${backendPath}/api/login`, {
        username,
        password
      })

      if (response.data.code === 200) {
        const { username: userName, token } = response.data
        setUser({ username: userName })
        localStorage.setItem(loginToken, token)
        return { success: true }
      }
    } catch (error) {
      const code = error?.response?.data?.code
      return { success: false, error: code }
    }
  }

  const register = async (username, password) => {
    try {
      const response = await axios.post(`${backendPath}/api/register`, {
        username,
        password
      })

      if (response.data.code === 201) {
        return { success: true }
      }
    } catch (error) {
      const code = error?.response?.data?.code
      return { success: false, error: code }
    }
  }

  const logout = () => {
    localStorage.removeItem(loginToken)
    setUser(null)
  }

  useEffect(() => {
    checkToken()
  }, [])

  const value = {
    user,
    login,
    register,
    logout,
    loading,
    isAuthenticated: !!user
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
} 