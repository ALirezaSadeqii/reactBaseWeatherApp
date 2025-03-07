import React, { useEffect, useState } from 'react';

const ModeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const initializeToggle = () => {
    const darkButton = document.querySelector('.dark');
    const lightButton = document.querySelector('.light');
    const weatherCard = document.querySelector('.weather-card');
    const h1 = document.querySelector('.h1');
    const item = document.querySelectorAll('.detail-item');
    const label = document.querySelectorAll('.detail-label');
    const value = document.querySelectorAll('.detail-value');
    const temp = document.querySelector('.temperature-value');
    const tempture = document.querySelector('.temperature-description');
    const loadingIndicator = document.querySelector('.loading-indicator');

    if (weatherCard && darkButton && lightButton) {
      // Set initial state based on current mode
      setIsDarkMode(weatherCard.classList.contains('darkback'));
      
      // Apply initial light mode if not already set
      if (!weatherCard.classList.contains('darkback') && !weatherCard.classList.contains('lightback')) {
        weatherCard.classList.add('lightback');
      }

      // Remove previous event listeners to prevent duplicates
      const newDarkButton = darkButton.cloneNode(true);
      const newLightButton = lightButton.cloneNode(true);
      darkButton.parentNode.replaceChild(newDarkButton, darkButton);
      lightButton.parentNode.replaceChild(newLightButton, lightButton);

      newDarkButton.addEventListener('click', function () {
        setIsDarkMode(true);
        if (weatherCard) {
          weatherCard.classList.remove('lightback');
          weatherCard.classList.add('darkback');
        }
        
        if (loadingIndicator) {
          loadingIndicator.style.backgroundColor = 'rgba(31, 41, 55, 0.9)';
          const loadingText = loadingIndicator.querySelector('p');
          if (loadingText) loadingText.style.color = 'white';
        }
        
        item.forEach(detailItem => {
          detailItem.style.backgroundColor = '#3F3F3F';
          detailItem.style.boxShadow = 'none';
        });
        label.forEach(labels => {
          labels.style.color = 'white';
        });
        value.forEach(values => {
          values.style.color = 'white';
        });
        if (temp) temp.style.color = 'white';
        if (tempture) tempture.style.color = 'white';
        if (h1) h1.style.color = 'white';
      });

      newLightButton.addEventListener('click', function () {
        setIsDarkMode(false);
        if (weatherCard) {
          weatherCard.classList.remove('darkback');
          weatherCard.classList.add('lightback');
        }
        
        if (loadingIndicator) {
          loadingIndicator.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
          const loadingText = loadingIndicator.querySelector('p');
          if (loadingText) loadingText.style.color = '#4b5563';
        }
        
        item.forEach(detailItem => {
          detailItem.style.backgroundColor = '#EFF6FFCC';
          detailItem.style.boxShadow =
            '2px 2px 5px rgba(0, 0, 0, 0.1), -2px -2px 5px rgba(255, 255, 255, 0.8)';
        });
        label.forEach(labels => {
          labels.style.color = '#6b7280';
        });
        value.forEach(values => {
          values.style.color = '#1f2937';
        });
        if (temp) temp.style.color = '#1f2937';
        if (tempture) tempture.style.color = '#4b5563';
        if (h1) h1.style.color = '#1f2937';
      });
    }
  };

  useEffect(() => {
    // Initial toggle setup
    setTimeout(initializeToggle, 100);
    
    // Add event listener for when weather card is inserted
    const handleWeatherCardInserted = () => {
      setTimeout(initializeToggle, 100);
    };
    
    document.addEventListener('weatherCardInserted', handleWeatherCardInserted);
    
    // Cleanup
    return () => {
      document.removeEventListener('weatherCardInserted', handleWeatherCardInserted);
    };
  }, []);

  return (
    <div className="modeSub">
      <svg
        className={`dark ${isDarkMode ? 'active' : ''}`}
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        viewBox="0 0 24 24"
      >
        <path d="M21 12.79A9 9 0 0 1 12.21 3 7 7 0 1 0 21 12.79z"></path>
      </svg>
      <svg
        className={`light ${!isDarkMode ? 'active' : ''}`}
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        viewBox="0 0 24 24"
      >
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
    </div>
  );
};

export default ModeToggle; 