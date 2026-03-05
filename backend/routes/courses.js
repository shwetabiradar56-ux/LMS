import express from 'express'
import { PrismaClient } from '@prisma/client'

const router = express.Router()
const prisma = new PrismaClient()

// Get all courses
router.get('/', async (req, res) => {
  try {
    const { category } = req.query
    
    let where = {}
    if (category && category !== 'all') {
      where.category = category
    }

    const courses = await prisma.course.findMany({
      where,
      include: {
        sections: {
          include: {
            lessons: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    })

    res.json(courses)
  } catch (error) {
    console.error('Error fetching courses:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch courses',
    })
  }
})

// Get single course by ID
router.get('/:id', async (req, res) => {
  try {
    const course = await prisma.course.findUnique({
      where: { id: parseInt(req.params.id) },
      include: {
        sections: {
          include: {
            lessons: true,
          },
        },
      },
    })

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found',
      })
    }

    res.json(course)
  } catch (error) {
    console.error('Error fetching course:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch course',
    })
  }
})

// Create course (for instructors/admins)
router.post('/', async (req, res) => {
  try {
    const { title, description, thumbnail, instructorName, category, whatYouWillLearn } = req.body

    const course = await prisma.course.create({
      data: {
        title,
        description,
        thumbnail,
        instructorName,
        category,
        whatYouWillLearn,
      },
    })

    res.status(201).json({
      success: true,
      message: 'Course created successfully',
      course,
    })
  } catch (error) {
    console.error('Error creating course:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to create course',
    })
  }
})

export default router
