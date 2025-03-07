import React, { useEffect } from 'react';

const ModeToggle = () => {
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

    if (weatherCard && darkButton && lightButton) {
      weatherCard.classList.add('lightback');

      darkButton.addEventListener('click', function () {
        weatherCard.classList.remove('lightback');
        weatherCard.classList.add('darkback');
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
        temp.style.color = 'white';
        tempture.style.color = 'white';
        h1.style.color = 'white';
      });

      lightButton.addEventListener('click', function () {
        weatherCard.classList.remove('darkback');
        weatherCard.classList.add('lightback');
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
        temp.style.color = '#1f2937';
        tempture.style.color = '#4b5563';
        h1.style.color = '#1f2937';
      });
    }
  };

  useEffect(() => {
    initializeToggle();
    
    // Add event listener for when weather card is inserted
    const handleWeatherCardInserted = () => {
      initializeToggle();
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
        className="dark"
        xmlns="http://www.w3.org/2000/svg"
        width="35"
        height="35"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        viewBox="1 0 24 21"
      >
        <path d="M21 12.79A9 9 0 0 1 12.21 3 7 7 0 1 0 21 12.79z"></path>
      </svg>
      <svg
        className="light"
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
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