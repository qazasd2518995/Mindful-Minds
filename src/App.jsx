import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Chat from './pages/Chat'
import MoodTracker from './pages/MoodTracker'
import Meditation from './pages/Meditation'
import Journal from './pages/Journal'
import Dashboard from './pages/Dashboard'
import Resources from './pages/Resources'
import { registerUser } from './services/api'

function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    // Load user data from localStorage (用於快速載入UI)
    const savedUser = localStorage.getItem('mindful-user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
  }, [])

  const handleLogin = async (username) => {
    try {
      // 註冊/保存用戶到 AWS DynamoDB
      await registerUser(username)

      const userData = { username, joinedDate: new Date().toISOString() }
      setUser(userData)
      // 同時保存到 localStorage 用於快速登入
      localStorage.setItem('mindful-user', JSON.stringify(userData))
    } catch (error) {
      console.error('Login error:', error)
      alert('登入失敗，請稍後再試')
    }
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={user ? <Layout user={user} /> : <Home onLogin={handleLogin} />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard user={user} />} />
          <Route path="chat" element={<Chat user={user} />} />
          <Route path="mood" element={<MoodTracker user={user} />} />
          <Route path="meditation" element={<Meditation />} />
          <Route path="journal" element={<Journal user={user} />} />
          <Route path="resources" element={<Resources />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
