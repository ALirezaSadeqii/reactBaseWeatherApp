import React from 'react';

const WeatherCard = ({ weatherData, location }) => {
  if (!weatherData) return null;

  // Helper function to get weather icon based on condition
  const getWeatherIcon = (condition) => {
    switch (condition) {
      case 'Clear':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="5"></circle>
            <line x1="12" y1="1" x2="12" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
            <line x1="1" y1="12" x2="3" y2="12"></line>
            <line x1="21" y1="12" x2="23" y2="12"></line>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
          </svg>
        );
      case 'Clouds':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"></path>
          </svg>
        );
      case 'Rain':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"></path>
            <path d="M16 14v6"></path>
            <path d="M8 14v6"></path>
            <path d="M12 16v6"></path>
          </svg>
        );
      case 'Snow':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"></path>
            <path d="M8 15h.01"></path>
            <path d="M8 19h.01"></path>
            <path d="M12 17h.01"></path>
            <path d="M12 21h.01"></path>
            <path d="M16 15h.01"></path>
            <path d="M16 19h.01"></path>
          </svg>
        );
      case 'Drizzle':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"></path>
            <path d="M8 19v2"></path>
            <path d="M8 13v2"></path>
            <path d="M16 19v2"></path>
            <path d="M16 13v2"></path>
            <path d="M12 21v2"></path>
            <path d="M12 15v2"></path>
          </svg>
        );
      case 'Thunderstorm':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 16.9A5 5 0 0 0 18 7h-1.26a8 8 0 1 0-11.62 9"></path>
            <path d="m13 12-3 5h4l-3 5"></path>
          </svg>
        );
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"></path>
          </svg>
        );
    }
  };

  return (
    <div className="weather-card lightback">
      <div className="weather-header">
        <div className="location-badge">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
          <span id="location-text">{location} - {weatherData.sys.country}</span>
        </div>
      </div>
      
      <div className="temperature-section">
        <div className="weather-icon">
          {getWeatherIcon(weatherData.weather[0].main)}
        </div>
        <div>
          <p id="temperature" className="temperature-value">{Math.round(weatherData.main.temp - 273.15)}°C</p>
          <p id="description" className="temperature-description">{weatherData.weather[0].description}</p>
        </div>
      </div>
      
      <div className="additional-details">
        <div className="detail-item">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V6l-8-4-8 4v6c0 6 8 10 8 10"></path>
          </svg>
          <div>
            <p className="detail-label">Humidity</p>
            <p id="humidity" className="detail-value">{weatherData.main.humidity}%</p>
          </div>
        </div>
        <div className="detail-item">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2"></path>
            <path d="M9.6 4.6A2 2 0 1 1 11 8H2"></path>
            <path d="M12.6 19.4A2 2 0 1 0 14 16H2"></path>
          </svg>
          <div>
            <p className="detail-label">Wind Speed</p>
            <p id="wind-speed" className="detail-value">{weatherData.wind.speed} m/s</p>
          </div>
        </div>
        <div className="detail-item">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M8 3v3a2 2 0 1 0 4 0V3"></path>
            <path d="M10 3v9a2 2 0 1 0 4 0V3"></path>
            <path d="M14 15a2 2 0 1 0 4 0V3"></path>
            <path d="M6 15a2 2 0 1 0 4 0V3"></path>
            <path d="M16 21a2 2 0 1 0 4 0v-3"></path>
            <path d="M12 21a2 2 0 1 0 4 0v-3"></path>
            <path d="M8 21a2 2 0 1 0 4 0v-3"></path>
            <path d="M4 21a2 2 0 1 0 4 0v-3"></path>
          </svg>
          <div>
            <p className="detail-label">Pressure</p>
            <p id="pressure" className="detail-value">{weatherData.main.pressure} hPa</p>
          </div>
        </div>
        <div className="detail-item">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z"></path>
          </svg>
          <div>
            <p className="detail-label">Feels Like</p>
            <p id="feels-like" className="detail-value">{Math.round(weatherData.main.feels_like - 273.15)}°C</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard; 