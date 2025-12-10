import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Canvas } from "@react-three/fiber";
import { useGLTF, OrbitControls, Environment, Bounds } from "@react-three/drei";
import LowPolyEarth from '../earth/LowPolyEarth'
import { Suspense, useState, useEffect } from "react";
import EarthImg from '../earth/earthImg'
import NotesCard from '../utils/notesCard'
// import Marker from '../earth/Marker'
import AddNote from '../utils/AddNote'


function Welcome() {
  const { user, logout, createNote } = useAuth()
  const navigate = useNavigate()
  const [uv, setUv] = useState(null)
  const [newNote, setNewNote] = useState({ title: '', content: '', uv: uv })


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

  const deleteUv = () => {
    setUv(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* 导航栏 */}
      <nav className="bg-black/30 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo & Welcome */}
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center">
                <span className="text-white font-bold text-lg">N</span>
              </div>
              <div>
                <h1 className="text-white font-semibold text-lg tracking-wide">Welcome back</h1>
                <p className="text-violet-300 text-sm">{user?.username}</p>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={handleGoToNotes}
                className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium text-sm transition-all duration-200 border border-white/10 hover:border-white/20"
              >
                📝 My Notes
              </button>
              {uv && (
                <button
                  onClick={deleteUv}
                  className="px-5 py-2.5 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 rounded-lg font-medium text-sm transition-all duration-200 border border-amber-500/30"
                >
                  ✕ Clear Selection
                </button>
              )}
              <button
                onClick={handleSignOut}
                className="px-5 py-2.5 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-lg font-medium text-sm transition-all duration-200 border border-red-500/30"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* 3D地球 */}
      <div className="relative h-[65vh] w-full">
        <Canvas className="w-full h-full">
          <Suspense fallback={null}>
            <Bounds fit clip observe margin={1.2}>
              <LowPolyEarth scale={120} onPick={setUv} />
            </Bounds>
            <OrbitControls />
            <Environment preset="sunset" background />
          </Suspense>
        </Canvas>

        {/* UV 坐标显示 */}
        {uv && (
          <div className="absolute bottom-6 left-6 bg-black/50 backdrop-blur-md rounded-xl px-4 py-3 border border-white/10">
            <p className="text-violet-300 text-sm font-mono">
              Selected: ({uv.x.toFixed(3)}, {uv.y.toFixed(3)})
            </p>
          </div>
        )}
      </div>

      {/* EarthImg 显示 */}
      {uv && (
        <div className="fixed top-24 right-6 z-40">
          <EarthImg uv={uv} setUv={setUv} />
        </div>
      )}

      {/* 添加笔记表单 */}
      {uv && <AddNote uv={uv} />}

      {/* 笔记卡片列表 */}
      <div className="px-6 py-8">
        <NotesCard />
      </div>
    </div>
  )
}

export default Welcome 