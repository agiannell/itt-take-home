import { useEffect, useState, useRef } from "react";
import axios from "axios";

const Weather = (props) => {
  const [weather, setWeather] = useState(null),
    isMounted = useRef(true);

  const getWeather = () => {
    axios
      .get("/api/weather")
      .then((res) => {
        if (isMounted.current) {
          setWeather({
            temp: res.data.main.temp,
            temp_min: res.data.main.temp_min,
            temp_max: res.data.main.temp_max,
            icon: res.data.weather[0].icon,
            description: res.data.weather[0].description,
          });
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getWeather();

    return () => (isMounted.current = false);
  }, []);

  return (
    <section className="weather-container">
      <section className="weather-temp">
        <h3>{weather?.temp.toFixed(0)}&deg;F</h3>
        <p>Low: {weather?.temp_min.toFixed(0)}</p>
        <p>High: {weather?.temp_max.toFixed(0)}</p>
      </section>
      <section className="weather-condition">
        {weather?.icon ? (
          <p>
            <img
              src={`http://openweathermap.org/img/wn/${weather?.icon}@2x.png`}
              alt={weather?.description}
            />
          </p>
        ) : null}
        <p>{weather?.description}</p>
      </section>
    </section>
  );
};

export default Weather;
