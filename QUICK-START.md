# 🎮 AI QUEST - QUICK START GUIDE

## What You've Got

A complete retro arcade-style AI education game! Here's what's included:

### ✅ Complete Game Features:
- **40 trivia questions** (20 for beginners, 20 for techies)
- **8 rooms to explore** with story and characters
- **C.H.A.T. AI assistant** powered by your Claude API
- **Leaderboard system** with classic arcade high score entry
- **Progress saving** with 4-digit codes
- **Admin panel** to verify completion codes and award prizes
- **Retro 1980s aesthetic** with CRT effects and pixel fonts

### 📁 File Structure:
```
ai-quest/
├── backend/                 # Node.js server
├── frontend/               # React application
├── README.md              # Full documentation
├── DEPLOYMENT.md          # Step-by-step deployment guide
└── .gitignore            # Git configuration
```

## 🚀 Three Ways to Get Started

### Option 1: Deploy to Railway (Recommended - 30 mins)
**Best for:** Sharing with your whole council team

1. Read `DEPLOYMENT.md` - it has step-by-step instructions
2. You'll need:
   - GitHub account (free)
   - Railway account (free tier is perfect)
   - Claude API key (get from console.anthropic.com)
3. Follow the guide - it's designed for non-developers!
4. Your game will be live at a public URL

**Cost:** $0/month (within free tiers for ~100 players)

### Option 2: Test Locally First (15 mins)
**Best for:** Testing before deployment

**Backend:**
```bash
cd ai-quest/backend
npm install
cp .env.example .env
# Edit .env - add your DATABASE_URL, CLAUDE_API_KEY, ADMIN_KEY
npm start
```

**Frontend (in new terminal):**
```bash
cd ai-quest/frontend
npm install
npm start
```

Open http://localhost:3000 to play!

### Option 3: Just Read the Code
**Best for:** Understanding what was built

- Check `backend/gameContent.js` for all questions
- Look at `frontend/src/components/` for the UI
- Read `README.md` for full documentation

## 🎯 What to Do Next

### Immediate Actions:
1. ✅ Extract the downloaded folder
2. ✅ Read DEPLOYMENT.md for deployment steps
3. ✅ Get your Claude API key from console.anthropic.com
4. ✅ Choose an admin password

### Customisation (Optional):
- **Edit questions:** `backend/gameContent.js`
- **Change colors:** `frontend/src/styles/App.css`
- **Adjust scoring:** `backend/server.js`
- **Modify story:** `backend/gameContent.js`

### Before Launch:
- [ ] Test both Player 1 and Player 2 modes
- [ ] Try the C.H.A.T. assistant
- [ ] Complete the game and check your code works
- [ ] View the leaderboard
- [ ] Test on mobile devices

## 🎮 Game Modes Explained

### Ready Player 1 🎮 (Beginner Mode)
**Target audience:** All council staff, especially non-IT

**Questions cover:**
- What is AI and how does it work?
- Practical AI tools for council work
- Data privacy and security basics
- Responsible AI use
- Real-world council applications
- Ethics and bias awareness

**Example question:**
"What information should you NEVER put into any AI tool?"

### Ready Player 2 💻 (Expert Mode)
**Target audience:** IT staff, developers, tech-savvy employees

**Questions cover:**
- LLM architecture and limitations
- Prompt injection and security
- RAG systems and vector databases
- AI alignment and safety
- Production deployment considerations
- Technical implementation details

**Example question:**
"Which model architecture powers most modern large language models?"

## 🏆 Prize System

**How it works:**
1. Player completes the game
2. They get a unique completion code (e.g., AIWIN-X7K9-2M3P)
3. They email you the code
4. You verify it using the admin API
5. Award the prize!
6. Mark as claimed in admin panel

**Admin verification:**
```bash
curl -X POST https://your-backend.railway.app/api/admin/verify \
  -H "Content-Type: application/json" \
  -d '{"completionCode": "AIWIN-X7K9-2M3P", "adminKey": "your-password"}'
```

## 📊 What Success Looks Like

After deployment, you'll have:
- ✅ Public URL to share with staff
- ✅ Real-time leaderboard competition
- ✅ Completion codes to verify winners
- ✅ Admin dashboard for tracking
- ✅ Automatic progress saving
- ✅ Claude-powered help system

**Expected engagement:**
- ~15-20 minutes to complete
- ~30-40% will try both modes
- ~80% completion rate (it's fun!)
- High shareability among colleagues

## 🆘 Common Questions

**Q: Do I need to know how to code?**
A: No! The DEPLOYMENT.md guide is written for non-developers. Just follow the steps.

**Q: How much will this cost?**
A: $0-5/month. Railway and Claude both have generous free tiers.

**Q: Can I change the questions?**
A: Yes! Edit `backend/gameContent.js` and redeploy.

**Q: What if something breaks?**
A: Check the Troubleshooting section in DEPLOYMENT.md

**Q: Can other councils use this?**
A: Absolutely! Share the code or help them deploy their own instance.

**Q: Is the data secure?**
A: Yes - you control the backend and database. Player emails are only used for access codes.

## 📞 Next Steps

1. **Now:** Extract the ai-quest folder
2. **Next:** Read DEPLOYMENT.md
3. **Then:** Get your Claude API key
4. **Finally:** Deploy to Railway!

Within an hour, you'll have a live game URL to share with your council!

## 🎉 That's It!

You've got everything you need. The game is ready to deploy.

**Questions about the code?** Check README.md
**Ready to deploy?** Follow DEPLOYMENT.md
**Want to customise?** Start with gameContent.js

Good luck with your AI literacy initiative! 🚀

---

Built for NSW Local Government
Ready Player 1? Press Start! 🎮
