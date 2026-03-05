# Learning Management System (LMS)

A full-stack Learning Management System built with React, Node.js, Express, and PostgreSQL. This platform allows students to browse courses, enroll, and track their progress while watching YouTube video lessons.

## Features

### Student Features
- 📚 Browse courses by category (Java, Python, Machine Learning, etc.)
- 🎥 Watch YouTube embedded video lessons
- ✅ Track progress with completion percentage
- 📝 View course details, descriptions, and curriculum
- 🎯 Resume from last watched lesson
- ⏭️ Navigate between lessons easily

### Technical Features
- JWT-based authentication and authorization
- RESTful API architecture
- PostgreSQL database with Prisma ORM
- Responsive UI with TailwindCSS
- Real-time progress tracking
- YouTube iframe integration

## Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool
- **React Router** - Routing
- **Axios** - HTTP client
- **TailwindCSS** - Styling

### Backend
- **Node.js** - Runtime
- **Express** - Web framework
- **Prisma** - Database ORM
- **PostgreSQL** - Database
- **JWT** - Authentication
- **bcryptjs** - Password hashing

## Project Structure

```
LMS/
├── frontend/              # React frontend application
│   ├── src/
│   │   ├── components/   # React components
│   │   │   ├── CourseList.jsx
│   │   │   ├── CourseDetails.jsx
│   │   │   ├── LearningPage.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
├── backend/              # Node.js backend API
│   ├── prisma/          # Database schema and seed file
│   ├── routes/          # API routes
│   │   ├── auth.js
│   │   ├── courses.js
│   │   ├── enrollments.js
│   │   ├── progress.js
│   │   └── sections.js
│   ├── middleware/      # Custom middleware
│   │   └── auth.js
│   ├── server.js        # Entry point
│   └── package.json
│
└── README.md
```

## Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

### Step 1: Clone and Install Dependencies

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### Step 2: Database Setup

1. Create a PostgreSQL database named `lms_db`
2. Update the database connection string in `backend/.env`:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/lms_db?schema=public"
```

3. Run Prisma migrations:

```bash
cd backend
npx prisma migrate dev --name init
```

4. Seed the database with sample data:

```bash
npm run seed
```

This creates:
- Sample users (student and instructor)
- Sample courses (Java, Python, ML)
- Course sections and lessons
- Sample enrollments

### Step 3: Configure Environment Variables

The backend `.env` file is already configured with default values. Update if needed:

```env
PORT=5000
JWT_SECRET=your-secret-key-change-in-production
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/lms_db?schema=public"
NODE_ENV=development
```

### Step 4: Run the Application

#### Start Backend Server

```bash
cd backend
npm run dev
```

Server runs on: http://localhost:5000

#### Start Frontend Development Server

Open a new terminal:

```bash
cd frontend
npm run dev
```

Frontend runs on: http://localhost:3000

## Usage

### Demo Credentials

After seeding the database:

**Student Account:**
- Email: `student@example.com`
- Password: `password123`

**Instructor Account:**
- Email: `instructor@example.com`
- Password: `password123`

### User Flow

1. **Browse Courses**: Visit the homepage to see all available courses
2. **Register/Login**: Create an account or login with demo credentials
3. **View Course Details**: Click on any course to see detailed information
4. **Enroll**: Click "Enroll Now" to enroll in a course
5. **Start Learning**: Access the learning page with video player
6. **Track Progress**: Complete lessons and watch your progress update

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Courses
- `GET /api/courses` - Get all courses
- `GET /api/courses/:id` - Get single course
- `POST /api/courses` - Create course (instructor/admin only)

### Sections
- `GET /api/sections/course/:courseId` - Get course sections
- `POST /api/sections` - Create section

### Enrollments
- `GET /api/enrollments/user/:userId` - Get user enrollments
- `GET /api/enrollments/check/:userId/:courseId` - Check enrollment status
- `POST /api/enrollments` - Enroll in course

### Progress
- `GET /api/progress/:userId` - Get user progress
- `POST /api/progress` - Update/create progress
- `PUT /api/progress/:userId/:lessonId/complete` - Mark lesson complete

## Database Schema

The application uses the following main entities:

- **Users** - Students, instructors, and admins
- **Courses** - Course information and metadata
- **Sections** - Course sections/modules
- **Lessons** - Individual video lessons
- **Enrollments** - User-course enrollments
- **Progress** - Lesson completion tracking

## Troubleshooting

### Common Issues

**Database Connection Error:**
- Ensure PostgreSQL is running
- Verify DATABASE_URL in .env file
- Check database exists

**Port Already in Use:**
- Change PORT in backend/.env
- Update frontend proxy in vite.config.js

**Module Not Found:**
- Run `npm install` in both frontend and backend directories

## Future Enhancements

- [ ] Video playback position tracking
- [ ] Quiz and assignments
- [ ] Discussion forums
- [ ] Certificate generation
- [ ] Payment integration
- [ ] Admin dashboard
- [ ] Course reviews and ratings
- [ ] Search functionality

## License

MIT License - feel free to use this project for learning purposes.

## Support

For issues or questions, please create an issue in the repository.
