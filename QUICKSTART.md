# 🚀 Quick Start Guide - LMS Application

## Current Status

✅ **Frontend**: Running on http://localhost:3000  
✅ **Backend**: Running on http://localhost:5000

## Using the Application NOW (Without Database)

The application is configured with **mock data** and will work immediately for testing purposes!

### Steps to Test:

1. **Open the Application**
   - Click the preview button or navigate to: http://localhost:3000

2. **Browse Courses**
   - You'll see 4 sample courses: Java, Python, and Machine Learning
   - Filter by category using the buttons at the top

3. **View Course Details**
   - Click "View Details" on any course
   - See course description, what you'll learn, and lesson list

4. **Login/Register**
   - Click "Login" in the navigation
   - Use ANY email and password (mock authentication)
   - Example: `student@example.com` / `password123`

5. **Enroll in a Course**
   - Go back to course details
   - Click "Enroll Now"
   - Button changes to "Start Learning"

6. **Start Learning**
   - Click "Start Learning"
   - YouTube video plays in embedded player
   - Navigate between lessons
   - Mark lessons as complete
   - Track your progress

## Features Working Out-of-the-Box

✅ Course browsing with category filter  
✅ Course details view  
✅ Mock authentication (any credentials work)  
✅ Course enrollment  
✅ YouTube video playback  
✅ Lesson navigation (Previous/Next)  
✅ Progress tracking (visual)  
✅ Responsive design  

## Setting Up Full Backend (Optional - For Production)

To enable full database functionality:

### 1. Install PostgreSQL

**Option A: Docker (Recommended)**
```bash
docker run --name lms-postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=lms_db -p 5432:5432 -d postgres
```

**Option B: Local Installation**
- Download from: https://www.postgresql.org/download/
- Create database: `CREATE DATABASE lms_db;`

### 2. Configure Database Connection

Update `backend/.env`:
```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/lms_db?schema=public"
```

### 3. Run Migrations & Seed Data

```bash
cd backend
npx prisma migrate dev --name init
npm run seed
```

This creates:
- Real user accounts
- Persistent courses and lessons
- Actual enrollments
- Saved progress

### 4. Restart Backend

Stop the current backend (Ctrl+C) and restart:
```bash
cd backend
npm run dev
```

## Testing Checklist

### Without Database (Current Setup)
- [x] Frontend loads successfully
- [x] Courses display with mock data
- [x] Category filtering works
- [x] Course details page loads
- [x] Login accepts any credentials
- [x] Can enroll in courses
- [x] YouTube videos play
- [x] Lesson navigation works
- [x] Progress bar updates visually
- [ ] Progress doesn't persist (requires database)

### With Database (After Setup)
- [ ] Real user registration/login
- [ ] Persistent enrollments
- [ ] Saved progress across sessions
- [ ] All features fully functional

## Demo Credentials (Mock Mode)

Any email/password combination works, but recommended:
- Email: `student@example.com`
- Password: `password123`

## Demo Credentials (Database Mode)

After running `npm run seed`:
- Email: `student@example.com`
- Password: `password123`

## Common Issues & Solutions

### Issue: Backend API Errors in Console

**Cause**: Backend not running or database not connected

**Solution**: 
1. Check backend is running on http://localhost:5000
2. The app uses mock data if API fails
3. To use real database, follow setup steps above

### Issue: Videos Not Loading

**Cause**: Internet connection or YouTube restrictions

**Solution**:
1. Check internet connection
2. Try different browser
3. Clear browser cache

### Issue: Navigation Not Working

**Cause**: React Router issue

**Solution**:
1. Refresh the page
2. Clear browser cache
3. Restart frontend server

## API Endpoints (For Developers)

Test these in browser or Postman:

```
GET  http://localhost:5000/api/health
GET  http://localhost:5000/api/courses
GET  http://localhost:5000/api/courses/1
POST http://localhost:5000/api/auth/login
POST http://localhost:5000/api/auth/register
```

## Project Files Overview

```
LMS/
├── frontend/              # React App
│   ├── src/
│   │   ├── components/   # All UI components
│   │   ├── App.jsx       # Main app component
│   │   └── main.jsx      # Entry point
│   └── package.json
│
├── backend/              # Express API
│   ├── routes/          # API endpoints
│   ├── middleware/      # Auth middleware
│   ├── prisma/          # Database schema
│   └── server.js        # Entry point
│
└── Documentation files
```

## Next Steps

1. ✅ Test all features in mock mode
2. ⚙️ Set up PostgreSQL for production use
3. 🎨 Customize styling in TailwindCSS
4. 📝 Add more courses to seed data
5. 🔧 Extend API endpoints as needed
6. 🚀 Deploy to production server

## Support

For detailed documentation, see:
- `README.md` - Complete project documentation
- `SETUP_GUIDE.md` - Detailed setup instructions

---

**Enjoy your LMS! 🎉**

The application is ready to use with mock data. Set up the database when you're ready for production features.
