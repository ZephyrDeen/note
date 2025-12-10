import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { showError, showCorrect } from '../utils/animations'

function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  const { login } = useAuth()
  const navigate = useNavigate()


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    if (error) setError(false) // 清除错误状态
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.username || !formData.password) {
      showError()
      return
    }

    setLoading(true)
    const result = await login(formData.username, formData.password)

    if (result.success) {
      showCorrect()
      // 清空表单
      setFormData({ username: '', password: '' })
      // 延迟跳转，让成功动画播放完
      setTimeout(() => navigate('/welcome'), 2000)
    } else {
      showError()
    }
    setLoading(false)
  }



  const handleSwitchToRegister = (e) => {
    e.preventDefault()
    navigate('/register')
  }

  return (
    <div className="login">
      <div className="login-info">
        <div className="info">
          <div className="username">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              disabled={loading}
            />
          </div>
          <div className="password">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              disabled={loading}
            />
          </div>
        </div>
        <div className="login-btn" onClick={handleSubmit}>
          <span>{loading ? 'Signing In...' : 'Sign In'}</span>
        </div>
      </div>
      <div className="to-register">
        if you don't have an account, you may hope to register.
        <span className="to-register-btn" onClick={handleSwitchToRegister}>here</span>
      </div>
    </div>
  )
}

export default Login 