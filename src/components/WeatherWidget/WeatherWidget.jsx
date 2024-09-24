// WeatherWidget.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './WeatherWidget.css';

const WeatherWidget = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Access the API key using import.meta.env (Vite)
  const API_KEY = import.meta.env.VITE_OPENWEATHERMAP_API_KEY;

  useEffect(() => {
    const fetchWeatherData = async (latitude, longitude) => {
      try {
        // API call to OpenWeatherMap
        const response = await axios.get(
          'https://api.openweathermap.org/data/2.5/weather',
          {
            params: {
              lat: latitude,
              lon: longitude,
              units: 'metric', // Use 'imperial' for Fahrenheit
              appid: API_KEY,
            },
          }
        );
        setWeatherData(response.data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
        setError('Unable to fetch weather data.');
      } finally {
        setLoading(false);
      }
    };

    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            fetchWeatherData(latitude, longitude);
          },
          (error) => {
            console.error('Error getting location:', error);
            setError('Unable to retrieve your location.');
            setLoading(false);
          }
        );
      } else {
        console.error('Geolocation is not supported by this browser.');
        setError('Geolocation is not supported by your browser.');
        setLoading(false);
      }
    };

    getLocation();
  }, [API_KEY]);

  if (loading) {
    return <div className="weather-widget">Loading weather...</div>;
  }

  if (error) {
    return <div className="weather-widget">{error}</div>;
  }

  if (!weatherData) {
    return <div className="weather-widget">No weather data available.</div>;
  }

  // Extract necessary data
  const { main, weather, name } = weatherData;
  const temperature = main.temp.toFixed(1);
  const weatherDescription = weather[0].description;
  const iconCode = weather[0].icon;

  return (
    <div className="menu-button" id="weather-widget">
      <div className="weather-location">{name}</div>
      <div className="weather-info">
        <img
          src={`https://openweathermap.org/img/wn/${iconCode}@2x.png`}
          alt={weatherDescription}
          className="weather-icon"
        />
        <div className="weather-details">
          <div className="weather-temp">{temperature}°C</div>
          <div className="weather-desc">{weatherDescription}</div>
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;
