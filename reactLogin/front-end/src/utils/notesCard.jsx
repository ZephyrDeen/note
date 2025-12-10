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
        <h1>Notes</h1>
        <div>
            {notes.map((note) => (
                <div key={note.id} onClick={() => handleGoToSingleNote(note.id)}>{note.title}</div>
            ))}
        </div>
    </div>
  )
}

export default NotesCard