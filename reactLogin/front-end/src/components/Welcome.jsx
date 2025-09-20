import { useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { gsap } from 'gsap'
import { useAuth } from '../context/AuthContext'

function Welcome() {
  const welcomeRef = useRef(null)
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    // 入场动画
    gsap.fromTo(welcomeRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.5, display: 'flex' }
    )
  }, [])

  const handleSignOut = () => {
    // 退出登录的页面切换动画
    const timeline = gsap.timeline()
    timeline.to(welcomeRef.current, {
      duration: 0.5,
      display: "none",
      opacity: 0,
      x: 0,
      y: -40,
      onComplete: () => {
        logout()
        navigate('/login')
      }
    })
  }

  const handleGoToNotes = () => {
    // 去笔记页的页面切换动画
    const timeline = gsap.timeline()
    timeline.to(welcomeRef.current, {
      duration: 0.5,
      display: "none",
      opacity: 0,
      x: 0,
      y: -40,
      onComplete: () => navigate('/notes')
    })
  }

  return (
    <div className="welcome" ref={welcomeRef}>
      <h1>WELCOME</h1>
      <span id="welcome-user-name">{user?.username}</span>
      <div>
        <span className="to-register-btn" onClick={handleGoToNotes}>Go to Notes</span>
      </div>
      <span className="to-login-btn" id="sign-out" onClick={handleSignOut}>
        Sign Out
      </span>
    </div>
  )
}

export default Welcome 