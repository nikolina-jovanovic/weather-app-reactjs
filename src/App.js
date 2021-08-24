import "./styles.css";
import { useState, useEffect } from "react";
import axios from "axios";
import WeatherCards from "./WeatherCards";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun ,faCloud, faPooStorm, faCloudRain, faSmog, faWind, faCloudSun, faSnowflake, faThermometerFull, faThermometerEmpty } from "@fortawesome/free-solid-svg-icons";

export default function App() {
  const [weatherCurrent, setWeatherCurrent] = useState({
    name: "",
    country: "",
    currentTemp: "",
    maxTemp: "",
    minTemp: "",
    description: ""
  });
  const [enterClicked, setEnterClicked] = useState(false);
  const [query, setQuery] = useState("Sarajevo");
  const [weather5Days, setWeather5Days] = useState([]);


  const api_key = "76e31035647ed56273542cb193f44ac9";

  //Current weather data fetching:

  useEffect(() => {
    async function fetchCurrentWeather() {
      await axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=${api_key}`
        )
        .then((res) => {
          //console.log(res.data);
          setWeatherCurrent({
            ...weatherCurrent,
            name: res.data.name,
            country: res.data.sys.country,
            currentTemp: Math.round(res.data.main.temp),
            maxTemp: Math.round(res.data.main.temp_max),
            minTemp: Math.round(res.data.main.temp_min),
            description: res.data.weather[0].description,
            lat: res.data.coord.lat,
            lon: res.data.coord.lon
          });
        })
        .catch((err) => console.log(err));
    }
    fetchCurrentWeather();

    setEnterClicked(false);
  }, [enterClicked]);

  //5-days forecast data fetching:

  useEffect(() => {
    if (typeof weatherCurrent.lat !== "undefined") {
      async function fetch5DaysWeather() {
        await axios
          .get(
            `https://api.openweathermap.org/data/2.5/onecall?lat=${weatherCurrent.lat}&lon=${weatherCurrent.lon}&exclude=hourly,minutely&units=metric&appid=${api_key}`
          )
          .then((res) => {
            //console.log(res.data.daily);
            const sliced = res.data.daily.slice(1, 6);
            setQuery("");
            setWeather5Days(sliced);
          })
          .catch((err) => console.log(err));
      }
      fetch5DaysWeather();
    } else {
      return;
    }
  }, [weatherCurrent.lat]);

  // Search function:
  
  const search = (evt) => {
    if (evt.key === "Enter") {
      evt.preventDefault();
      setEnterClicked(true);
    }
  };

  return (
    <div className="App">
      <input
        className="search-bar"
        type="text"
        placeholder="Search for the city..."
        onChange={(e) => setQuery(e.target.value)}
        value={query}
        onKeyPress={search}
        autoFocus
      />
      <h1>
        {weatherCurrent.name}, {weatherCurrent.country}
      </h1>
      <span className="icons">
        {weatherCurrent.description.includes("clear") ? (
          <FontAwesomeIcon size="4x" icon={faSun} />
        ) : weatherCurrent.description.includes("few") ? (
          <FontAwesomeIcon size="4x" icon={faCloudSun} />
        ) : weatherCurrent.description.includes("clouds") ? (
          <FontAwesomeIcon size="4x" icon={faCloud} />
        ) : weatherCurrent.description.includes("rain") ? (
          <FontAwesomeIcon size="4x" icon={faCloudRain} />
        ) : weatherCurrent.description.includes("haze") ||
          weatherCurrent.description.includes("mist") ? (
          <FontAwesomeIcon size="4x" icon={faSmog} />
        ) : weatherCurrent.description.includes("storm") ||
          weatherCurrent.description.includes("thunder") ? (
          <FontAwesomeIcon size="4x" icon={faPooStorm} />
        ) : weatherCurrent.description.includes("wind") ? (
          <FontAwesomeIcon size="4x" icon={faWind} />
        ) : weatherCurrent.description.includes("snow") ? (
          <FontAwesomeIcon size="4x" icon={faSnowflake} />
        ) : (
          ""
        )}
      </span>
      <h2 style={{ display: "inline", fontSize: "38px" }}>
        &nbsp;{weatherCurrent.currentTemp}&deg;C
      </h2>
      <h3>
        {" "}
        <FontAwesomeIcon
          size="1x"
          style={{ color: "red" }}
          icon={faThermometerFull}
        />
        {weatherCurrent.maxTemp}&deg;C&nbsp;&nbsp;&nbsp;&nbsp;{" "}
        <FontAwesomeIcon
          size="1x"
          style={{ color: "lightskyblue" }}
          icon={faThermometerEmpty}
        />{" "}
        {weatherCurrent.minTemp}&deg;C
      </h3>
      <h3
        style={{
          background: "rgba(3, 3, 3, 0.3)",
          display: "inline",
          padding: "7px",
          borderRadius: "3px"
        }}
      >
        {weatherCurrent.description}
      </h3>

      <div>
        <WeatherCards weather5Days={weather5Days} />
      </div>
    </div>
  );
}
