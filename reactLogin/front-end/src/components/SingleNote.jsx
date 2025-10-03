import { useAuth } from '../context/AuthContext'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'

function SingleNote() {
    const { user, logout, notes, notesLoading, fetchNotes, createNote, deleteNote } = useAuth()
    const navigate = useNavigate()
    const { id } = useParams()
    const note = notes.find(note => note.id === id)
    useEffect(() => {
        fetchNotes()
    }, [])

    const handleGoBack = () => {
        navigate('/welcome')
    }

    return (  
      <div>
        <div>
            <button onClick={handleGoBack}>Back</button>
        </div>
        <div>
            <h1>Single Note</h1>
            <p>{note?.title}</p>
            <p>{note?.content}</p>
        </div>
      </div>
    )
}

export default SingleNote