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

  if (notesLoading) {
    return <div className="notes-page">Loading...</div>
  }

  return (
    <div className="notes-page">
      <div className="notes-header">
        <h1>My Notes</h1>
        <div>
          <button
            className="to-register-btn"
            onClick={() => setShowAddForm(!showAddForm)}
          >
            {showAddForm ? 'Cancel' : 'Add Note'}
          </button>
          <button
            className="to-login-btn"
            onClick={handleGoBack}
          >
            Back to Welcome
          </button>
          <button
            className="to-login-btn"
            onClick={handleSignOut}
          >
            Sign Out
          </button>
        </div>
      </div>

      {showAddForm && (
        <div className="add-note-form">
          <input
            type="text"
            placeholder="Note title..."
            value={newNote.title}
            onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
            className="note-input"
          />
          <textarea
            placeholder="Write your note here..."
            value={newNote.content}
            onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
            className="note-textarea"
            rows={4}
          />
          <button onClick={handleAddNote} className="login-btn">
            Save Note
          </button>
        </div>
      )}

      <div className="notes-list">
        {notes.length === 0 ? (
          <p>No notes yet. Create your first note!</p>
        ) : (
          notes.map((note) => (
            <div key={note.id} className="note-item">
              <h3>{note.title}</h3>
              <p>{note.content}</p>
              <div className="note-meta">
                <span>Created: {new Date(note.createdAt).toLocaleDateString()}</span>
                <button
                  onClick={() => handleDeleteNote(note.id)}
                  className="delete-btn"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Notes 