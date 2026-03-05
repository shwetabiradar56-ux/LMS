import express from 'express'
import { PrismaClient } from '@prisma/client'

const router = express.Router()
const prisma = new PrismaClient()

// Get sections for a course
router.get('/course/:courseId', async (req, res) => {
  try {
    const sections = await prisma.section.findMany({
      where: { courseId: parseInt(req.params.courseId) },
      include: {
        lessons: true,
      },
      orderBy: { order: 'asc' },
    })

    res.json(sections)
  } catch (error) {
    console.error('Error fetching sections:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch sections',
    })
  }
})

// Create section
router.post('/', async (req, res) => {
  try {
    const { title, courseId, order } = req.body

    const section = await prisma.section.create({
      data: {
        title,
        courseId: parseInt(courseId),
        order: order || 0,
      },
    })

    res.status(201).json({
      success: true,
      message: 'Section created successfully',
      section,
    })
  } catch (error) {
    console.error('Error creating section:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to create section',
    })
  }
})

export default router
