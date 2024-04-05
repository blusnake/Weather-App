import React, { useState } from 'react';
import './WeatherApp.css';

function WeatherApp() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');

  const fetchWeatherData = () => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=e682d51dfa306a266a50396fb54c88c8&units=metric`)
      .then(response => {
        if (!response.ok) {
          throw new Error('City not found');
        }
        return response.json();
      })
      .then(data => {
        setWeatherData(data);
        console.log(data);
        setError('');
      })
      .catch(error => {
        setWeatherData(null);
        setError('City not found');
      });
      setCity('');  
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeatherData();
  };


  return (
	<div className="weather-app">
	  <h1 className="weather-app__title">The Weather</h1>
	  <div className="weather-app__form">
		<input
		  className="weather-app__input"
		  type="text"
		  placeholder="Enter city name"
		  value={city}
		  onChange={(e) => setCity(e.target.value)}
		/>
		<button className="weather-app__button" type="submit" onClick={handleSubmit}>Get Weather</button>
	  </div>
	  {error && <p className="weather-app__error">{error}</p>}
	  {weatherData && (
		<div className="weather-app__data">
		  <h2>{weatherData.name}, {weatherData.sys.country}</h2>
      <p>{weatherData.main.temp}°C</p>
      <div className="weather-app__iconAndDesc">
        <img src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`} alt="Weather icon" /> 
		    <p>{weatherData.weather[0].description}</p>
      </div>
		</div>
	  )}
	</div>
  );  
}

export default WeatherApp;
