import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

function ShowNote() {
    const { user, logout, notes, notesLoading, fetchNotes, createNote, deleteNote } = useAuth()
    const navigate = useNavigate()
    const { id } = useParams()
    const note = notes.find(note => note.id === id)
    return (
        <div>
            <h1>Show Note</h1>
            <p>{note?.title}</p>
            <p>{note?.content}</p>
        </div>
    )
}