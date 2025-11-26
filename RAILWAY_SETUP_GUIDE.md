# 🚂 Railway Canvas Reset - Recovery Guide

## Problem
After resetting the Railway canvas, your backend and frontend services became ungrouped, causing connection issues between them.

## Quick Fix Checklist

### ✅ Step 1: Check Your Current Railway Services

1. Log in to [Railway](https://railway.app)
2. Open your AI Quest project
3. You should see these services:
   - **PostgreSQL Database**
   - **Backend Service** (Node.js)
   - **Frontend Service** (React)

If any are missing, you'll need to redeploy them (see detailed steps below).

---

## 🔧 Step 2: Regroup Services in Railway Canvas

### Option A: Create a New Group (Recommended)

1. In Railway dashboard, click **"Canvas"** view
2. Click **"Create Group"** button
3. Name it **"AI Quest"**
4. Drag all three services into the group:
   - PostgreSQL
   - Backend
   - Frontend

### Option B: Leave Ungrouped (Works fine too!)

Groups are just for visual organization. Your services will work fine without grouping.

---

## 🔐 Step 3: Configure Backend Environment Variables

### Required Variables

Go to **Backend Service** → **Variables** tab and ensure these are set:

```bash
# Database (should auto-populate from PostgreSQL service)
DATABASE_URL=${{Postgres.DATABASE_URL}}

# Claude API Key (get from console.anthropic.com)
CLAUDE_API_KEY=sk-ant-api03-xxxxxxxxxxxxx

# Admin password for admin panel
ADMIN_KEY=your_secret_admin_password

# Frontend URL for CORS (get from Step 4 - your frontend domain)
FRONTEND_URL=https://your-frontend-url.up.railway.app

# Node environment
NODE_ENV=production

# Port (auto-set by Railway)
PORT=${{PORT}}
```

**⚠️ Important:** The `FRONTEND_URL` variable should be set to your frontend's Railway domain (see Step 4 below for how to get this).

### How to Get Claude API Key:
1. Go to [console.anthropic.com](https://console.anthropic.com)
2. Sign in or create account
3. Navigate to **API Keys**
4. Click **"Create Key"**
5. Copy the key (starts with `sk-ant-api03-`)

---

## 🌐 Step 4: Get Backend URL

1. Go to **Backend Service** → **Settings** → **Networking**
2. If no domain exists:
   - Click **"Generate Domain"**
   - Railway will create a URL like: `your-app-name.up.railway.app`
3. **Copy this URL** - you'll need it for the frontend

**Example Backend URL:**
```
https://ai-quest-backend-production.up.railway.app
```

---

## 🎨 Step 5: Configure Frontend Environment Variables

Go to **Frontend Service** → **Variables** tab:

```bash
# Backend API URL (use the URL from Step 4 + /api)
REACT_APP_API_URL=https://your-backend-url.up.railway.app/api
```

**Example:**
```bash
REACT_APP_API_URL=https://ai-quest-backend-production.up.railway.app/api
```

⚠️ **Important:** Include `/api` at the end!

---

## 🔄 Step 6: Get Frontend URL and Update Backend

### Get Your Frontend URL

1. Go to **Frontend Service** → **Settings** → **Networking**
2. If no domain exists, click **"Generate Domain"**
3. Copy your frontend domain (e.g., `stunning-forgiveness-production-1b7c.up.railway.app`)

**Example Frontend URL:**
```
https://stunning-forgiveness-production-1b7c.up.railway.app
```

### Update Backend FRONTEND_URL Variable

Now that you have your frontend URL:

1. Go back to **Backend Service** → **Variables**
2. Update the `FRONTEND_URL` variable (from Step 3) with your actual frontend URL
3. The backend will automatically configure CORS to allow requests from this URL

**✅ No code changes needed!** The backend now uses the `FRONTEND_URL` environment variable for CORS configuration, making it easy to update when services are reconfigured.

**How it works:**
- The backend reads `FRONTEND_URL` from environment variables
- Automatically adds it to the list of allowed origins
- Falls back to a default URL if not set (for backwards compatibility)

---

## 🚀 Step 7: Redeploy Services

After updating environment variables:

1. **Backend Service:**
   - Click **"Deploy"** tab
   - Click **"Redeploy"** (or it may auto-deploy)
   - Wait for build to complete (green checkmark)

2. **Frontend Service:**
   - Click **"Deploy"** tab
   - Click **"Redeploy"**
   - Wait for build to complete (green checkmark)

---

## ✅ Step 8: Test Your Deployment

### 8.1 Test Backend
Visit: `https://your-backend-url.up.railway.app/api/health`

Expected response:
```json
{
  "status": "ok",
  "message": "AI Quest Server Running!"
}
```

### 8.2 Test Frontend
Visit: `https://your-frontend-url.up.railway.app`

You should see the AI Quest start screen.

### 8.3 Test Full Flow
1. Click **"Start New Game"**
2. Enter an email address
3. Choose a player mode
4. Try answering a question
5. Check if the score updates

If all of this works, **you're back in business!** 🎉

---

## 🐛 Troubleshooting

### Issue: "Failed to load content"

**Cause:** Frontend can't reach backend

**Fix:**
1. Check `REACT_APP_API_URL` is set correctly in frontend
2. Verify backend is deployed and running
3. Check browser console (F12) for CORS errors
4. Ensure backend URL includes `/api` at the end

### Issue: CORS Error in Browser Console

**Cause:** Backend CORS config doesn't include your frontend URL

**Fix:**
1. Check your frontend URL in Railway
2. Update `backend/server.js` line 15 with correct frontend URL
3. Redeploy backend

### Issue: C.H.A.T. Assistant Not Working

**Cause:** Missing or invalid Claude API key

**Fix:**
1. Verify `CLAUDE_API_KEY` is set in backend variables
2. Check key is valid at [console.anthropic.com](https://console.anthropic.com)
3. Ensure you have API credits
4. Check backend logs for Claude API errors

### Issue: Database Connection Errors

**Cause:** Missing or invalid `DATABASE_URL`

**Fix:**
1. In Railway, verify PostgreSQL service is running
2. Check `DATABASE_URL` variable in backend
3. It should be: `${{Postgres.DATABASE_URL}}`
4. Redeploy backend

### Issue: "Cannot POST /api/register"

**Cause:** Backend not receiving requests

**Fix:**
1. Verify backend is deployed and running (check health endpoint)
2. Check `REACT_APP_API_URL` doesn't have trailing slash
3. Open browser DevTools → Network tab to see actual request URL

---

## 📋 Service Configuration Summary

### Backend Service
- **Root Directory:** `/backend`
- **Build Command:** `npm install` (auto-detected)
- **Start Command:** `npm start` (auto-detected)
- **Environment Variables:**
  - `DATABASE_URL`
  - `CLAUDE_API_KEY`
  - `ADMIN_KEY`
  - `FRONTEND_URL`
  - `NODE_ENV`
  - `PORT`

### Frontend Service
- **Root Directory:** `/frontend`
- **Build Command:** `npm install && npm run build` (auto-detected)
- **Start Command:** `npx serve -s build -p $PORT` (auto-detected)
- **Environment Variables:**
  - `REACT_APP_API_URL`

### PostgreSQL Service
- **Type:** PostgreSQL (Railway managed)
- **Variables:** Auto-generated by Railway
- **Connected to:** Backend service via `DATABASE_URL`

---

## 🔗 Service Connections

```
┌─────────────────┐
│   PostgreSQL    │
│    Database     │
└────────┬────────┘
         │ DATABASE_URL
         ▼
┌─────────────────┐      API Calls       ┌─────────────────┐
│     Backend     │◄─────────────────────│    Frontend     │
│   (Node.js)     │                      │     (React)     │
└─────────────────┘                      └─────────────────┘
  Port: Auto            REACT_APP_API_URL      Port: Auto
```

---

## 💡 Pro Tips

1. **Environment Variables:** Changes to env vars require a redeploy
2. **Groups:** Purely cosmetic - services work the same ungrouped
3. **Logs:** Check Railway logs if something isn't working
4. **Health Check:** Always test `/api/health` endpoint first
5. **Browser Cache:** Hard refresh (Ctrl+Shift+R) if frontend seems stale

---

## 📞 Need More Help?

1. **Check Railway Logs:**
   - Click on service → **"Deploy"** tab → Click latest deployment
   - Scroll down to see build and runtime logs

2. **Check Browser Console:**
   - Press F12 in browser
   - Look for red error messages
   - Check Network tab for failed requests

3. **Common Error Patterns:**
   - `CORS error` → Update backend CORS config
   - `Failed to fetch` → Check `REACT_APP_API_URL`
   - `500 Internal Server Error` → Check backend logs
   - `Cannot connect to database` → Check `DATABASE_URL`

---

## ✨ You're All Set!

Once all services are deployed and configured, your AI Quest game should be fully functional again. The grouping in Railway canvas is just visual organization - your services will work whether they're grouped or not!

**Next Steps:**
1. Test the game thoroughly
2. Share the frontend URL with your team
3. Keep the admin password safe for verifying completion codes

🎮 **Ready Player 1? The quest continues!**
