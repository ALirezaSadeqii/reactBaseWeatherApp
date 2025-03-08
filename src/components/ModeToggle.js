import React, { useEffect, useState } from 'react';

const ModeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    applyTheme(newMode);
  };

  const applyTheme = (isDark) => {
    const weatherCard = document.querySelector('.weather-card');
    const loadingIndicator = document.querySelector('.loading-indicator');
    const errorMessage = document.querySelector('.error-message');
    const currentCondition = document.querySelector('.current-condition');
    
    if (weatherCard) {
      if (isDark) {
        weatherCard.classList.remove('lightback');
        weatherCard.classList.add('darkback');
      } else {
        weatherCard.classList.remove('darkback');
        weatherCard.classList.add('lightback');
      }
      
      // Apply styles to child elements
      const detailItems = document.querySelectorAll('.detail-item');
      const detailLabels = document.querySelectorAll('.detail-label');
      const detailValues = document.querySelectorAll('.detail-value');
      const temperatureValue = document.querySelector('.temperature-value');
      const temperatureDescription = document.querySelector('.temperature-description');
      const h1 = document.querySelector('.h1');
      
      if (isDark) {
        detailItems.forEach(item => {
          item.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
        });
        
        document.querySelector('.temperature-section').style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
        
        detailLabels.forEach(label => {
          label.style.color = 'rgba(255, 255, 255, 0.6)';
        });
        
        detailValues.forEach(value => {
          value.style.color = '#ffffff';
        });
        
        if (temperatureValue) temperatureValue.style.color = '#ffffff';
        if (temperatureDescription) temperatureDescription.style.color = 'rgba(255, 255, 255, 0.6)';
        if (h1) h1.style.color = '#ffffff';
      } else {
        detailItems.forEach(item => {
          item.style.backgroundColor = 'rgba(0, 0, 0, 0.03)';
        });
        
        document.querySelector('.temperature-section').style.backgroundColor = 'rgba(0, 0, 0, 0.03)';
        
        detailLabels.forEach(label => {
          label.style.color = '#86868b';
        });
        
        detailValues.forEach(value => {
          value.style.color = '#1d1d1f';
        });
        
        if (temperatureValue) temperatureValue.style.color = '#1d1d1f';
        if (temperatureDescription) temperatureDescription.style.color = '#86868b';
        if (h1) h1.style.color = '#1d1d1f';
      }
    }
    
    // Apply styles to loading indicator
    if (loadingIndicator) {
      if (isDark) {
        loadingIndicator.style.backgroundColor = 'rgba(30, 30, 32, 0.8)';
        loadingIndicator.style.borderColor = 'rgba(66, 66, 69, 0.18)';
        const loadingText = loadingIndicator.querySelector('p');
        if (loadingText) loadingText.style.color = '#ffffff';
      } else {
        loadingIndicator.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
        loadingIndicator.style.borderColor = 'rgba(255, 255, 255, 0.18)';
        const loadingText = loadingIndicator.querySelector('p');
        if (loadingText) loadingText.style.color = '#86868b';
      }
    }
    
    // Apply styles to error message
    if (errorMessage) {
      if (isDark) {
        errorMessage.style.backgroundColor = 'rgba(30, 30, 32, 0.8)';
        errorMessage.style.color = '#ffffff';
      } else {
        errorMessage.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
        errorMessage.style.color = '#1d1d1f';
      }
    }
    
    // Apply styles to current condition
    if (currentCondition) {
      if (isDark) {
        currentCondition.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
        currentCondition.style.color = '#ffffff';
        const strong = currentCondition.querySelector('strong');
        if (strong) strong.style.color = '#ffffff';
      } else {
        currentCondition.style.backgroundColor = 'rgba(0, 0, 0, 0.03)';
        currentCondition.style.color = '#86868b';
        const strong = currentCondition.querySelector('strong');
        if (strong) strong.style.color = '#1d1d1f';
      }
    }
  };

  useEffect(() => {
    // Initial toggle setup
    setTimeout(() => {
      applyTheme(isDarkMode);
    }, 100);
    
    // Add event listener for when weather card is inserted
    const handleWeatherCardInserted = () => {
      setTimeout(() => {
        applyTheme(isDarkMode);
      }, 100);
    };
    
    document.addEventListener('weatherCardInserted', handleWeatherCardInserted);
    
    // Cleanup
    return () => {
      document.removeEventListener('weatherCardInserted', handleWeatherCardInserted);
    };
  }, [isDarkMode]);

  return (
    <button 
      className={`toggle-button ${isDarkMode ? 'dark-mode' : 'light-mode'}`}
      onClick={toggleDarkMode}
      aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <div className="toggle-track">
        <div className="toggle-indicator">
          {isDarkMode ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
          )}
        </div>
      </div>
    </button>
  );
};

export default ModeToggle; 