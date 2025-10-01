import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Canvas } from "@react-three/fiber";
import { useGLTF, OrbitControls, Environment,Bounds } from "@react-three/drei";
import { LowPolyEarth } from '../earth/LowPolyEarth'
import { Suspense } from "react";





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
    <div>
      
    
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
    <div >
    <Canvas>
        <Suspense fallback={null}>
          <Bounds fit clip observe margin={1.2}>
            <LowPolyEarth scale={100} />
          </Bounds> 
          <OrbitControls />
          <Environment preset="sunset" background />
        </Suspense>
      </Canvas>
      </div>
    </div>
    
  )
}

export default Welcome 