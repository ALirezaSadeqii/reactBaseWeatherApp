import React, { useState, useEffect } from 'react';
import WeatherCard from './WeatherCard';
import ModeToggle from './ModeToggle';

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState('');
  const [cityInput, setCityInput] = useState('');
  const [loading, setLoading] = useState(true);
  const [weatherCondition, setWeatherCondition] = useState('');
  const [error, setError] = useState(null);

  const applyWeatherDesign = (weatherCondition) => {
    const body = document.body;
    body.className = '';
    const weatherClasses = {
      Clear: 'sunny',
      Clouds: 'cloudy',
      Rain: 'rainy',
      Snow: 'snowy',
      Drizzle: 'drizzly',
      Thunderstorm: 'stormy',
    };

    const weatherClass = weatherClasses[weatherCondition] || 'default-weather';
    setWeatherCondition(weatherCondition);
    
    // Force a repaint by removing and adding the class with a small delay
    setTimeout(() => {
      body.classList.add(weatherClass);
      
      // Add animation class to make transition smoother
      setTimeout(() => {
        body.classList.add('weather-transition');
      }, 100);
    }, 50);
    
    console.log(`Applied weather design: ${weatherClass} for condition: ${weatherCondition}`);
  };

  const getLocationByCoordinates = async () => {
    setLoading(true);
    setError(null);
    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
      
      const { latitude, longitude } = position.coords;
      
      // Get location name
      const locationRes = await fetch(
        `https://api.tomtom.com/maps/orbis/places/reverseGeocode/${latitude},${longitude}.json?key=4lgnZb9buoDcdkr73Zm2niPb5kzo1PoM&radius=100&apiVersion=1`
      );
      
      if (!locationRes.ok) {
        throw new Error(`Problem getting location: ${locationRes.status}`);
      }
      
      const locationData = await locationRes.json();
      const locationName = locationData.addresses[0].address.municipality;
      setLocation(locationName);
      
      // Get weather data
      const weatherRes = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=cea179dffc48165803610302c1237ef4`
      );
      
      if (!weatherRes.ok) {
        throw new Error(`Problem getting weather data: ${weatherRes.status}`);
      }
      
      const weatherData = await weatherRes.json();
      setWeatherData(weatherData);
      applyWeatherDesign(weatherData.weather[0].main);
      
      // Dispatch event for ModeToggle to initialize
      const event = new Event('weatherCardInserted');
      document.dispatchEvent(event);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Unable to get your location. Please try searching for a city instead.');
    } finally {
      setLoading(false);
    }
  };

  const getWeatherByCity = async (city) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=cea179dffc48165803610302c1237ef4`
      );
      
      if (!res.ok) {
        if (res.status === 404) {
          throw new Error('City not found. Please check the spelling and try again.');
        }
        throw new Error(`Problem getting location: ${res.status}`);
      }
      
      const data = await res.json();
      setLocation(data.name);
      setWeatherData(data);
      applyWeatherDesign(data.weather[0].main);
      
      // Dispatch event for ModeToggle to initialize
      const event = new Event('weatherCardInserted');
      document.dispatchEvent(event);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError(error.message || 'Failed to get weather data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCitySearch = (e) => {
    if (e.key === 'Enter' && cityInput.trim() !== '') {
      getWeatherByCity(cityInput);
    }
  };

  const handleSearchClick = () => {
    if (cityInput.trim() !== '') {
      getWeatherByCity(cityInput);
    }
  };

  const handleUseCurrentLocation = () => {
    getLocationByCoordinates();
  };

  useEffect(() => {
    // Clear any existing classes
    document.body.className = '';
    
    getLocationByCoordinates();
    
    // Add CSS class for initial page load animation
    document.body.classList.add('page-loaded');
    
    return () => {
      document.body.classList.remove('page-loaded');
    };
  }, []);

  return (
    <div className="weather-bg">
      <div className="stripes"></div>
      <div className="content">
        <div className="search-container">
          <div className="search-bar">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="search-icon">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </svg>
            <input
              id="CityInput"
              type="text"
              name="city"
              placeholder="Search for a city..."
              value={cityInput}
              onChange={(e) => setCityInput(e.target.value)}
              onKeyDown={handleCitySearch}
            />
            <button className="search-button" onClick={handleSearchClick}>
              Search
            </button>
          </div>
          <div className="action-row">
            <button className="location-button" onClick={handleUseCurrentLocation}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M12 8v4l2 2"></path>
              </svg>
              My Location
            </button>
            <ModeToggle />
          </div>
        </div>
        
        {error && (
          <div className="error-message">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <p>{error}</p>
          </div>
        )}
        
        <div className="weather-container">
          {loading ? (
            <div className="loading-indicator">
              <div className="spinner"></div>
              <p>Loading weather data...</p>
            </div>
          ) : (
            weatherData && (
              <>
                {weatherCondition && (
                  <div className="current-condition">
                    <p>Current weather: <strong>{weatherCondition}</strong></p>
                  </div>
                )}
                <WeatherCard weatherData={weatherData} location={location} />
              </>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Weather; 