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
  const [notes, setNotes] = useState([])
  const [notesLoading, setNotesLoading] = useState(false)

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
    setNotes([]) // 清空笔记
  }

  // Notes 相关功能
  const fetchNotes = async () => {
    try {
      setNotesLoading(true)
      const token = localStorage.getItem(loginToken)
      const response = await axios.get(`${backendPath}/api/notes`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.data.success) {
        setNotes(response.data.notes)
      }
    } catch (error) {
      console.error('Failed to fetch notes:', error)
    } finally {
      setNotesLoading(false)
    }
  }

  const createNote = async (noteData) => {
    try {
      const token = localStorage.getItem(loginToken)
      const response = await axios.post(`${backendPath}/api/notes`, noteData, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.data.success) {
        // 重新获取笔记列表
        await fetchNotes()
        return { success: true }
      }
      return { success: false, message: 'Failed to create note' }
    } catch (error) {
      console.error('Failed to create note:', error)
      return { success: false, message: error.message }
    }
  }

  const deleteNote = async (noteId) => {
    try {
      const token = localStorage.getItem(loginToken)
      const response = await axios.delete(`${backendPath}/api/notes/${noteId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.data.success) {
        // 重新获取笔记列表
        await fetchNotes()
        return { success: true }
      }
      return { success: false, message: 'Failed to delete note' }
    } catch (error) {
      console.error('Failed to delete note:', error)
      return { success: false, message: error.message }
    }
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
    isAuthenticated: !!user,
    // Notes 相关
    notes,
    notesLoading,
    fetchNotes,
    createNote,
    deleteNote
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
} 