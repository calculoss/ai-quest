# 🚀 Deployment Guide: AI Quest to Railway

This guide will walk you through deploying AI Quest to Railway step-by-step.

## Prerequisites

- [ ] GitHub account
- [ ] Railway account (free tier is fine)
- [ ] Claude API key from console.anthropic.com
- [ ] 30 minutes of time

## Step-by-Step Deployment

### Part 1: Get Your Claude API Key (5 minutes)

1. Go to [console.anthropic.com](https://console.anthropic.com)
2. Sign up or log in
3. Click on "API Keys" in the sidebar
4. Click "Create Key"
5. Name it "AI Quest"
6. Copy the key (starts with `sk-ant-api03-...`)
7. **Save this somewhere safe - you'll need it later!**

### Part 2: Push Code to GitHub (10 minutes)

1. Create a new repository on GitHub:
   - Go to [github.com/new](https://github.com/new)
   - Name it `ai-quest`
   - Make it Public or Private (your choice)
   - Don't initialize with README (we already have one)
   - Click "Create repository"

2. On your computer, open Terminal/Command Prompt

3. Navigate to the ai-quest folder:
   ```bash
   cd /path/to/ai-quest
   ```

4. Initialize git and push:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: AI Quest game"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/ai-quest.git
   git push -u origin main
   ```

### Part 3: Deploy Backend to Railway (10 minutes)

1. **Create Railway Account:**
   - Go to [railway.app](https://railway.app)
   - Click "Login with GitHub"
   - Authorize Railway

2. **Create New Project:**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your `ai-quest` repository
   - Railway will scan and find two services (backend and frontend)

3. **Set Up PostgreSQL Database:**
   - In your project, click "New"
   - Select "Database" → "Add PostgreSQL"
   - Railway automatically creates the database and connects it

4. **Configure Backend Service:**
   - Click on the backend service
   - Go to "Variables" tab
   - Add these environment variables:

   ```
   CLAUDE_API_KEY = your-claude-api-key-here
   ADMIN_KEY = choose-a-strong-password
   NODE_ENV = production
   ```

   Note: `DATABASE_URL` and `PORT` are automatically set by Railway

5. **Deploy Backend:**
   - Go to "Settings" tab
   - Under "Root Directory", enter: `/backend`
   - Click "Deploy"
   - Wait for deployment to complete (2-3 minutes)

6. **Generate Public URL:**
   - Go to "Settings" tab
   - Scroll to "Networking"
   - Click "Generate Domain"
   - Copy the URL (e.g., `ai-quest-backend.up.railway.app`)
   - **Save this URL - you'll need it for the frontend!**

### Part 4: Deploy Frontend to Railway (10 minutes)

1. **Add Frontend Service:**
   - In your Railway project, click "New"
   - Select "GitHub Repo"
   - Choose your `ai-quest` repository again
   - This creates a second service

2. **Configure Frontend Service:**
   - Click on the new service
   - Go to "Variables" tab
   - Add this environment variable:

   ```
   REACT_APP_API_URL = https://YOUR-BACKEND-URL.up.railway.app/api
   ```

   (Replace with your actual backend URL from Step 3.6)

3. **Set Frontend Settings:**
   - Go to "Settings" tab
   - Under "Root Directory", enter: `/frontend`
   - Click "Deploy"
   - Wait for build and deployment (3-5 minutes)

4. **Generate Public URL:**
   - Go to "Settings" tab
   - Scroll to "Networking"
   - Click "Generate Domain"
   - Copy this URL - **this is your game's URL!**

### Part 5: Test Your Deployment (5 minutes)

1. **Open your frontend URL**
   - You should see the AI Quest start screen!

2. **Test registration:**
   - Click "PRESS START"
   - Enter an email
   - Select a mode
   - You should see your 4-digit code

3. **Test gameplay:**
   - Answer a question
   - Try using C.H.A.T. assistant
   - The responses should come from Claude!

4. **Test progress saving:**
   - Note your 4-digit code
   - Close the browser
   - Go back to the game
   - Click "CONTINUE QUEST"
   - Enter your email and code
   - Your progress should be restored!

5. **Check leaderboard:**
   - Complete the game (or skip to end for testing)
   - View the leaderboard
   - Your score should appear!

## Troubleshooting

### Backend Issues

**Problem:** Backend won't start
- **Check:** Railway logs (click service → "Deployments" → View logs)
- **Fix:** Ensure all environment variables are set correctly

**Problem:** Database connection errors
- **Check:** PostgreSQL service is running in Railway
- **Fix:** Redeploy backend service

### Frontend Issues

**Problem:** Can't connect to backend
- **Check:** `REACT_APP_API_URL` includes `/api` at the end
- **Fix:** Update variable and redeploy frontend

**Problem:** Build fails
- **Check:** Railway build logs
- **Fix:** Usually a missing dependency - push fix to GitHub

### C.H.A.T. Issues

**Problem:** C.H.A.T. not responding
- **Check:** Claude API key is correct
- **Fix:** Update `CLAUDE_API_KEY` in backend variables
- **Check:** API credits available at console.anthropic.com

## Admin Access

### Verify Completion Codes

Use curl or Postman:

```bash
curl -X POST https://YOUR-BACKEND-URL.up.railway.app/api/admin/verify \
  -H "Content-Type: application/json" \
  -d '{
    "completionCode": "AIWIN-XXXX-XXXX",
    "adminKey": "your-admin-password"
  }'
```

### View All Completions

```bash
curl "https://YOUR-BACKEND-URL.up.railway.app/api/admin/completions?adminKey=your-admin-password"
```

## Updating the Game

To deploy updates:

```bash
git add .
git commit -m "Description of changes"
git push
```

Railway automatically detects the push and redeploys both services!

## Cost Management

**Railway Free Tier:**
- $5 credit per month
- Enough for 50-100 players
- Services sleep after inactivity (wake up automatically)

**Claude API:**
- ~$0.003 per C.H.A.T. interaction
- Budget: ~$1-2 for 100 players

**Total Monthly Cost:** Usually $0 (within free tiers)

## Next Steps

✅ Deployment complete!

Now you can:
1. Share the frontend URL with your team
2. Monitor usage in Railway dashboard
3. Check completions in admin panel
4. Customize questions in `gameContent.js`
5. Adjust styling in `App.css`

## Support Resources

- **Railway Docs:** [docs.railway.app](https://docs.railway.app)
- **Claude API Docs:** [docs.anthropic.com](https://docs.anthropic.com)
- **React Docs:** [react.dev](https://react.dev)

---

**Congratulations! 🎉 Your AI Quest is now live!**

Share the URL and watch your team learn about AI in the most fun way possible! 🎮
