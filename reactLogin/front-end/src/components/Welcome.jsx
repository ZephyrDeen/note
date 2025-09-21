import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Welcome() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()



  const handleSignOut = () => {
    logout()
  }

  const handleGoToNotes = () => {
    navigate('/notes')
  }

  return (
    <div className="welcome">
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