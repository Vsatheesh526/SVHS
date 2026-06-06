# Deployment Guide: Vercel + Render + Railway

This guide walks you through deploying the school website to production.

---

## 1. Backend (Express) → Render

### 1.1 Prepare Backend for Deployment

**Test build locally:**
```bash
cd backend
npm start
```
Verify it runs on `http://localhost:5000` and shows health check at `/api/health`.

**Create production `.env`:**
Copy `backend/.env.example` to `backend/.env.production`:
```env
DB_HOST=your-railway-mysql-host
DB_PORT=3306
DB_USER=your-railway-user
DB_PASSWORD=your-railway-password
DB_NAME=railway
JWT_SECRET=generate-a-long-random-string-with-openssl-rand--base64-32
PORT=5000
CORS_ORIGIN=https://your-vercel-frontend.vercel.app
```

### 1.2 Set Up Railway MySQL Database

1. Go to [railway.app](https://railway.app)
2. Create new project → Add MySQL service
3. Wait for MySQL to provision
4. Open the MySQL service and copy these env vars:
   - `MYSQL_HOST`
   - `MYSQL_PORT`
   - `MYSQL_USER`
   - `MYSQL_PASSWORD`
   - `MYSQL_DB`

### 1.3 Deploy Backend to Render

1. Push your code to GitHub (if not already)
2. Go to [render.com](https://render.com)
3. Create new Web Service
4. Connect your GitHub repo (select the repo)
5. **Service name:** `school-backend`
6. **Build command:** `npm install && npm run seed`
7. **Start command:** `npm start`
8. **Environment variables:** Add from Railway:
   ```
   DB_HOST = (from Railway MYSQL_HOST)
   DB_PORT = 3306
   DB_USER = (from Railway MYSQL_USER)
   DB_PASSWORD = (from Railway MYSQL_PASSWORD)
   DB_NAME = (from Railway MYSQL_DB)
   JWT_SECRET = (generate with: openssl rand -base64 32)
   CORS_ORIGIN = https://your-vercel-frontend.vercel.app
   ```
9. **Region:** Choose closest to your users
10. Click **Deploy**

**Save your Render backend URL:** It will be something like `https://school-backend.onrender.com`

---

## 2. Database (MySQL) → Railway

### Already done in step 1.2! ✅

The Railway MySQL database is now connected to your Render backend.

**To verify connection:**
- Go to Render → your backend service → Logs
- Look for: `✅ Database connected` or similar messages
- If you see connection errors, check DB credentials in environment variables

---

## 3. Frontend (React + Vite) → Vercel

### 3.1 Prepare Frontend for Deployment

**Update API URL:**

Create or update `frontend/.env.production`:
```env
VITE_API_URL=https://school-backend.onrender.com/api
```

**Test build locally:**
```bash
cd frontend
npm run build
npm run preview
```

Open browser to `http://localhost:4173` and test the site works.

### 3.2 Deploy Frontend to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Import project from GitHub
3. **Framework preset:** Vite
4. **Build command:** `npm run build`
5. **Output directory:** `dist`
6. **Environment variables:**
   ```
   VITE_API_URL = https://school-backend.onrender.com/api
   ```
7. Click **Deploy**

**Save your Vercel frontend URL:** It will be something like `https://school-website.vercel.app`

---

## 4. Update CORS on Render Backend

Now that you have the Vercel URL, go back to Render:

1. Backend service settings → Environment
2. Update `CORS_ORIGIN` to your Vercel URL:
   ```
   CORS_ORIGIN = https://school-website.vercel.app
   ```
3. Redeploy (it will auto-redeploy after env change)

---

## 5. Verify Everything Works

### 5.1 Test Backend
```bash
curl https://school-backend.onrender.com/api/health
# Should return: {"status":"ok"}
```

### 5.2 Test Frontend
- Visit `https://school-website.vercel.app`
- Check Contact page loads with map
- Submit contact form
- Admin login and check if data loads

### 5.3 Check Browser Console
- Open DevTools (F12)
- Check for CORS errors
- Check for API 404 errors

---

## 6. Troubleshooting

### Frontend shows 404 errors or blank pages
- Check `VITE_API_URL` in Vercel environment variables
- Check CORS_ORIGIN in Render matches your Vercel URL exactly

### Can't connect to database on Render
- Verify Railway MySQL is still running
- Check all DB credentials in Render environment variables
- Check backend logs on Render for connection errors

### Contact form not working
- Check browser console for API errors
- Verify backend is running on Render
- Verify CORS_ORIGIN is set correctly

### Map not loading
- Ensure you're using an embeddable Google Maps URL (not a share link)
- Check admin Contact Info manager has a valid map URL

---

## 7. Database Backups

### Railway MySQL Backups
- Railway provides automatic backups
- Go to Railway dashboard → MySQL service → Settings
- Backups are kept for 7 days (paid plans: longer)

### Manual Backup (Optional)
```bash
mysqldump -h your-railway-host -u your-user -p your-db > backup.sql
```

---

## 8. Environment Variables Summary

### Backend (Render)
```
DB_HOST          → from Railway MYSQL_HOST
DB_PORT          → 3306
DB_USER          → from Railway MYSQL_USER
DB_PASSWORD      → from Railway MYSQL_PASSWORD
DB_NAME          → from Railway MYSQL_DB
JWT_SECRET       → generate new (openssl rand -base64 32)
CORS_ORIGIN      → https://school-website.vercel.app
PORT             → 5000
```

### Frontend (Vercel)
```
VITE_API_URL     → https://school-backend.onrender.com/api
```

---

## 9. Quick Checklist

- [ ] Railway MySQL created and running
- [ ] Backend pushed to GitHub
- [ ] Backend deployed to Render with all DB env vars
- [ ] Backend health check works
- [ ] Frontend build test passed locally
- [ ] Frontend deployed to Vercel with VITE_API_URL set
- [ ] CORS_ORIGIN updated on Render to match Vercel URL
- [ ] Frontend can reach backend API
- [ ] Contact form works end-to-end
- [ ] Admin login works
- [ ] Database operations (create, read, update) work

---

## 10. Costs

| Service | Plan | Price |
|---------|------|-------|
| Railway MySQL | Free | $5/month |
| Render Web Service | Free | $0 (sleeps after 15 min) |
| Render Web Service | Paid | $7/month (always on) |
| Vercel Frontend | Free | $0 |
| **Total** | **Recommended** | **~$12/month** |

**Recommendation:**
- For a school website with low traffic → use Render Free tier
- For production with 24/7 uptime → upgrade Render to Paid ($7/month)

---

## 11. After Deployment

### Monitor Performance
- Render Logs: `https://render.com` → your service → Logs
- Vercel Analytics: `https://vercel.com` → your project → Analytics
- Railway Metrics: Check CPU/memory usage

### Update Production Code
1. Push changes to GitHub
2. Render auto-deploys from main/master branch
3. Vercel auto-deploys from main/master branch

### Database Maintenance
- Railway: Monitor disk usage, set backups retention
- Seed data: SSH into Render and run `npm run seed` if needed

---

Done! 🚀 Your school website is now live!
