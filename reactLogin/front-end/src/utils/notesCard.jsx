import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

function NotesCard() {
  const {
    user,
    logout,
    notes,
    notesLoading,
    fetchNotes,
  } = useAuth()
  const navigate = useNavigate()

  const handleGoToSingleNote = (id) => {
    navigate(`/notes/${id}`)
  }


  useEffect(() => {
    fetchNotes()
  }, [])

  return (
    <div>
      {notes.length > 0 && (
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white mb-2">Your Notes</h2>
          <p className="text-violet-300/70 text-sm">Click on a note to view details</p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {notes.map((note) => (
          <div
            key={note.id}
            className="group relative bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden hover:border-violet-500/50 hover:bg-white/15 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-violet-500/10"
          >
            {/* 装饰渐变 */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500"></div>

            <div className="p-5">
              <h5 className="text-lg font-semibold text-white mb-2 line-clamp-1 group-hover:text-violet-300 transition-colors">
                {note.title}
              </h5>
              <p className="text-gray-400 text-sm leading-relaxed line-clamp-3 mb-4">
                {note.content}
              </p>

              <div className="flex items-center justify-between">
                <span className="text-xs text-violet-400/60">
                  {note.createdAt && new Date(note.createdAt).toLocaleDateString()}
                </span>
                <button
                  onClick={() => handleGoToSingleNote(note.id)}
                  className="px-4 py-2 bg-violet-500/20 hover:bg-violet-500/40 text-violet-300 rounded-lg text-sm font-medium transition-all duration-200 border border-violet-500/30 hover:border-violet-500/50"
                  type="button"
                >
                  View →
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {notes.length === 0 && (
        <div className="text-center py-16">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-white/5 flex items-center justify-center">
            <span className="text-4xl">📝</span>
          </div>
          <h3 className="text-white text-lg font-medium mb-2">No notes yet</h3>
          <p className="text-gray-400 text-sm">Click on the Earth to select a location and create your first note!</p>
        </div>
      )}
    </div>
  )
}

export default NotesCard