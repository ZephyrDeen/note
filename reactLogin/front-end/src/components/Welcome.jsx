import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Canvas } from "@react-three/fiber";
import { useGLTF, OrbitControls, Environment,Bounds } from "@react-three/drei";
import LowPolyEarth  from '../earth/LowPolyEarth'
import { Suspense, useState, useEffect } from "react";
import EarthImg from '../earth/earthImg'
import NotesCard from '../utils/notesCard'
// import Marker from '../earth/Marker'
import AddNote from '../utils/AddNote'


function Welcome() {
  const { user, logout, createNote } = useAuth()
  const navigate = useNavigate()
  const [uv, setUv] = useState(null)
  const [newNote, setNewNote] = useState({ title: '', content: '',uv: uv })


  useEffect(() => {
    setNewNote((prev) => ({ ...prev, uv }))
    console.log(uv)
  }, [uv])



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
            <LowPolyEarth scale={100} onPick={setUv} />
          </Bounds> 
          <OrbitControls />
          <Environment preset="sunset" background />
        </Suspense>
      </Canvas>
      </div>
      <div>
      {uv && <EarthImg uv={uv} setUv={setUv} />}

      {/* <div>
            {notes.map((note) => (
                <div key={note.uv} onClick={() => handleGoToSingleNote(note.id)}>{note.title}</div>
            ))}
        </div> */}
      </div>
      {uv && <AddNote uv={uv} />}
      <NotesCard />
    </div>
    
  )
}

export default Welcome 