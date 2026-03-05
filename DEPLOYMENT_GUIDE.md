# 🚀 LMS Application Deployment Guide

This guide covers deployment of the complete LMS application to various platforms.

---

## Table of Contents

1. [Production Build Setup](#production-build-setup)
2. [Deploy Frontend](#deploy-frontend)
3. [Deploy Backend](#deploy-backend)
4. [Database Setup](#database-setup)
5. [Environment Variables](#environment-variables)
6. [Common Issues & Solutions](#common-issues--solutions)

---

## Production Build Setup

### 1. Update API Configuration

The application now uses environment variables for API configuration:

**Frontend `.env` files:**

```bash
# frontend/.env (Development)
VITE_API_URL=http://localhost:5000/api

# frontend/.env.production (Production)
VITE_API_URL=https://your-backend-url.herokuapp.com/api
```

### 2. Build Frontend for Production

```bash
cd frontend
npm run build
```

This creates a `dist/` folder with optimized production files.

### 3. Test Production Build Locally

```bash
cd frontend
npm run preview
```

Opens at http://localhost:4173 (or similar)

---

## Deploy Frontend

### Option 1: Vercel (Recommended)

**Steps:**

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy from frontend folder:
```bash
cd frontend
vercel --prod
```

4. Set environment variable in Vercel dashboard:
   - Go to Project Settings → Environment Variables
   - Add: `VITE_API_URL` = `https://your-backend-url.com/api`

**Automatic Deployments:**
- Connect your GitHub repository
- Push to `main` branch for automatic deployments

### Option 2: Netlify

**Steps:**

1. Install Netlify CLI:
```bash
npm install -g netlify-cli
```

2. Build the project:
```bash
cd frontend
npm run build
```

3. Deploy:
```bash
netlify deploy --prod --dir=dist
```

4. Or drag and drop `dist/` folder to netlify.com

**netlify.toml configuration:**
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Option 3: GitHub Pages

**Steps:**

1. Update `vite.config.js`:
```javascript
export default defineConfig({
  base: '/LMS/', // Your repo name
  plugins: [react()],
  // ... rest of config
})
```

2. Install gh-pages:
```bash
npm install gh-pages --save-dev
```

3. Add deploy script to `package.json`:
```json
"scripts": {
  "deploy": "npm run build && gh-pages -d dist"
}
```

4. Deploy:
```bash
npm run deploy
```

**Note:** GitHub Pages is static only - you'll need to deploy backend separately.

---

## Deploy Backend

### Option 1: Railway (Recommended for PostgreSQL)

**Steps:**

1. Create account at https://railway.app

2. Create new project → Deploy from GitHub

3. Select your LMS repository

4. Add PostgreSQL database:
   - Click "New" → "Database" → "PostgreSQL"
   - Railway auto-generates `DATABASE_URL`

5. Set environment variables:
```bash
PORT=5000
JWT_SECRET=your-production-jwt-secret
DATABASE_URL=<from Railway Postgres>
NODE_ENV=production
```

6. Deploy! Railway automatically starts your app

### Option 2: Render

**Steps:**

1. Create account at https://render.com

2. Create New Web Service

3. Connect GitHub repository

4. Configure:
   - **Build Command:** `cd backend && npm install`
   - **Start Command:** `cd backend && npm start`

5. Add PostgreSQL database

6. Set environment variables:
```bash
PORT=5000
JWT_SECRET=your-secret-key
DATABASE_URL=postgresql://...
NODE_ENV=production
```

### Option 3: Heroku

**Steps:**

1. Install Heroku CLI

2. Login:
```bash
heroku login
```

3. Create app:
```bash
cd backend
heroku create lms-api
```

4. Add PostgreSQL:
```bash
heroku addons:create heroku-postgresql:hobby-dev
```

5. Set environment variables:
```bash
heroku config:set JWT_SECRET=your-secret-key
heroku config:set NODE_ENV=production
```

6. Deploy:
```bash
git push heroku main
```

### Option 4: Vercel (Serverless Functions)

**Note:** Requires restructuring backend as serverless functions.

Create `api/` folder in root with individual function files.

---

## Database Setup

### Using Railway PostgreSQL

1. Railway auto-provisions PostgreSQL
2. Copy `DATABASE_URL` from dashboard
3. Add to backend environment variables
4. Run migrations:
```bash
cd backend
npx prisma migrate deploy
npx prisma db seed
```

### Using Supabase (Free Tier)

1. Create account at https://supabase.com
2. Create new project
3. Get connection string from Settings → Database
4. Use as `DATABASE_URL` in backend

### Using Neon (Free Serverless Postgres)

1. Create account at https://neon.tech
2. Create new project
3. Copy connection string
4. Add to `DATABASE_URL`

---

## Environment Variables

### Frontend Environment Variables

**For Development (`frontend/.env`):**
```bash
VITE_API_URL=http://localhost:5000/api
```

**For Production (`frontend/.env.production`):**
```bash
VITE_API_URL=https://your-backend.railway.app/api
```

### Backend Environment Variables

**For Development (`backend/.env`):**
```bash
PORT=5000
JWT_SECRET=dev-secret-change-in-production
DATABASE_URL="postgresql://postgres:password@localhost:5432/lms_db?schema=public"
NODE_ENV=development
```

**For Production (set in hosting platform):**
```bash
PORT=5000
JWT_SECRET=<strong-random-secret>
DATABASE_URL=<from-hosting-provider>
NODE_ENV=production
```

---

## Common Issues & Solutions

### ❌ 404 Error on Frontend Routes

**Problem:** Refreshing page shows 404

**Solution:** Add redirect rules for SPA routing

**Netlify** (`netlify.toml`):
```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

**Vercel** (`vercel.json`):
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/" }]
}
```

**Apache** (`.htaccess`):
```apache
RewriteEngine On
RewriteBase /
RewriteRule ^ index.html [QSA,L]
```

### ❌ CORS Errors

**Problem:** Frontend can't connect to backend

**Solution:** Update CORS configuration in backend

In `backend/server.js`:
```javascript
app.use(cors({
  origin: 'https://your-frontend.vercel.app',
  credentials: true
}))
```

### ❌ API Connection Errors

**Problem:** Frontend can't reach backend API

**Solution:** 
1. Check `VITE_API_URL` is correct
2. Ensure backend is deployed and running
3. Check network tab in browser dev tools
4. Verify no typos in API URLs

### ❌ Database Connection Failed

**Problem:** Prisma can't connect to database

**Solution:**
1. Verify `DATABASE_URL` is correct
2. Ensure database is accessible
3. Run `npx prisma generate` after schema changes
4. For production: `npx prisma migrate deploy`

### ❌ Blank Page After Build

**Problem:** Production build shows blank page

**Solution:**
1. Check browser console for errors
2. Verify `base` path in `vite.config.js`
3. Ensure all environment variables are set
4. Try `npm run build` again

---

## Complete Deployment Checklist

### Before Deployment

- [ ] Update `VITE_API_URL` for production
- [ ] Change `JWT_SECRET` to strong random value
- [ ] Test production build locally
- [ ] Remove any console.logs with sensitive data
- [ ] Update CORS allowed origins

### During Deployment

- [ ] Set all environment variables
- [ ] Run database migrations
- [ ] Seed initial data
- [ ] Verify build completes successfully

### After Deployment

- [ ] Test user registration/login
- [ ] Test course browsing
- [ ] Test video playback
- [ ] Test progress tracking
- [ ] Check mobile responsiveness
- [ ] Monitor error logs
- [ ] Test with real users

---

## Quick Deploy Commands

### Frontend (Vercel)
```bash
cd frontend
vercel --prod
```

### Backend (Railway)
```bash
# Connect to GitHub and auto-deploy
# Just push to main branch
git push origin main
```

### Database Migrations
```bash
cd backend
npx prisma migrate deploy
npx prisma db seed
```

---

## Testing Deployment

1. **Visit Frontend URL**: Should load homepage
2. **Register Account**: Create new user
3. **Browse Courses**: View all courses
4. **Enroll in Course**: Test enrollment flow
5. **Watch Video**: Verify YouTube player works
6. **Complete Lesson**: Test progress tracking
7. **Refresh Page**: Ensure SPA routing works
8. **Check Mobile**: Test on phone/tablet

---

## Performance Optimization

### Frontend

- ✅ Code splitting (automatic with Vite)
- ✅ Lazy loading components
- ✅ Image optimization
- ✅ Minimize bundle size

### Backend

- ✅ Enable compression
- ✅ Database indexing
- ✅ Caching strategies
- ✅ Connection pooling

---

## Monitoring & Analytics

### Recommended Tools

- **Frontend**: Google Analytics, Plausible
- **Error Tracking**: Sentry, LogRocket
- **Performance**: Lighthouse, WebPageTest
- **Uptime**: UptimeRobot, Pingdom

---

## Support

For issues:
1. Check this guide first
2. Review error logs
3. Check environment variables
4. Test locally before deploying

---

**Happy Deploying! 🚀**

Your LMS is ready to go live!
