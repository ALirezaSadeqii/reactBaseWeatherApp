import React, { useState, useEffect } from 'react';
import WeatherCard from './WeatherCard';
import ModeToggle from './ModeToggle';

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState('');
  const [cityInput, setCityInput] = useState('');
  const [loading, setLoading] = useState(true);
  const [weatherCondition, setWeatherCondition] = useState('');

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
    } finally {
      setLoading(false);
    }
  };

  const getWeatherByCity = async (city) => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=cea179dffc48165803610302c1237ef4`
      );
      
      if (!res.ok) {
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
    } finally {
      setLoading(false);
    }
  };

  const handleCitySearch = (e) => {
    if (e.key === 'Enter' && cityInput.trim() !== '') {
      getWeatherByCity(cityInput);
    }
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
        <div className="mode">
          <div>
            <input
              id="CityInput"
              type="text"
              name="city"
              placeholder="Enter city name..."
              value={cityInput}
              onChange={(e) => setCityInput(e.target.value)}
              onKeyDown={handleCitySearch}
            />
          </div>
          <ModeToggle />
        </div>
        <div className="weather-container">
          {loading ? (
            <div className="loading-indicator">
              <div className="spinner"></div>
              <p>Loading weather data...</p>
            </div>
          ) : (
            weatherData && (
              <>
                <div className="current-condition">
                  {weatherCondition && (
                    <p>Current weather: <strong>{weatherCondition}</strong></p>
                  )}
                </div>
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