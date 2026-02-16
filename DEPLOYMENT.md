# Deployment Guide - Kyiv Weather App

This guide will help you deploy your weather app to **Vercel** (recommended) or other platforms.

## 🚀 Option 1: Deploy to Vercel (Recommended - FREE)

Vercel is the best option because it supports both frontend and backend (serverless functions) for free.

### Prerequisites
- GitHub account
- Vercel account (free at [vercel.com](https://vercel.com))

### Step-by-Step Instructions

#### 1. Create GitHub Repository

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Kyiv Weather App"

# Create a new repository on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

#### 2. Deploy to Vercel

**Option A: Via Vercel Website (Easiest)**
1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click **"Add New Project"**
3. Import your GitHub repository
4. Vercel will auto-detect settings:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Click **"Deploy"**
6. Wait 2-3 minutes for deployment
7. Your app will be live at `https://your-app-name.vercel.app` 🎉

**Option B: Via Vercel CLI**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? Your account
# - Link to existing project? No
# - Project name? (press enter for default)
# - Directory? ./
# - Override settings? No
```

### 3. Verify Deployment

- Frontend: Your Vercel URL (e.g., `https://your-app.vercel.app`)
- API: `https://your-app.vercel.app/api/weather`

The app should work immediately! No environment variables needed since we're using Open-Meteo (no API key required).

---

## 🌐 Option 2: Deploy to Netlify (Alternative - FREE)

Netlify also supports serverless functions.

### Steps:
1. Create GitHub repository (same as above)
2. Go to [netlify.com](https://netlify.com) and sign in
3. Click **"Add new site"** → **"Import an existing project"**
4. Connect your GitHub repository
5. Build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
6. Click **"Deploy site"**

**Note**: You'll need to create `netlify/functions/weather.js` (similar to Vercel's `api/weather.js`)

---

## 🖥️ Option 3: Deploy Backend Separately (Render/Railway)

If you want to keep the Express server:

### Render.com (FREE tier)
1. Create account at [render.com](https://render.com)
2. Create new **Web Service**
3. Connect GitHub repository
4. Settings:
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
   - **Environment**: Node
5. Add environment variable: `PORT=10000` (Render's default)
6. Deploy frontend to Vercel/Netlify separately
7. Update frontend API URL to your Render backend URL

### Railway.app (FREE tier)
Similar to Render, but with different interface.

---

## 📝 Important Notes

### For Vercel Deployment:
- ✅ Backend is automatically converted to serverless functions (`api/weather.js`)
- ✅ No API keys needed (using Open-Meteo)
- ✅ Free tier includes:
  - Unlimited deployments
  - 100GB bandwidth/month
  - Serverless functions
  - Automatic HTTPS

### Environment Variables:
- **Not needed** for this app (Open-Meteo doesn't require API keys)
- If you add features later, add them in Vercel dashboard → Settings → Environment Variables

### Custom Domain:
1. Go to Vercel project → Settings → Domains
2. Add your domain
3. Follow DNS configuration instructions

---

## 🔧 Troubleshooting

### API not working in production?
- Check Vercel function logs: Project → Functions → View logs
- Ensure `api/weather.js` exists in your repository
- Verify the API route is `/api/weather` (not `/api/weather.js`)

### Build fails?
- Check `package.json` has correct build script
- Ensure all dependencies are in `dependencies` (not `devDependencies`)
- Check Vercel build logs for errors

### CORS errors?
- Vercel serverless functions handle CORS automatically
- If issues persist, check `api/weather.js` has CORS headers

---

## 📚 Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Serverless Functions](https://vercel.com/docs/functions)
- [Netlify Functions](https://docs.netlify.com/functions/overview/)
- [Render Documentation](https://render.com/docs)

---

## ✅ Quick Checklist

- [ ] Code pushed to GitHub
- [ ] Vercel account created
- [ ] Repository imported to Vercel
- [ ] Deployment successful
- [ ] App accessible at Vercel URL
- [ ] API endpoint working (`/api/weather`)

**That's it! Your app is now live! 🎉**
