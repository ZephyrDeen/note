import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { gsap } from 'gsap'
import { useAuth } from '../context/AuthContext'

function Notes() {
  const [notes, setNotes] = useState([
    { id: 1, title: 'Welcome Note', content: 'This is your first note! You can create, edit, and delete notes here.', date: new Date().toLocaleDateString() },
    { id: 2, title: 'React Learning', content: 'Learning React Router, Context API, and GSAP animations.', date: new Date().toLocaleDateString() }
  ])
  const [showAddForm, setShowAddForm] = useState(false)
  const [newNote, setNewNote] = useState({ title: '', content: '' })

  const notesRef = useRef(null)
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    // 入场动画
    gsap.fromTo(notesRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.5, display: 'block' }
    )
  }, [])

  const handleAddNote = () => {
    if (newNote.title && newNote.content) {
      const note = {
        id: Date.now(),
        title: newNote.title,
        content: newNote.content,
        date: new Date().toLocaleDateString()
      }
      setNotes([note, ...notes])
      setNewNote({ title: '', content: '' })
      setShowAddForm(false)
    }
  }

  const handleDeleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id))
  }

  const handleSignOut = () => {
    // 退出登录的页面切换动画
    const timeline = gsap.timeline()
    timeline.to(notesRef.current, {
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

  const handleGoBack = () => {
    // 返回欢迎页的页面切换动画
    const timeline = gsap.timeline()
    timeline.to(notesRef.current, {
      duration: 0.5,
      display: "none",
      opacity: 0,
      x: 0,
      y: -40,
      onComplete: () => navigate('/welcome')
    })
  }

  return (
    <div className="notes-page" ref={notesRef}>
      <div className="notes-header">
        <h1>My Notes</h1>
        <div>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="register-btn"
          >
            <span>{showAddForm ? 'Cancel' : 'Add Note'}</span>
          </button>
          <span className="to-register-btn" onClick={handleGoBack}>Back</span>
          <button
            onClick={handleSignOut}
            className="login-btn"
          >
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {showAddForm && (
        <div className="info">
          <input
            type="text"
            placeholder="Note Title"
            value={newNote.title}
            onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
          />
          <textarea
            placeholder="Note Content"
            value={newNote.content}
            onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
            rows="4"
          />
          <button
            onClick={handleAddNote}
            className="login-btn"
          >
            <span>Save Note</span>
          </button>
        </div>
      )}

      <div>
        {notes.length === 0 ? (
          <p>No notes yet. Create your first note!</p>
        ) : (
          notes.map(note => (
            <div key={note.id}>
              <h3>{note.title}</h3>
              <p>{note.content}</p>
              <small>Created: {note.date}</small>
              <button onClick={() => handleDeleteNote(note.id)} className="to-login-btn">
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Notes 