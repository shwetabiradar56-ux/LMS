import express from 'express'
import { PrismaClient } from '@prisma/client'

const router = express.Router()
const prisma = new PrismaClient()

// Get user enrollments
router.get('/user/:userId', async (req, res) => {
  try {
    const enrollments = await prisma.enrollment.findMany({
      where: { userId: parseInt(req.params.userId) },
      include: {
        course: {
          include: {
            sections: {
              include: {
                lessons: true,
              },
            },
          },
        },
      },
    })

    res.json(enrollments)
  } catch (error) {
    console.error('Error fetching enrollments:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch enrollments',
    })
  }
})

// Check if user is enrolled in a course
router.get('/check/:userId/:courseId', async (req, res) => {
  try {
    const enrollment = await prisma.enrollment.findUnique({
      where: {
        userId_courseId: {
          userId: parseInt(req.params.userId),
          courseId: parseInt(req.params.courseId),
        },
      },
    })

    res.json({
      enrolled: !!enrollment,
      enrollment,
    })
  } catch (error) {
    console.error('Error checking enrollment:', error)
    res.json({ enrolled: false })
  }
})

// Enroll user in course
router.post('/', async (req, res) => {
  try {
    const { userId, courseId } = req.body

    // Check if already enrolled
    const existingEnrollment = await prisma.enrollment.findUnique({
      where: {
        userId_courseId: {
          userId: parseInt(userId),
          courseId: parseInt(courseId),
        },
      },
    })

    if (existingEnrollment) {
      return res.status(400).json({
        success: false,
        message: 'User is already enrolled in this course',
      })
    }

    const enrollment = await prisma.enrollment.create({
      data: {
        userId: parseInt(userId),
        courseId: parseInt(courseId),
        status: 'active',
      },
    })

    res.status(201).json({
      success: true,
      message: 'Enrolled successfully',
      enrollment,
    })
  } catch (error) {
    console.error('Error enrolling user:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to enroll user',
    })
  }
})

export default router
