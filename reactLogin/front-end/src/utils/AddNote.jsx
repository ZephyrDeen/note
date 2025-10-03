import { useAuth } from '../context/AuthContext'
import { useState, useEffect } from 'react'


function AddNote({uv}) {
    const { createNote } = useAuth()
    const [newNote, setNewNote] = useState({ title: '', content: '',uvx: uv?.x ?? null,uvy: uv?.y ?? null })

    const handleAddNote = async () => {
        if (!newNote.title || !newNote.content || !newNote.uvx || !newNote.uvy) return
        const result = await createNote(newNote)
        if (result.success) {
            setNewNote({ title: '', content: '',uvx: uv.x ? uv.x : null, uvy: uv.y ? uv.y : null })
        }
    }
    useEffect(() => {
      if (uv) {
        setNewNote(prev => ({ ...prev, uvx: uv.x, uvy: uv.y }))
      }
    }, [uv])

    return (
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
    )
}

export default AddNote