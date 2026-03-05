import express from 'express'
import { PrismaClient } from '@prisma/client'

const router = express.Router()
const prisma = new PrismaClient()

// Get user progress
router.get('/:userId', async (req, res) => {
  try {
    const progress = await prisma.progress.findMany({
      where: { userId: parseInt(req.params.userId) },
      include: {
        lesson: {
          include: {
            section: true,
          },
        },
      },
    })

    res.json(progress)
  } catch (error) {
    console.error('Error fetching progress:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch progress',
    })
  }
})

// Update/Create progress for a lesson
router.post('/', async (req, res) => {
  try {
    const { userId, lessonId, completed, lastWatchedPosition } = req.body

    const progress = await prisma.progress.upsert({
      where: {
        userId_lessonId: {
          userId: parseInt(userId),
          lessonId: parseInt(lessonId),
        },
      },
      update: {
        completed: completed !== undefined ? completed : false,
        completedAt: completed ? new Date() : null,
        lastWatchedPosition: lastWatchedPosition || 0,
      },
      create: {
        userId: parseInt(userId),
        lessonId: parseInt(lessonId),
        completed: completed || false,
        completedAt: completed ? new Date() : null,
        lastWatchedPosition: lastWatchedPosition || 0,
      },
    })

    res.json({
      success: true,
      message: 'Progress updated successfully',
      progress,
    })
  } catch (error) {
    console.error('Error updating progress:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to update progress',
    })
  }
})

// Mark lesson as complete
router.put('/:userId/:lessonId/complete', async (req, res) => {
  try {
    const progress = await prisma.progress.update({
      where: {
        userId_lessonId: {
          userId: parseInt(req.params.userId),
          lessonId: parseInt(req.params.lessonId),
        },
      },
      data: {
        completed: true,
        completedAt: new Date(),
      },
    })

    res.json({
      success: true,
      message: 'Lesson marked as complete',
      progress,
    })
  } catch (error) {
    console.error('Error marking lesson as complete:', error)
    
    // If record doesn't exist, create it
    if (error.code === 'P2025') {
      try {
        const progress = await prisma.progress.create({
          data: {
            userId: parseInt(req.params.userId),
            lessonId: parseInt(req.params.lessonId),
            completed: true,
            completedAt: new Date(),
          },
        })

        res.json({
          success: true,
          message: 'Lesson marked as complete',
          progress,
        })
      } catch (createError) {
        res.status(500).json({
          success: false,
          message: 'Failed to mark lesson as complete',
        })
      }
    } else {
      res.status(500).json({
        success: false,
        message: 'Failed to mark lesson as complete',
      })
    }
  }
})

export default router
