import React from 'react'
import Weather from './components/Weather'
import './App.css'

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Kyiv Weather</h1>
        <p>Current weather conditions in Kyiv, Ukraine</p>
      </header>
      <main className="app-main">
        <Weather />
      </main>
    </div>
  )
}

export default App
