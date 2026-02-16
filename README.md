# Kyiv Weather App

A beautiful React application that displays the current weather conditions in Kyiv, Ukraine.

## Features

- Real-time weather data for Kyiv, Ukraine
- Beautiful, modern glassmorphism UI design
- Responsive layout that works on all devices
- **No API keys required** - Uses free Open-Meteo API
- High-accuracy weather data using ECMWF model (9km resolution)
- Displays temperature, humidity, wind speed, pressure, visibility, sunrise, and sunset times

## Setup Instructions

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the application:**
   
   **Option 1: Run both servers together (recommended):**
   ```bash
   npm run dev:all
   ```
   
   **Option 2: Run servers separately:**
   
   Terminal 1 (Backend):
   ```bash
   npm run dev:server
   ```
   
   Terminal 2 (Frontend):
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   - Frontend: `http://localhost:5173` (or the port shown in terminal)
   - Backend API: `http://localhost:3001/api/weather`

**No API keys needed!** The app uses Open-Meteo API which is completely free and requires no authentication.

## Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

**For production deployment:**
- See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions
- Recommended: Deploy to Vercel (free, supports both frontend and backend)
- No environment variables needed!

## Technologies Used

- React 18
- Vite
- Express.js / Vercel Serverless Functions (Backend)
- Open-Meteo API (Free, no API key required)
- CSS3 (Glassmorphism design with animations)

## Project Structure

```
WeatherKyiv/
├── api/
│   └── weather.js           # Vercel serverless function (for production)
├── server.js                 # Express backend server (for local dev)
├── vercel.json               # Vercel configuration
├── src/
│   ├── components/
│   │   ├── Weather.jsx       # Main weather component
│   │   └── Weather.css       # Weather component styles
│   ├── App.jsx               # Main app component
│   ├── App.css               # App styles
│   ├── main.jsx              # Entry point
│   └── index.css             # Global styles
├── index.html                # HTML template
├── vite.config.js            # Vite configuration
├── package.json              # Dependencies and scripts
└── DEPLOYMENT.md             # Deployment guide
```

## Deployment

This app can be deployed for free to **Vercel**, **Netlify**, or other platforms.

### Quick Deploy to Vercel (Recommended)

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git push -u origin main
   ```

2. **Deploy to Vercel:**
   - Go to [vercel.com](https://vercel.com) and sign in with GitHub
   - Click "Add New Project" → Import your repository
   - Vercel auto-detects Vite settings
   - Click "Deploy"
   - Your app is live! 🎉

**No API keys needed** - Open-Meteo is free and requires no authentication.

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

## License

MIT
