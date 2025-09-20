import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { gsap } from 'gsap'
import { useAuth } from '../context/AuthContext'

function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  const loginRef = useRef(null)
  const { login } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    // 入场动画
    gsap.fromTo(loginRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.5, display: 'flex' }
    )
  }, [])

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
      showErrorAnimation()
      return
    }

    setLoading(true)
    const result = await login(formData.username, formData.password)

    if (result.success) {
      showSuccessAnimation()
      // 清空表单
      setFormData({ username: '', password: '' })
      // 页面切换动画
      const timeline = gsap.timeline()
      timeline.to(loginRef.current, {
        duration: 0.5,
        display: "none",
        opacity: 0,
        x: 0,
        y: -40,
        onComplete: () => navigate('/welcome')
      })
    } else {
      showErrorAnimation()
    }
    setLoading(false)
  }

  const showErrorAnimation = () => {
    const timeline = gsap.timeline()
    timeline.to("body", {
      duration: 0,
      background: "#fff"
    })
    timeline.to("body", {
      duration: 1,
      background: "#ff7875",
      ease: "power2.inOut"
    })
    timeline.to("body", {
      duration: 1,
      background: "#fff",
      ease: "power2.inOut"
    })
  }

  const showSuccessAnimation = () => {
    const timeline = gsap.timeline()
    timeline.to("body", {
      duration: 0,
      background: "#fff"
    })
    timeline.to("body", {
      duration: 1,
      background: "#52c41a",
      ease: "power2.inOut"
    })
    timeline.to("body", {
      duration: 1,
      background: "#fff",
      ease: "power2.inOut"
    })
  }

  const handleSwitchToRegister = (e) => {
    e.preventDefault()
    // 登录到注册的页面切换动画
    const timeline = gsap.timeline()
    timeline.to(loginRef.current, {
      duration: 0.5,
      display: "none",
      opacity: 0,
      x: 0,
      y: -40,
      onComplete: () => navigate('/register')
    })
  }

  return (
    <div className="login" ref={loginRef}>
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