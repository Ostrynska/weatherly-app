import React from 'react';
// import { useNavigate } from 'react-router-dom';
import {
  EllipsisHorizontalIcon,
  ArrowPathIcon,
} from '@heroicons/react/24/outline';

import styles from './WeatherCard.module.scss';

interface Weather {
  id: number;
  name: string;
  dt: number;
  main: {
    temp: number;
  };
  weather: {
    icon: string;
    description: string;
  }[];
}

interface WeatherCardProps {
  weather: Weather | null;
  selectedCityName: string;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ weather, selectedCityName }) =>
{
  // const navigate = useNavigate();

  if (!weather) {
    return <p>Select a city or allow location access to see the weather.</p>;
  }

  const formatUnixTimestamp = (dt: number): string => {
    const date = new Date(dt * 1000);
    const options: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
      weekday: 'long',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    };
    return date.toLocaleString('en-GB', options);
  };

  const formattedDate = formatUnixTimestamp(weather.dt);

  // const handleDetailNavigation = () => {
  //   navigate(`/${weather.id}`);
  // };

  return (
    <div className={styles.card}>
      <div className={styles.buttons}>
        <ArrowPathIcon className={styles.iconButton} />
        <EllipsisHorizontalIcon
          className={styles.iconButton}
          // onClick={handleDetailNavigation}
        />
      </div>

      <div>
        <p className={styles.temperature}>
          {Math.round(weather.main.temp)}
          <span className={styles.degree}>°</span>
        </p>
      </div>

      <div>
        <h2 className={styles.city}>{selectedCityName || weather.name}</h2>
        <p className={styles.date}>{formattedDate}</p>
      </div>

      <div>
        <img
          src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          alt={weather.weather[0].description}
          className={styles.icon}
        />
      </div>
    </div>
  );
};

export default WeatherCard;
