// Vercel serverless function for weather API
import fetch from 'node-fetch';

// Simple mapping from Open-Meteo weather codes to text/icon-ish values
function mapWeatherCode(code) {
  if (code === 0) return { main: 'Clear', description: 'clear sky', icon: '01d' };
  if ([1, 2, 3].includes(code)) return { main: 'Clouds', description: 'partly cloudy', icon: '02d' };
  if ([45, 48].includes(code)) return { main: 'Fog', description: 'foggy', icon: '50d' };
  if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) {
    return { main: 'Rain', description: 'rain', icon: '10d' };
  }
  if ([56, 57, 66, 67, 71, 73, 75, 77, 85, 86].includes(code)) {
    return { main: 'Snow', description: 'snow', icon: '13d' };
  }
  if ([95, 96, 99].includes(code)) return { main: 'Thunderstorm', description: 'thunderstorm', icon: '11d' };
  return { main: 'Weather', description: 'unknown conditions', icon: '01d' };
}

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // More precise Kyiv coordinates (city center)
    const latitude = 50.4501;
    const longitude = 30.5234;

    // Use ECMWF IFS HRES model (9km resolution, most accurate) for better precision
    const url =
      'https://api.open-meteo.com/v1/forecast' +
      `?latitude=${latitude}&longitude=${longitude}` +
      '&current=temperature_2m,apparent_temperature,relative_humidity_2m,pressure_msl,wind_speed_10m,visibility,weather_code' +
      '&daily=sunrise,sunset' +
      '&timezone=Europe/Kyiv' +
      '&models=ecmwf_ifs'; // Use ECMWF model for highest accuracy (9km resolution)

    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        error: data.error || 'Failed to fetch weather data from Open-Meteo',
      });
    }

    if (!data.current || !data.daily) {
      return res.status(500).json({ error: 'Unexpected weather data format from Open-Meteo' });
    }

    const weatherCode = data.current.weather_code;
    const mapped = mapWeatherCode(weatherCode);

    // Transform Open-Meteo response into an OpenWeatherMap-like shape
    const transformed = {
      name: 'Kyiv',
      sys: {
        country: 'UA',
        // Convert ISO strings to Unix timestamps (seconds)
        sunrise: data.daily.sunrise && data.daily.sunrise[0] ? Date.parse(data.daily.sunrise[0]) / 1000 : undefined,
        sunset: data.daily.sunset && data.daily.sunset[0] ? Date.parse(data.daily.sunset[0]) / 1000 : undefined,
      },
      weather: [
        {
          main: mapped.main,
          description: mapped.description,
          icon: mapped.icon,
        },
      ],
      main: {
        temp: Math.round(data.current.temperature_2m * 10) / 10, // Round to 1 decimal for precision
        feels_like: data.current.apparent_temperature ? Math.round(data.current.apparent_temperature * 10) / 10 : Math.round(data.current.temperature_2m * 10) / 10,
        humidity: Math.round(data.current.relative_humidity_2m),
        pressure: Math.round(data.current.pressure_msl),
      },
      wind: {
        speed: data.current.wind_speed_10m,
      },
      // Visibility comes in meters, convert to meters to stay compatible
      visibility: data.current.visibility ?? 10000,
    };

    return res.status(200).json(transformed);
  } catch (error) {
    console.error('Error fetching weather:', error);
    return res.status(500).json({ error: 'Failed to fetch weather data' });
  }
}
