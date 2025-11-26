# 🔍 Troubleshooting: No Questions Loading

## The Problem

Your frontend loads but no questions appear. This means the frontend can't fetch game content from the backend.

Looking at the code (`App.jsx` line 23-30), the frontend tries to load questions here:
```javascript
fetch(`${API_URL}/content/${playerData.mode}`)
```

---

## 🔎 Step-by-Step Diagnosis

### Step 1: Check Browser Console

**What to do:**
1. Open your frontend URL in a browser
2. Press **F12** to open Developer Tools
3. Click the **Console** tab
4. Start a new game and select a mode
5. Look for any error messages (they'll be in red)

**What to look for:**

❌ **If you see:** `Failed to load content: ...`
- This means the API call is failing

❌ **If you see:** `CORS error` or `blocked by CORS policy`
- The FRONTEND_URL variable is not set correctly in backend

❌ **If you see:** `Failed to fetch` or `Network error`
- Backend is not reachable at the REACT_APP_API_URL

❌ **If you see:** `404 Not Found`
- The API endpoint doesn't exist or backend isn't running

**Screenshot the console and let me know what you see!**

---

### Step 2: Check Network Tab

1. In Developer Tools, click the **Network** tab
2. Refresh the page
3. Start a new game and select a mode
4. Look for a request to `/content/player1` or `/content/player2`

**What to check:**

1. **Does the request appear?**
   - If NO: Frontend isn't making the request (JavaScript error)
   - If YES: Continue...

2. **Click on the request and check:**
   - **Request URL:** Should be like `https://your-backend.up.railway.app/api/content/player1`
   - **Status Code:**
     - `200 OK` = Success (but gameContent might be empty)
     - `404` = Backend endpoint not found
     - `500` = Backend error
     - `0` or `failed` = Can't reach backend or CORS issue

3. **Click "Response" tab:**
   - What data is returned?
   - Is it empty `{}`?
   - Is it an error message?

---

### Step 3: Test Backend Directly

**Test the health endpoint:**

Open a new browser tab and visit:
```
https://your-backend-url.up.railway.app/api/health
```

**Expected response:**
```json
{
  "status": "ok",
  "message": "AI Quest Server Running!"
}
```

✅ **If you see this:** Backend is running!
❌ **If you see an error or nothing:** Backend is not deployed or not accessible

**Test the content endpoint:**

Visit:
```
https://your-backend-url.up.railway.app/api/content/player1
```

**Expected response:**
Should return JSON with rooms and questions like:
```json
{
  "rooms": [...],
  "questions": [...],
  "dialogue": {...}
}
```

✅ **If you see this:** Backend is working correctly!
❌ **If you see an error:** There's a backend issue

---

### Step 4: Verify Environment Variables in Railway

**Backend Service → Variables:**

Check these are set:
```bash
✓ DATABASE_URL=${{Postgres.DATABASE_URL}}
✓ CLAUDE_API_KEY=sk-ant-api03-...
✓ ADMIN_KEY=your_password
✓ FRONTEND_URL=https://your-actual-frontend-url.up.railway.app
✓ NODE_ENV=production
```

**Important:** `FRONTEND_URL` should be your EXACT frontend URL from Railway.

**Frontend Service → Variables:**

Check this is set:
```bash
✓ REACT_APP_API_URL=https://your-actual-backend-url.up.railway.app/api
```

**Important:** Must end with `/api` and be your EXACT backend URL.

---

### Step 5: Check Railway Deployment Logs

**Backend Logs:**

1. Go to Railway → **Backend Service** → **Deployments**
2. Click on the latest deployment
3. Scroll down to see logs
4. Look for:
   - ✅ `Server running on port...`
   - ❌ Any error messages in red
   - ❌ Database connection errors

**Frontend Logs:**

1. Go to Railway → **Frontend Service** → **Deployments**
2. Click on the latest deployment
3. Look for:
   - ✅ `Serving!`
   - ✅ Build completed successfully
   - ❌ Any error messages

**Screenshot any errors you see!**

---

## 🛠️ Common Fixes

### Fix 1: REACT_APP_API_URL is Wrong

**Problem:** Frontend is trying to reach the wrong backend URL

**Solution:**
1. Get your actual backend URL from Railway → Backend Service → Settings → Networking
2. Update Frontend Service → Variables → `REACT_APP_API_URL`
3. Must be: `https://your-backend.up.railway.app/api` (with `/api` at end!)
4. Redeploy frontend

### Fix 2: FRONTEND_URL is Wrong (CORS)

**Problem:** Backend is blocking requests from frontend

**Solution:**
1. Get your actual frontend URL from Railway → Frontend Service → Settings → Networking
2. Update Backend Service → Variables → `FRONTEND_URL`
3. Must be: `https://your-frontend.up.railway.app` (full URL with https://)
4. Redeploy backend

### Fix 3: Backend Not Running

**Problem:** Backend service crashed or didn't deploy

**Solution:**
1. Check Railway → Backend Service → Deployments
2. Look for green checkmark (deployed)
3. If red X, click to see error logs
4. Fix any errors and redeploy

### Fix 4: Database Not Connected

**Problem:** Backend can't connect to PostgreSQL

**Solution:**
1. Check Railway → PostgreSQL service is running
2. Backend → Variables → `DATABASE_URL` is set to `${{Postgres.DATABASE_URL}}`
3. Redeploy backend

---

## 📋 Quick Checklist

Run through this checklist:

- [ ] Frontend URL exists and loads the start screen
- [ ] Backend URL + `/api/health` returns `{"status":"ok"}`
- [ ] Backend URL + `/api/content/player1` returns JSON data
- [ ] `REACT_APP_API_URL` in frontend = your backend URL + `/api`
- [ ] `FRONTEND_URL` in backend = your frontend URL
- [ ] Both services show green checkmarks in Railway
- [ ] Browser console shows no errors
- [ ] Network tab shows successful requests

---

## 📞 Next Steps

**Please provide me with:**

1. **What errors do you see in the browser console?** (Press F12)
2. **What happens when you visit:** `https://your-backend-url.up.railway.app/api/health`
3. **Screenshots of:**
   - Browser console errors
   - Network tab showing the failed request
   - Railway backend logs (if there are errors)

With this information, I can pinpoint the exact issue and fix it!

---

## 🎯 Most Likely Issue

Based on your description, the most likely issues are:

1. **REACT_APP_API_URL is not set correctly** in the frontend service
2. **CORS issue** - FRONTEND_URL not set in backend service
3. **Backend not redeployed** after setting environment variables

**Did you redeploy BOTH services after setting the environment variables?** Environment variable changes don't take effect until you redeploy!
