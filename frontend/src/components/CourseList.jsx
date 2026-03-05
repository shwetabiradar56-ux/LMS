import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const CourseList = () => {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState('all')

  useEffect(() => {
    fetchCourses()
  }, [])

  const fetchCourses = async () => {
    try {
      const response = await axios.get('/api/courses')
      setCourses(response.data)
      setLoading(false)
    } catch (err) {
      console.error('Error fetching courses:', err)
      // Mock data for demonstration
      setCourses([
        {
          id: 1,
          title: 'Complete Java Programming',
          description: 'Master Java from basics to advanced concepts',
          thumbnail: 'https://img.youtube.com/vi/RRubcjpTkks/maxresdefault.jpg',
          instructor_name: 'John Doe',
          category: 'java',
          total_lessons: 45,
          total_duration: '12 hours'
        },
        {
          id: 2,
          title: 'Python for Beginners',
          description: 'Learn Python programming from scratch',
          thumbnail: 'https://img.youtube.com/vi/_uQrJ0TkZlc/maxresdefault.jpg',
          instructor_name: 'Jane Smith',
          category: 'python',
          total_lessons: 38,
          total_duration: '10 hours'
        },
        {
          id: 3,
          title: 'Machine Learning A-Z',
          description: 'Complete ML course with hands-on projects',
          thumbnail: 'https://img.youtube.com/vi/GwIo9gDZCVQ/maxresdefault.jpg',
          instructor_name: 'Dr. Mike Wilson',
          category: 'ML',
          total_lessons: 52,
          total_duration: '15 hours'
        },
        {
          id: 4,
          title: 'Advanced Python',
          description: 'Deep dive into advanced Python concepts',
          thumbnail: 'https://img.youtube.com/vi/H1e7fIRutxk/maxresdefault.jpg',
          instructor_name: 'Jane Smith',
          category: 'python',
          total_lessons: 30,
          total_duration: '8 hours'
        }
      ])
      setLoading(false)
    }
  }

  const categories = ['all', 'java', 'python', 'ML']

  const filteredCourses = selectedCategory === 'all' 
    ? courses 
    : courses.filter(course => course.category === selectedCategory)

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Courses</h2>
        
        {/* Category Filter */}
        <div className="flex space-x-2 mb-6">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full capitalize ${
                selectedCategory === category
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {category === 'ML' ? 'Machine Learning' : category}
            </button>
          ))}
        </div>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map(course => (
          <div key={course.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <img 
              src={course.thumbnail} 
              alt={course.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {course.title}
              </h3>
              <p className="text-gray-600 text-sm mb-3">
                {course.description}
              </p>
              <div className="flex items-center text-sm text-gray-500 mb-3">
                <span className="mr-4">👨‍🏫 {course.instructor_name}</span>
                <span>📚 {course.total_lessons} lessons</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">
                  ⏱️ {course.total_duration}
                </span>
                <Link
                  to={`/course/${course.id}`}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 text-sm"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No courses found in this category.</p>
        </div>
      )}
    </div>
  )
}

export default CourseList
