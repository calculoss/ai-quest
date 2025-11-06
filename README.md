# 🎮 AI QUEST: THE NEURAL NETWORK ADVENTURE

A retro 1980s arcade-style educational game teaching AI literacy for NSW Local Government employees.

## 🌟 Features

- **Dual Game Modes:**
  - 🎮 **Ready Player 1**: Beginner-friendly questions about AI basics
  - 💻 **Ready Player 2**: Technical challenges for tech-savvy players

- **20 Curated Questions** per mode covering:
  - AI fundamentals and how it works
  - Practical applications for councils
  - Data privacy and security
  - Responsible AI use
  - AI ethics and bias
  - Real-world council use cases

- **C.H.A.T. AI Assistant** (powered by Claude API):
  - Get hints without spoiling answers
  - Learn concepts through conversation
  - Context-aware help based on your mode

- **Retro Arcade Experience:**
  - CRT screen effects with scanlines
  - Pixel-perfect 1980s aesthetic
  - Classic arcade cabinet styling
  - Authentic retro fonts and colors

- **Progress Saving:**
  - 4-digit access codes
  - Save and resume your quest
  - Auto-save every 30 seconds

- **Leaderboard System:**
  - Separate leaderboards for each mode
  - Classic arcade high score entry
  - Time-based rankings

- **Admin Panel:**
  - Verify completion codes
  - Track prize claims
  - View game statistics
  - Export player data

## 🛠️ Tech Stack

**Backend:**
- Node.js + Express
- PostgreSQL database
- Claude API integration
- RESTful API

**Frontend:**
- React 18
- Retro CSS styling
- Responsive design

**Deployment:**
- Railway (recommended)
- Or any platform supporting Node.js + PostgreSQL

## 📦 Project Structure

```
ai-quest/
├── backend/
│   ├── server.js           # Main Express server
│   ├── database.js         # PostgreSQL setup & schema
│   ├── gameContent.js      # All questions, rooms, dialogue
│   ├── claudeService.js    # Claude API integration
│   ├── package.json
│   └── .env.example
│
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── components/
    │   │   ├── StartScreen.jsx
    │   │   ├── ModeSelect.jsx
    │   │   ├── GamePlay.jsx
    │   │   ├── ChatModal.jsx
    │   │   ├── CompletionScreen.jsx
    │   │   └── Leaderboard.jsx
    │   ├── styles/
    │   │   └── App.css
    │   ├── App.jsx
    │   └── index.js
    ├── package.json
    └── .env.example
```

## 🚀 Deployment to Railway

### Step 1: Prepare Your Code

1. Download all files from this project
2. Create a new folder called `ai-quest` on your computer
3. Copy the `backend` and `frontend` folders into it

### Step 2: Set Up Git Repository

```bash
cd ai-quest
git init
git add .
git commit -m "Initial commit: AI Quest game"
```

### Step 3: Create Railway Account

1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub (recommended)
3. Verify your account

### Step 4: Deploy Backend

1. Click "New Project" in Railway
2. Select "Deploy from GitHub repo"
3. Connect your GitHub account and select your repository
4. Railway will detect the backend automatically

**Or manually:**
1. Click "New Project" → "Empty Project"
2. Click "New" → "Database" → "PostgreSQL"
3. Click "New" → "GitHub Repo" → Select your repo
4. Set root directory to `/backend`

### Step 5: Configure Backend Environment Variables

In your Railway backend service, add these variables:

```
DATABASE_URL=<automatically set by Railway PostgreSQL>
CLAUDE_API_KEY=sk-ant-api03-your-key-here
ADMIN_KEY=your-secret-admin-password
NODE_ENV=production
PORT=<automatically set by Railway>
```

**To get your Claude API key:**
1. Go to [console.anthropic.com](https://console.anthropic.com)
2. Create an account or sign in
3. Go to "API Keys" and create a new key
4. Copy and paste it into Railway

### Step 6: Deploy Frontend

1. In Railway, click "New" → "GitHub Repo" (same repo)
2. Set root directory to `/frontend`
3. Add environment variable:
   ```
   REACT_APP_API_URL=https://your-backend-url.up.railway.app/api
   ```
4. Railway will automatically build and deploy

### Step 7: Get Your Backend URL

1. Go to your backend service in Railway
2. Click "Settings" → "Networking"
3. Click "Generate Domain"
4. Copy the URL (e.g., `your-app.up.railway.app`)
5. Update the frontend's `REACT_APP_API_URL` with this URL + `/api`

### Step 8: Test Your Deployment

1. Visit your frontend URL (Railway will provide this)
2. Try registering with an email
3. Play through a few questions
4. Test the C.H.A.T. assistant
5. Check the leaderboard

## 💻 Local Development

### Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your DATABASE_URL, CLAUDE_API_KEY, and ADMIN_KEY
npm start
```

Backend runs on `http://localhost:3001`

### Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env
# Leave REACT_APP_API_URL blank for local development (uses proxy)
npm start
```

Frontend runs on `http://localhost:3000`

### Database Setup (Local)

Install PostgreSQL locally, then:

```bash
createdb aiquest
psql aiquest < schema.sql
```

Or use a cloud PostgreSQL instance.

## 🔧 Configuration

### Customizing Questions

Edit `backend/gameContent.js`:

- **Player 1 questions**: `gameContent.questions.player1`
- **Player 2 questions**: `gameContent.questions.player2`

Each question has:
```javascript
{
  id: 1,
  room: 1,  // Which room (1-8)
  character: "RITA",
  question: "Your question here?",
  options: ["A", "B", "C", "D"],
  correct: 1,  // Index of correct answer (0-3)
  explanation: "Why this is correct...",
  points: 100
}
```

### Customizing Story/Rooms

Edit `backend/gameContent.js`:

- **Rooms**: `gameContent.rooms`
- **Character dialogue**: `gameContent.dialogue`

### Adjusting Difficulty

In `backend/server.js`, modify the scoring:
- Base points per question
- Point deduction per wrong attempt
- Minimum points awarded

## 👨‍💼 Admin Panel Usage

### Verify Completion Codes

```bash
curl -X POST https://your-backend.up.railway.app/api/admin/verify \
  -H "Content-Type: application/json" \
  -d '{
    "completionCode": "AIWIN-X7K9-2M3P",
    "adminKey": "your-admin-password"
  }'
```

### View All Completions

```bash
curl "https://your-backend.up.railway.app/api/admin/completions?adminKey=your-admin-password"
```

### Mark Prize as Claimed

```bash
curl -X POST https://your-backend.up.railway.app/api/admin/claim \
  -H "Content-Type: application/json" \
  -d '{
    "completionCode": "AIWIN-X7K9-2M3P",
    "adminKey": "your-admin-password"
  }'
```

## 📊 Game Statistics

Access stats via:
```
GET /api/admin/stats?adminKey=your-admin-password
```

Returns:
- Total players
- Total completions
- Average completion time
- Average score

## 🎨 Customization Ideas

### Change Color Scheme

Edit `frontend/src/styles/App.css`:

```css
:root {
  --green: #0f0;      /* Change to your color */
  --amber: #ffb000;   /* Change to your color */
}
```

### Add More Rooms

1. Add room to `gameContent.rooms` in `gameContent.js`
2. Add character dialogue to `gameContent.dialogue`
3. Create questions for that room
4. Update room exits/connections

### Modify Leaderboard

Edit `backend/server.js` → `/api/leaderboard` route to change:
- Number of entries shown
- Sorting criteria
- Additional stats displayed

## 🐛 Troubleshooting

### "Failed to load content"
- Check `REACT_APP_API_URL` is set correctly
- Ensure backend is running and accessible
- Check browser console for CORS errors

### "Invalid email or access code"
- Codes are case-sensitive (always uppercase)
- Generated from email hash (same email = same code)

### C.H.A.T. not responding
- Verify `CLAUDE_API_KEY` is set in backend
- Check Railway logs for API errors
- Ensure you have Claude API credits

### Database connection errors
- Verify `DATABASE_URL` in Railway
- Check PostgreSQL service is running
- Review Railway logs for specific errors

## 💰 Cost Estimates

**Railway Free Tier:**
- $5 credit/month
- Usually sufficient for internal council use (50-100 players)

**Claude API:**
- ~$0.003 per hint request
- With caching: ~100 players = $1-2
- Very affordable for this use case

**Total estimated cost:** $0-10/month for typical usage

## 📝 License

This project was created for NSW Local Government AI education initiatives.

## 🤝 Contributing

This is a custom project for your council, but you can:
- Add more questions
- Improve the UI
- Add new features
- Share with other councils!

## 📧 Support

For questions about deployment or customization, refer to:
- Railway docs: [docs.railway.app](https://docs.railway.app)
- Claude API docs: [docs.anthropic.com](https://docs.anthropic.com)
- React docs: [react.dev](https://react.dev)

## 🎮 Play Testing Checklist

Before launch:
- ✅ Test both Player 1 and Player 2 modes
- ✅ Verify all 40 questions work correctly
- ✅ Test progress saving and loading
- ✅ Check C.H.A.T. gives helpful hints
- ✅ Confirm leaderboard updates
- ✅ Test completion code generation
- ✅ Verify admin panel access
- ✅ Test on mobile devices
- ✅ Check all room transitions work

---

**Built with ❤️ for NSW Local Government AI Literacy**

🎮 Ready Player 1? Press Start!
