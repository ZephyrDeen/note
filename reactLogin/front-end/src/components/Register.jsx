import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { showError, showCorrect } from '../utils/animations'

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  })
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  const { register } = useAuth()
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

    if (!formData.username || !formData.password || !formData.confirmPassword) {
      showError()
      return
    }

    if (formData.password !== formData.confirmPassword) {
      showError()
      return
    }

    setLoading(true)
    const result = await register(formData.username, formData.password)

    if (result.success) {
      showCorrect()
      // 清空表单
      setFormData({ username: '', password: '', confirmPassword: '' })
      // 延迟跳转，让成功动画播放完
      setTimeout(() => navigate('/login'), 2000)
    } else {
      showError()
    }
    setLoading(false)
  }



  const handleSwitchToLogin = (e) => {
    e.preventDefault()
    navigate('/login')
  }

  return (
    <div className="register">
      <div className="register-info">
        <div className="info">
          <div className="username">
            <label htmlFor="new-username">Input Username:</label>
            <input
              type="text"
              id="new-username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              disabled={loading}
            />
          </div>
          <div className="password">
            <label htmlFor="reg-password-one">Input Password:</label>
            <input
              type="password"
              id="reg-password-one"
              name="password"
              value={formData.password}
              onChange={handleChange}
              disabled={loading}
            />
          </div>
          <div className="password">
            <label htmlFor="reg-password-two">Check Password:</label>
            <input
              type="password"
              id="reg-password-two"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              disabled={loading}
            />
          </div>
        </div>
        <div className="register-btn" onClick={handleSubmit}>
          <span>{loading ? 'Signing Up...' : 'Sign Up'}</span>
        </div>
      </div>
      <div className="to-register">
        if you have an account, you may hope to login.
        <span className="to-login-btn" onClick={handleSwitchToLogin}>here</span>
      </div>
    </div>
  )
}

export default Register 