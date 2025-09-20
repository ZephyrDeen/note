import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { gsap } from 'gsap'
import { useAuth } from '../context/AuthContext'

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  })
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  const registerRef = useRef(null)
  const { register } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    // 入场动画
    gsap.fromTo(registerRef.current,
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

    if (!formData.username || !formData.password || !formData.confirmPassword) {
      showErrorAnimation()
      return
    }

    if (formData.password !== formData.confirmPassword) {
      showErrorAnimation()
      return
    }

    setLoading(true)
    const result = await register(formData.username, formData.password)

    if (result.success) {
      showSuccessAnimation()
      // 清空表单
      setFormData({ username: '', password: '', confirmPassword: '' })
      // 页面切换动画
      const timeline = gsap.timeline()
      timeline.to(registerRef.current, {
        duration: 0.5,
        display: "none",
        opacity: 0,
        x: 0,
        y: -40,
        onComplete: () => navigate('/login')
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

  const handleSwitchToLogin = (e) => {
    e.preventDefault()
    // 注册到登录的页面切换动画
    const timeline = gsap.timeline()
    timeline.to(registerRef.current, {
      duration: 0.5,
      display: "none",
      opacity: 0,
      x: 0,
      y: -40,
      onComplete: () => navigate('/login')
    })
  }

  return (
    <div className="register" ref={registerRef}>
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