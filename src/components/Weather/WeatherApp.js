import React, { useState } from "react";
import "./WeatherApp.css";
import "../App/App.css";

import search_icon from "../Assets/search.png";
import clear_icon from "../Assets/clear.png";
import cloud_icon from "../Assets/cloud.png";
import drizzle_icon from "../Assets/drizzle.png";
import rain_icon from "../Assets/rain.png";
import snow_icon from "../Assets/snow.png";
import wind_icon from "../Assets/wind.png";
import humidity_icon from "../Assets/humidity.png";

const WeatherApp = () => {
  let api = "b0c77dd8ccbd3ed8afeeebae26b53b43";

  const [wicon, setWicon] = useState(cloud_icon);
  const [weatherClass, setWeatherClass] = useState("");

  const search = async () => {
    const element = document.getElementsByClassName("cityInput");
    if (element[0].value === "") {
      return 0;
    }
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api}`;

    let response = await fetch(url);
    let data = await response.json();
    const humidity = document.getElementsByClassName("humidity_percent");
    const wind = document.getElementsByClassName("wind_rate");
    const temperature = document.getElementsByClassName("weather_temp");
    const location = document.getElementsByClassName("weather_location");

    humidity[0].innerHTML = data.main.humidity + " %";
    wind[0].innerHTML = Math.floor(data.wind.speed) + " km/h";
    temperature[0].innerHTML = Math.floor(data.main.temp) + "°c";
    location[0].innerHTML = data.name;

    if (data.weather[0].icon === "01d" || data.weather[0].icon === "01n") {
      setWicon(clear_icon);
      setWeatherClass("_sunny");
    } else if (
      data.weather[0].icon === "02d" ||
      data.weather[0].icon === "02n"
    ) {
      setWicon(cloud_icon);
      setWeatherClass("_rain");
    } else if (
      data.weather[0].icon === "03d" ||
      data.weather[0].icon === "03n"
    ) {
      setWicon(drizzle_icon);
      setWeatherClass("_drizzle");
    } else if (
      data.weather[0].icon === "04d" ||
      data.weather[0].icon === "04n"
    ) {
      setWicon(drizzle_icon);
      setWeatherClass("_drizzle");
    } else if (
      data.weather[0].icon === "09d" ||
      data.weather[0].icon === "09n"
    ) {
      setWicon(rain_icon);
      setWeatherClass("_rain");
    } else if (
      data.weather[0].icon === "10d" ||
      data.weather[0].icon === "10n"
    ) {
      setWicon(rain_icon);
      setWeatherClass("_rain");
    } else if (
      data.weather[0].icon === "13d" ||
      data.weather[0].icon === "13n"
    ) {
      setWicon(snow_icon);
      setWeatherClass("_snow");
    } else {
      setWicon(clear_icon);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      search();
    }
  };

  return (
    <div className="_wrapper">
      <h1 className="weather_app">Weather App</h1>
      <div className={`container ${weatherClass}`}>
        <div className="top_bar">
          <input
            type="text"
            onKeyDown={handleKeyPress}
            className="cityInput"
            placeholder="Which city are you interested in?"
          />
          <div
            className="search_icon"
            onClick={() => {
              search();
            }}
          >
            <img src={search_icon} alt="search_icon"></img>
          </div>
        </div>
        <div className="body">
          <div className="body_info">
            <div className="weather_image">
              <img src={wicon} alt="cloud_icon" />
            </div>
            <div className="body_info_title">
              <div className="weather_location">Astana</div>
              <div className="weather_temp">16°C</div>
            </div>
          </div>
          <div className="data_container">
            <div className="element">
              <img src={humidity_icon} alt="" className="icon" />
              <div className="data">
                <div className="humidity_percent">54%</div>
                <div className="text">Humidity</div>
              </div>
            </div>
            <div className="element">
              <img src={wind_icon} alt="" className="icon" />
              <div className="data">
                <div className="wind_rate">12 km/h</div>
                <div className="text">Wind Speed</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="desc">
        This application utilizes the{" "}
        <a
          href="https://openweathermap.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          OpenWeatherMap
        </a>{" "}
        API to provide real-time weather information. Get up-to-date weather
        forecasts and conditions for any location around the world with ease.
      </div>
    </div>
  );
};

export default WeatherApp;
