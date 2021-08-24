import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun ,faCloud, faPooStorm, faCloudRain, faSmog, faWind, faSnowflake, faThermometerFull, faThermometerEmpty, faCloudSun } from "@fortawesome/free-solid-svg-icons";

const WeatherCards = ({ weather5Days }) => {

  return (
    <div className="cards">
      {typeof weather5Days !== "undefined" &&
        weather5Days.map((day) => (
          <div>
            <div className="card">
              <div className="container">
                {day.weather[0].description.includes("clear")? (<FontAwesomeIcon size="3x" icon={faSun} />) :
                day.weather[0].description.includes("few") ? (
                  <FontAwesomeIcon size="3x" icon={faCloudSun} />
                ) : day.weather[0].description.includes("clouds") ? (
                  <FontAwesomeIcon size="3x" icon={faCloud} />
                ) : day.weather[0].description.includes("rain") ? (
                  <FontAwesomeIcon size="3x" icon={faCloudRain} />
                ) : day.weather[0].description.includes("haze") ||
                  day.weather[0].description.includes("mist") ? (
                  <FontAwesomeIcon size="3x" icon={faSmog} />
                ) : day.weather[0].description.includes("storm") ||
                  day.weather[0].description.includes("thunder") ? (
                  <FontAwesomeIcon size="3x" icon={faPooStorm} />
                ) : day.weather[0].description.includes("wind") ? (
                  <FontAwesomeIcon size="3x" icon={faWind} />
                ) : day.weather[0].description.includes("snow") ? (
                  <FontAwesomeIcon size="4x" icon={faSnowflake} />
                ) : (
                  ""
                )}
                <h3>{new Date(day.dt * 1000).toLocaleDateString()}</h3>
                <h4>
                  <FontAwesomeIcon
                    size="1x"
                    style={{ color: "red" }}
                    icon={faThermometerFull}
                  />
                  {Math.round(day.temp.max)}&deg;C&nbsp;&nbsp;&nbsp;
                  <FontAwesomeIcon
                    size="1x"
                    style={{ color: "lightskyblue" }}
                    icon={faThermometerEmpty}
                  />
                  {Math.round(day.temp.min)}
                  &deg;C
                </h4>
                <h4>{day.weather[0].description}</h4>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default WeatherCards;
