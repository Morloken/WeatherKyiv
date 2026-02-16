# Quick GitHub Setup Guide

Follow these steps to push your code to GitHub and deploy to Vercel.

## Step 1: Create GitHub Repository

1. Go to [github.com](https://github.com) and sign in
2. Click the **"+"** icon → **"New repository"**
3. Fill in:
   - **Repository name**: `weather-kyiv` (or any name you like)
   - **Description**: "Beautiful weather app for Kyiv, Ukraine"
   - **Visibility**: Public (or Private)
   - **DO NOT** check "Initialize with README" (we already have one)
4. Click **"Create repository"**

## Step 2: Push Your Code

Open your terminal in the project folder and run:

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Kyiv Weather App"

# Add your GitHub repository as remote
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Push to GitHub
git branch -M main
git push -u origin main
```

**Replace:**
- `YOUR_USERNAME` with your GitHub username
- `YOUR_REPO_NAME` with your repository name

## Step 3: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click **"Sign Up"** → Choose **"Continue with GitHub"**
3. Authorize Vercel to access your GitHub
4. Click **"Add New Project"**
5. Find and select your repository
6. Vercel will auto-detect:
   - Framework: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
7. Click **"Deploy"**
8. Wait 2-3 minutes
9. **Done!** Your app is live at `https://your-app-name.vercel.app` 🎉

## Step 4: Verify It Works

- Visit your Vercel URL
- Check that weather data loads
- Test the API: `https://your-app-name.vercel.app/api/weather`

## Troubleshooting

### "Repository not found"
- Make sure you've pushed your code to GitHub first
- Check the repository URL is correct

### Build fails
- Check Vercel logs: Project → Deployments → Click on failed deployment
- Ensure `package.json` has correct build script
- Make sure `api/weather.js` exists

### API returns 404
- Verify `api/weather.js` is in your repository
- Check Vercel Functions tab to see if the function deployed

## Next Steps

- **Custom Domain**: Add your domain in Vercel Settings → Domains
- **Auto Deploy**: Every push to `main` branch auto-deploys
- **Preview Deployments**: Pull requests get preview URLs automatically

That's it! Your app is now live and will auto-update on every push! 🚀
