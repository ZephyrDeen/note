import { useAuth } from '../context/AuthContext'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import GalaxyBackground from './GalaxyBackground'

// 2D地图组件，显示笔记位置
function LocationMap({ uvx, uvy, src = '/texture.jpg' }) {
  if (!uvx || !uvy) return null

  const leftPercent = `${(uvx * 100).toFixed(2)}%`
  const topPercent = `${((1 - uvy) * 100).toFixed(2)}%`

  return (
    <div className="bg-slate-900/40 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden">
      <div className="h-1 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500"></div>
      <div className="p-4">
        <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
          <span>🌍</span> Location on Earth
        </h3>
        <div
          style={{
            position: 'relative',
            width: '100%',
            aspectRatio: '2 / 1',
            borderRadius: 12,
            overflow: 'hidden',
            border: '2px solid rgba(255,255,255,0.1)'
          }}
        >
          <img
            src={src}
            alt="Earth texture"
            style={{
              width: '100%',
              height: '100%',
              display: 'block',
              transform: 'scaleY(-1)'
            }}
          />
          <div
            className="absolute w-5 h-5 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 border-[3px] border-white shadow-[0_0_20px_rgba(139,92,246,0.6),0_0_40px_rgba(139,92,246,0.3)] animate-pulse"
            style={{
              left: leftPercent,
              top: topPercent,
              transform: 'translate(-50%, -50%)'
            }}
          />
          <div
            className="absolute w-10 h-10 border-2 border-white/50 rounded-full pointer-events-none"
            style={{
              left: leftPercent,
              top: topPercent,
              transform: 'translate(-50%, -50%)'
            }}
          />
        </div>
        <p className="text-violet-300/70 text-sm mt-3 text-center font-mono">
          Coordinates: ({uvx.toFixed(4)}, {uvy.toFixed(4)})
        </p>
      </div>
    </div>
  )
}

function SingleNote() {
  const { user, logout, notes, notesLoading, fetchNotes, deleteNote, updateNote } = useAuth()
  const navigate = useNavigate()
  const { id } = useParams()
  const note = notes.find(note => note.id === id)
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState({ title: '', content: '' })

  useEffect(() => {
    fetchNotes()
  }, [])

  useEffect(() => {
    if (note) {
      setEditData({ title: note.title, content: note.content })
    }
  }, [note])

  const handleGoBack = () => {
    navigate('/welcome')
  }

  const handleGoToNotes = () => {
    navigate('/notes')
  }

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      await deleteNote(id)
      navigate('/notes')
    }
  }

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleSave = async () => {
    if (updateNote) {
      await updateNote(id, editData)
    }
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditData({ title: note?.title || '', content: note?.content || '' })
    setIsEditing(false)
  }

  if (notesLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <GalaxyBackground />
        <div className="relative z-10 text-white text-xl">Loading...</div>
      </div>
    )
  }

  if (!note) {
    return (
      <div className="min-h-screen bg-black relative overflow-hidden">
        <GalaxyBackground />
        <nav className="relative z-50 bg-black/30 backdrop-blur-md border-b border-white/10 sticky top-0">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center">
                <span className="text-white font-bold text-lg">❓</span>
              </div>
              <h1 className="text-white font-semibold text-xl">Note Not Found</h1>
            </div>
          </div>
        </nav>
        <div className="relative z-10 flex flex-col items-center justify-center py-32">
          <div className="w-24 h-24 mb-6 rounded-full bg-white/5 flex items-center justify-center">
            <span className="text-5xl">🔍</span>
          </div>
          <h2 className="text-white text-2xl font-medium mb-3">Note not found</h2>
          <p className="text-gray-400 mb-6">The note you're looking for doesn't exist.</p>
          <button
            onClick={handleGoToNotes}
            className="px-6 py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-xl font-semibold transition-all duration-200 shadow-lg shadow-violet-500/25"
          >
            ← Back to Notes
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <GalaxyBackground starCount={150} />

      {/* 导航栏 */}
      <nav className="relative z-50 bg-black/30 backdrop-blur-md border-b border-white/10 sticky top-0">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center shadow-lg shadow-violet-500/30">
                <span className="text-white font-bold text-lg">📄</span>
              </div>
              <h1 className="text-white font-semibold text-xl">Note Details</h1>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleGoBack}
                className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium text-sm transition-all duration-200 border border-white/10"
              >
                🌍 Globe View
              </button>
              <button
                onClick={handleGoToNotes}
                className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium text-sm transition-all duration-200 border border-white/10"
              >
                📝 All Notes
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* 笔记内容 */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-12">
        <div className="bg-slate-900/40 backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden shadow-xl">
          <div className="h-2 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500"></div>

          <div className="p-8">
            {/* 标题区域 */}
            <div className="mb-8">
              {isEditing ? (
                <input
                  type="text"
                  value={editData.title}
                  onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                  className="w-full text-3xl font-bold bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-violet-500/50 focus:shadow-[0_0_20px_5px_rgba(139,92,246,0.15)]"
                  placeholder="Note title..."
                />
              ) : (
                <h1 className="text-3xl font-bold text-white mb-3">{note.title}</h1>
              )}

              <div className="flex items-center gap-4 text-sm text-violet-300/70">
                <span className="flex items-center gap-1.5">
                  <span>📅</span>
                  Created: {new Date(note.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
                {note.uvx && note.uvy && (
                  <span className="flex items-center gap-1.5">
                    <span>📍</span>
                    Location: ({note.uvx.toFixed(3)}, {note.uvy.toFixed(3)})
                  </span>
                )}
              </div>
            </div>

            {/* 分隔线 */}
            <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-8"></div>

            {/* 内容区域 */}
            <div className="mb-8">
              {isEditing ? (
                <textarea
                  value={editData.content}
                  onChange={(e) => setEditData({ ...editData, content: e.target.value })}
                  className="w-full min-h-[300px] bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-gray-200 leading-relaxed focus:outline-none focus:border-violet-500/50 focus:shadow-[0_0_20px_5px_rgba(139,92,246,0.15)] resize-none"
                  placeholder="Write your note content..."
                />
              ) : (
                <div className="prose prose-invert max-w-none">
                  <p className="text-gray-300 leading-relaxed text-lg whitespace-pre-wrap">
                    {note.content}
                  </p>
                </div>
              )}
            </div>

            {/* 操作按钮 */}
            <div className="flex items-center gap-3 pt-6 border-t border-white/10">
              {isEditing ? (
                <>
                  <button
                    onClick={handleSave}
                    className="px-6 py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white rounded-xl font-semibold transition-all duration-200 shadow-lg shadow-violet-500/25"
                  >
                    💾 Save Changes
                  </button>
                  <button
                    onClick={handleCancel}
                    className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-semibold transition-all duration-200 border border-white/10"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={handleEdit}
                    className="px-6 py-3 bg-violet-500/20 hover:bg-violet-500/30 text-violet-300 rounded-xl font-semibold transition-all duration-200 border border-violet-500/30"
                  >
                    ✏️ Edit Note
                  </button>
                  <button
                    onClick={handleDelete}
                    className="px-6 py-3 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-xl font-semibold transition-all duration-200 border border-red-500/30"
                  >
                    🗑️ Delete Note
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* 2D地图显示位置 */}
        {note.uvx && note.uvy && (
          <div className="mt-8">
            <LocationMap uvx={note.uvx} uvy={note.uvy} />
          </div>
        )}

        {/* 返回提示 */}
        <div className="mt-8 text-center">
          <button
            onClick={handleGoToNotes}
            className="text-violet-400 hover:text-violet-300 transition-colors text-sm"
          >
            ← Back to all notes
          </button>
        </div>
      </div>
    </div>
  )
}

export default SingleNote
