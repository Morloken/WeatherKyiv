import React, { useState, useEffect } from 'react'
import './Weather.css'

function Weather() {
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const city = 'Kyiv'
        const country = 'UA'
        
        const response = await fetch(
          `/api/weather?city=${city}&country=${country}`
        )
        
        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || 'Failed to fetch weather data')
        }
        
        const data = await response.json()
        setWeather(data)
        setLoading(false)
      } catch (err) {
        setError(err.message)
        setLoading(false)
      }
    }

    fetchWeather()
  }, [])

  if (loading) {
    return (
      <div className="weather-container">
        <div className="loading">Loading weather data...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="weather-container">
        <div className="error">
          <p>Error: {error}</p>
          <p className="error-note">
            Make sure the backend server is running. Start it with:{' '}
            <code>npm run dev:server</code>
          </p>
        </div>
      </div>
    )
  }

  if (!weather) {
    return null
  }

  const getWeatherIcon = (iconCode) => {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`
  }

  const formatTime = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="weather-container">
      <div className="weather-card">
        <div className="weather-header">
          <h2>{weather.name}, {weather.sys.country}</h2>
          <p className="weather-description">{weather.weather[0].description}</p>
        </div>
        
        <div className="weather-main">
          <div className="weather-icon">
            <img 
              src={getWeatherIcon(weather.weather[0].icon)} 
              alt={weather.weather[0].main}
            />
          </div>
          <div className="weather-temp">
            <span className="temp-value">{Math.round(weather.main.temp)}</span>
            <span className="temp-unit">°C</span>
          </div>
        </div>

        <div className="weather-details">
          <div className="detail-item">
            <span className="detail-label">Feels like</span>
            <span className="detail-value">{Math.round(weather.main.feels_like)}°C</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Humidity</span>
            <span className="detail-value">{weather.main.humidity}%</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Wind Speed</span>
            <span className="detail-value">{weather.wind.speed} m/s</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Pressure</span>
            <span className="detail-value">{weather.main.pressure} hPa</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Visibility</span>
            <span className="detail-value">{(weather.visibility / 1000).toFixed(1)} km</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Sunrise</span>
            <span className="detail-value">{formatTime(weather.sys.sunrise)}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Sunset</span>
            <span className="detail-value">{formatTime(weather.sys.sunset)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Weather
