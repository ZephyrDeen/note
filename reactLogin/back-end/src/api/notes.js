import express from 'express'
import prisma from '../lib/prisma.js'
import { authToken } from '../utils/authToken.js'

const router = express.Router()

// 获取用户的所有笔记
router.get('/', authToken, async (req, res) => {
  try {

    const { userId } = req.user
    const notes = await prisma.note.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    })
    res.json({ success: true, notes })
  } catch (error) {
    console.error('Get notes error:', error)
    res.status(500).json({ success: false, message: 'Failed to get notes' })
  }
})

// 创建新笔记
router.post('/', authToken, async (req, res) => {
  try {


    const { id: userId } = req.user
    const { title, content, uvx = null, uvy = null  } = req.body


    if (!title || !content) {
      return res.status(400).json({ success: false, message: 'Title and content are required' })
    }

    const note = await prisma.note.create({
      data: {
        title,
        content,
        userId,
        uvx,
        uvy
      }
    })

    res.json({ success: true, note })
  } catch (error) {
    console.error('Create note error:', error)
    res.status(500).json({ success: false, message: 'Failed to create note' })
    
  }
})

// 更新笔记
router.put('/:id', authToken, async (req, res) => {
  try {
    const userId = req.user.id
    const noteId = req.params.id
    const { title, content } = req.body

    // 检查笔记是否属于当前用户
    const existingNote = await prisma.note.findFirst({
      where: { id: noteId, userId }
    })

    if (!existingNote) {
      return res.status(404).json({ success: false, message: 'Note not found' })
    }

    const note = await prisma.note.update({
      where: { id: noteId },
      data: { title, content }
    })

    res.json({ success: true, note })
  } catch (error) {
    console.error('Update note error:', error)
    res.status(500).json({ success: false, message: 'Failed to update note' })
  }
})

// 删除笔记
router.delete('/:id', authToken, async (req, res) => {
  try {
    const userId = req.user.id
    const noteId = req.params.id

    // 检查笔记是否属于当前用户
    const existingNote = await prisma.note.findFirst({
      where: { id: noteId, userId }
    })

    if (!existingNote) {
      return res.status(404).json({ success: false, message: 'Note not found' })
    }

    await prisma.note.delete({
      where: { id: noteId }
    })

    res.json({ success: true, message: 'Note deleted successfully' })
  } catch (error) {
    console.error('Delete note error:', error)
    res.status(500).json({ success: false, message: 'Failed to delete note' })
  }
})

export { router as notesRouter } 