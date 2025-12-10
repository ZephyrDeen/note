import { useAuth } from '../context/AuthContext'
import { useState, useEffect } from 'react'


function AddNote({ uv }) {
  const { createNote } = useAuth()
  const [newNote, setNewNote] = useState({ title: '', content: '', uvx: uv?.x ?? null, uvy: uv?.y ?? null })

  const handleAddNote = async () => {
    if (!newNote.title || !newNote.content || !newNote.uvx || !newNote.uvy) return
    const result = await createNote(newNote)
    if (result.success) {
      setNewNote({ title: '', content: '', uvx: uv.x ? uv.x : null, uvy: uv.y ? uv.y : null })
    }
  }
  useEffect(() => {
    if (uv) {
      setNewNote(prev => ({ ...prev, uvx: uv.x, uvy: uv.y }))
    }
  }, [uv])

  return (
    <div className="px-6 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden">
          {/* 头部装饰 */}
          <div className="h-1 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500"></div>

          <div className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center">
                <span className="text-white text-lg">✏️</span>
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Create New Note</h2>
                <p className="text-violet-300/70 text-sm">Location: ({uv?.x?.toFixed(3)}, {uv?.y?.toFixed(3)})</p>
              </div>
            </div>

            <div className="space-y-5">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-violet-300 mb-2">Title</label>
                <input
                  type="text"
                  id="title"
                  placeholder="Enter note title..."
                  value={newNote.title}
                  onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20 transition-all"
                />
              </div>

              <div>
                <label htmlFor="content" className="block text-sm font-medium text-violet-300 mb-2">Content</label>
                <textarea
                  id="content"
                  placeholder="Write your note here..."
                  value={newNote.content}
                  onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20 transition-all resize-none"
                  rows={4}
                />
              </div>

              <button
                onClick={handleAddNote}
                className="w-full py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white rounded-xl font-semibold transition-all duration-200 shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 hover:scale-[1.02] active:scale-[0.98]"
              >
                💾 Save Note
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddNote