# ✅ Quick Fix Checklist - Railway Canvas Reset

## Issue
After resetting Railway canvas, backend and frontend are ungrouped and not communicating.

---

## 5-Minute Fix

### 1️⃣ Get Your URLs

**Backend URL:**
- Go to Railway → Backend Service → Settings → Networking
- Generate domain if needed
- Copy URL (e.g., `https://ai-quest-backend.up.railway.app`)

**Frontend URL:**
- Go to Railway → Frontend Service → Settings → Networking
- Generate domain if needed
- Copy URL (e.g., `https://stunning-forgiveness-production-1b7c.up.railway.app`)

---

### 2️⃣ Set Backend Environment Variables

Go to: **Backend Service → Variables**

```bash
✅ DATABASE_URL=${{Postgres.DATABASE_URL}}
✅ CLAUDE_API_KEY=sk-ant-api03-xxxxxxxxxxxxx
✅ ADMIN_KEY=your_secret_password
✅ NODE_ENV=production
✅ FRONTEND_URL=https://your-frontend-url.up.railway.app
```

**New! FRONTEND_URL variable:**
- Paste your frontend URL from step 1
- This fixes CORS issues automatically
- Include `https://` prefix

---

### 3️⃣ Set Frontend Environment Variables

Go to: **Frontend Service → Variables**

```bash
✅ REACT_APP_API_URL=https://your-backend-url.up.railway.app/api
```

**Important:**
- Use your backend URL from step 1
- Add `/api` at the end
- Include `https://` prefix

---

### 4️⃣ Redeploy Both Services

1. Backend Service → Deploy → Redeploy
2. Frontend Service → Deploy → Redeploy
3. Wait for green checkmarks ✓

---

### 5️⃣ Test

**Backend health check:**
```
https://your-backend-url.up.railway.app/api/health
```

Expected: `{"status":"ok","message":"AI Quest Server Running!"}`

**Frontend:**
```
https://your-frontend-url.up.railway.app
```

Expected: AI Quest start screen

**Full test:**
1. Start new game
2. Enter email
3. Choose mode
4. Answer a question
5. Score updates? ✅ You're done!

---

## 🐛 Still Not Working?

### CORS Error
- Check `FRONTEND_URL` is set in backend
- Verify URL includes `https://`
- Redeploy backend

### "Failed to load content"
- Check `REACT_APP_API_URL` in frontend
- Verify it ends with `/api`
- Redeploy frontend

### Database errors
- Verify PostgreSQL service is running
- Check `DATABASE_URL=${{Postgres.DATABASE_URL}}`
- Redeploy backend

### C.H.A.T. not working
- Check `CLAUDE_API_KEY` in backend
- Verify key at console.anthropic.com
- Check API credits

---

## 📋 Environment Variables Summary

| Service | Variable | Example Value |
|---------|----------|---------------|
| **Backend** | DATABASE_URL | `${{Postgres.DATABASE_URL}}` |
| **Backend** | CLAUDE_API_KEY | `sk-ant-api03-xxxxx` |
| **Backend** | ADMIN_KEY | `your_secret_password` |
| **Backend** | NODE_ENV | `production` |
| **Backend** | FRONTEND_URL | `https://your-frontend.up.railway.app` |
| **Frontend** | REACT_APP_API_URL | `https://your-backend.up.railway.app/api` |

---

## 💡 Pro Tips

- **Groups are optional** - Services work fine ungrouped
- **Environment variables** require a redeploy to take effect
- **Check logs** if something fails - Railway Deploy tab
- **Hard refresh** browser (Ctrl+Shift+R) if frontend seems cached

---

## 🔗 Detailed Guide

For complete instructions, see `RAILWAY_SETUP_GUIDE.md`

---

**Total time: ~5 minutes** ⏱️

Once all variables are set and services redeployed, everything should work perfectly!
