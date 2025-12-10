import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Notes() {
  const [showAddForm, setShowAddForm] = useState(false)
  const [newNote, setNewNote] = useState({ title: '', content: '' })

  const {
    user,
    logout,
    notes,
    notesLoading,
    fetchNotes,
    createNote,
    deleteNote
  } = useAuth()
  const navigate = useNavigate()

  // 组件加载时获取笔记
  useEffect(() => {
    fetchNotes()
  }, [])

  const handleAddNote = async () => {
    if (!newNote.title || !newNote.content) return

    const result = await createNote(newNote)
    if (result.success) {
      setNewNote({ title: '', content: '' })
      setShowAddForm(false)
    }
  }

  const handleDeleteNote = async (id) => {
    await deleteNote(id)
  }

  const handleSignOut = () => {
    logout()
    navigate('/login')
  }

  const handleGoBack = () => {
    navigate('/welcome')
  }

  const handleGoToSingleNote = (id) => {
    navigate(`/notes/${id}`)
  }

  if (notesLoading) {
    return <div className="notes-page">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* 导航栏 */}
      <nav className="bg-black/30 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center">
                <span className="text-white font-bold text-lg">N</span>
              </div>
              <h1 className="text-white font-semibold text-xl">My Notes</h1>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowAddForm(!showAddForm)}
                className={`px-5 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 border ${showAddForm
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/30 hover:bg-amber-500/30'
                    : 'bg-violet-500/20 text-violet-300 border-violet-500/30 hover:bg-violet-500/30'
                  }`}
              >
                {showAddForm ? '✕ Cancel' : '+ Add Note'}
              </button>
              <button
                onClick={handleGoBack}
                className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium text-sm transition-all duration-200 border border-white/10"
              >
                🌍 Globe View
              </button>
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

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* 添加笔记表单 */}
        {showAddForm && (
          <div className="mb-8 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden">
            <div className="h-1 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500"></div>
            <div className="p-6">
              <h2 className="text-xl font-bold text-white mb-6">Create New Note</h2>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Note title..."
                  value={newNote.title}
                  onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20 transition-all"
                />
                <textarea
                  placeholder="Write your note here..."
                  value={newNote.content}
                  onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20 transition-all resize-none"
                  rows={4}
                />
                <button
                  onClick={handleAddNote}
                  className="px-6 py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white rounded-xl font-semibold transition-all duration-200 shadow-lg shadow-violet-500/25"
                >
                  💾 Save Note
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 笔记列表 */}
        {notes.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-white/5 flex items-center justify-center">
              <span className="text-5xl">📝</span>
            </div>
            <h3 className="text-white text-2xl font-medium mb-3">No notes yet</h3>
            <p className="text-gray-400 mb-6">Create your first note to get started!</p>
            <button
              onClick={() => setShowAddForm(true)}
              className="px-6 py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-xl font-semibold transition-all duration-200 shadow-lg shadow-violet-500/25"
            >
              + Create Note
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {notes.map((note) => (
              <div
                key={note.id}
                className="group bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden hover:border-violet-500/50 hover:bg-white/15 transition-all duration-300"
              >
                <div className="h-1 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500"></div>
                <div className="p-5">
                  <div
                    className="cursor-pointer"
                    onClick={() => handleGoToSingleNote(note.id)}
                  >
                    <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-violet-300 transition-colors line-clamp-1">
                      {note.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed line-clamp-3 mb-4">
                      {note.content}
                    </p>
                    <span className="text-xs text-violet-400/60">
                      {new Date(note.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mt-4 pt-4 border-t border-white/10">
                    <button
                      onClick={() => handleGoToSingleNote(note.id)}
                      className="flex-1 py-2 bg-violet-500/20 hover:bg-violet-500/40 text-violet-300 rounded-lg text-sm font-medium transition-all"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleDeleteNote(note.id)}
                      className="px-4 py-2 bg-red-500/20 hover:bg-red-500/40 text-red-300 rounded-lg text-sm font-medium transition-all"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Notes 