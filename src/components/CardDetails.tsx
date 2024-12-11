import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppSelector } from '../redux/hooks.ts';
import { ChevronDoubleLeftIcon, ChevronLeftIcon } from '@heroicons/react/24/outline';
import HourlyForecastGraph from './HourlyForecastGraph.tsx';
import styles from './CardDetails.module.scss';

const CardDetails: React.FC = () => {
  const [hovered, setHovered] = useState(false);
  const [hourlyForecast, setHourlyForecast] = useState([]);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const city = useAppSelector((state) =>
    state.city.cityList.find((city) => city.id.toString() === id)
  );

  useEffect(() => {
    if (city) {
      const fetchHourlyForecast = async () => {
        try {
          const response = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${city.coord.lat}&lon=${city.coord.lon}&appid=${process.env.REACT_APP_API_WEATHER}&units=metric`
          );
          const data = await response.json();
          setHourlyForecast(data.list.slice(0, 8)); // Take the first 8 entries (24 hours)
        } catch (error) {
          console.error('Error fetching hourly forecast:', error);
        }
      };
      fetchHourlyForecast();
    }
  }, [city]);

  if (!city) {
    return (
      <div className={styles.center}>
        <h1 className={styles.notFound}>City not found!</h1>
      </div>
    );
  }

  const cityDate = new Date(city.dt * 1000);
  const formattedDate = `${cityDate.toLocaleDateString('en-GB', {
    weekday: 'long',
  })} | ${cityDate.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })}`;

  return (
    <div className={styles.cardDetails}>
      {/* Back Button and City Name */}
      <div
        className={styles.header}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
      >
        <button onClick={() => navigate(-1)} className={styles.buttonBack}>
          {hovered ? (
            <ChevronLeftIcon className={styles.iconLocation} />
          ) : (
            <ChevronDoubleLeftIcon className={styles.iconLocation} />
          )}
        </button>
        <span className={styles.location}>
          <span role="img" aria-label="location">
            📍
          </span>
          {city.name}
        </span>
      </div>

      {/* Weather Description */}
      <div className={styles.weatherDescription}>
        {city.weather[0].description}
      </div>

      {/* Temperature and Date */}
      <div className={styles.temperatureSection}>
        <div className={styles.temperature}>
          {Math.round(city.main.temp)}°C
        </div>
        <div className={styles.date}>{formattedDate}</div>
      </div>

      {/* Hourly Forecast Graph */}
      <HourlyForecastGraph hourlyData={hourlyForecast} />

      {/* Additional Air Conditions */}
      <div className={styles.airConditions}>
        <h3 className={styles.conditionsTitle}>Air Conditions</h3>
        <p>
          <span role="img" aria-label="temperature">
            🌡️
          </span>{' '}
          Real Feel: {Math.round(city.main.feels_like)}°C
        </p>
        <p>
          <span role="img" aria-label="wind">
            💨
          </span>{' '}
          Wind: {city.wind.speed} km/hr
        </p>
        <p>
          <span role="img" aria-label="rain">
            ☔
          </span>{' '}
          Chance of rain: 2%
        </p>
        <p>
          <span role="img" aria-label="uv index">
            🌞
          </span>{' '}
          UV Index: 4
        </p>
      </div>
    </div>
  );
};

export default CardDetails;
