import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Login from './components/Login'
import Register from './components/Register'
import Welcome from './components/Welcome'
import Notes from './components/Notes'
import { AuthProvider, useAuth } from './context/AuthContext'
import './App.scss'


function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth()

  if (loading) {
    return <div>Loading...</div>
  }

  return isAuthenticated ? children : <Navigate to="/login" />
}

function AppContent() {
  const { isAuthenticated } = useAuth()

  return (
    <div id="app">
      <Routes>
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/welcome" /> : <Login />}
        />
        <Route
          path="/register"
          element={isAuthenticated ? <Navigate to="/welcome" /> : <Register />}
        />
        <Route
          path="/welcome"
          element={
            <ProtectedRoute>
              <Welcome />
            </ProtectedRoute>
          }
        />
        <Route
          path="/notes"
          element={
            <ProtectedRoute>
              <Notes />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </div>
  )
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  )
}

export default App
