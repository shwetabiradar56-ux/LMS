# LMS Setup Guide - Quick Start

This guide will help you set up and run the Learning Management System on your local machine.

## Prerequisites

Before starting, ensure you have:
- ✅ Node.js (v16 or higher) installed
- ✅ PostgreSQL database server running
- ✅ npm package manager

## Step-by-Step Setup

### 1️⃣ Install Dependencies

#### Backend Dependencies
```bash
cd backend
npm install
```

#### Frontend Dependencies
```bash
cd frontend
npm install
```

### 2️⃣ Database Setup

#### Option A: Using Existing PostgreSQL

1. Create a new database:
```sql
CREATE DATABASE lms_db;
```

2. Update `backend/.env` with your database credentials:
```env
DATABASE_URL="postgresql://your_username:your_password@localhost:5432/lms_db?schema=public"
```

#### Option B: Using Docker for PostgreSQL (Recommended)

If you don't have PostgreSQL installed:

```bash
docker run --name lms-postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=lms_db -p 5432:5432 -d postgres
```

The default `.env` file is already configured for this setup.

### 3️⃣ Initialize Database

Run Prisma migrations to create tables:

```bash
cd backend
npx prisma migrate dev --name init
```

Seed the database with sample data:

```bash
npm run seed
```

This creates:
- ✅ Sample users (student & instructor accounts)
- ✅ 3 courses (Java, Python, Machine Learning)
- ✅ Course sections and lessons
- ✅ Sample enrollments

### 4️⃣ Run the Application

You'll need TWO terminal windows:

#### Terminal 1 - Backend Server
```bash
cd backend
npm run dev
```

✅ Backend running at: http://localhost:5000

#### Terminal 2 - Frontend Server
```bash
cd frontend
npm run dev
```

✅ Frontend running at: http://localhost:3000

### 5️⃣ Access the Application

Open your browser and navigate to: **http://localhost:3000**

## Demo Credentials

After seeding the database, use these credentials:

**Student Account:**
- Email: `student@example.com`
- Password: `password123`

**Instructor Account:**
- Email: `instructor@example.com`
- Password: `password123`

## Testing the Application

1. **Browse Courses**: Homepage shows all available courses
2. **Filter by Category**: Click Java, Python, or ML buttons
3. **View Course Details**: Click "View Details" on any course
4. **Enroll**: Click "Enroll Now" button
5. **Start Learning**: After enrollment, click "Start Learning"
6. **Watch Videos**: YouTube videos play in the learning page
7. **Track Progress**: Complete lessons and see progress update

## Troubleshooting

### ❌ Database Connection Error

**Problem:** Cannot connect to database

**Solution:**
1. Ensure PostgreSQL is running
2. Check DATABASE_URL in `backend/.env`
3. Verify database exists
4. Check username/password are correct

### ❌ Port Already in Use

**Problem:** EADDRINUSE error

**Solution:**
- Change PORT in `backend/.env` to another port (e.g., 5001)
- Update proxy in `frontend/vite.config.js` to match

### ❌ Module Not Found

**Problem:** Cannot find module errors

**Solution:**
```bash
# Reinstall dependencies
cd backend
rm -rf node_modules package-lock.json
npm install

cd ../frontend
rm -rf node_modules package-lock.json
npm install
```

### ❌ Prisma Client Not Generated

**Problem:** @prisma/client errors

**Solution:**
```bash
cd backend
npx prisma generate
```

## Project Structure Overview

```
LMS/
├── backend/           # Express API server
│   ├── prisma/       # Database schema
│   ├── routes/       # API endpoints
│   ├── middleware/   # Auth middleware
│   └── server.js     # Entry point
│
├── frontend/         # React application
│   └── src/
│       ├── components/  # UI components
│       ├── App.jsx      # Main app
│       └── main.jsx     # Entry point
│
└── README.md        # Documentation
```

## Development Tips

### Hot Reload
Both servers support hot reload:
- Backend: Uses nodemon (auto-restarts on changes)
- Frontend: Vite HMR (instant updates)

### API Testing
Test API endpoints directly:
- http://localhost:5000/api/health - Health check
- http://localhost:5000/api/courses - Get all courses

### Database GUI
Use Prisma Studio to view/edit database:
```bash
cd backend
npx prisma studio
```

Opens at: http://localhost:5555

## Next Steps

Once everything is running:

1. ✅ Explore the course catalog
2. ✅ Create an account or use demo credentials
3. ✅ Enroll in a course
4. ✅ Watch video lessons
5. ✅ Track your progress
6. ✅ Complete lessons and see statistics

## Need Help?

Check the main README.md for:
- Detailed API documentation
- Feature descriptions
- Architecture overview
- Future enhancements

---

**Happy Learning! 🎉**
