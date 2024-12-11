import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../redux/hooks.ts';
import { updateCityWeather, Weather } from '../../redux/city/slice.ts';
import { getWeather } from '../../api/api.ts';
import { formatUnixTimestamp } from '../../utils/card/date-utils.ts';
import {
  ArrowPathIcon,
  EllipsisHorizontalIcon,
} from '@heroicons/react/24/outline';
import { AiOutlineEye } from 'react-icons/ai';
import { LiaTemperatureLowSolid } from "react-icons/lia";
import { MdWater } from "react-icons/md";
import { WiStrongWind } from 'react-icons/wi';

import styles from './WeatherCard.module.scss';


interface WeatherCardProps {
  weather: Weather;
  selectedCityName: string;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ weather }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

const formattedDate = formatUnixTimestamp(weather.updatedAt || weather.dt);


  const handleDetailNavigation = () => {
    navigate(`/${weather.id}`);
  };

const handleReloadWeather = async () => {
  try {
    const updatedWeather = await getWeather(weather.coord.lat, weather.coord.lon, {
      cacheBuster: Date.now(),
    });
    dispatch(updateCityWeather(updatedWeather));
  } catch (error) {
    console.error('Error updating weather:', error);
  }
};

  return (
    <li className={styles.card}>
      <div className={styles.header}>
        <div className={styles.cityInfo}>
          <div className={styles.iconWithName}>
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={weather.weather[0].description}
              className={styles.weatherIcon}
            />
            <div>
              <h2>
                {weather.name}, {weather.sys.country}
              </h2>
              <p>{formattedDate}</p>
            </div>
          </div>
        </div>
        <ul className={styles.buttons}>
          <li>
            <button onClick={handleDetailNavigation} className={styles.menuButton}>
              <EllipsisHorizontalIcon className={styles.iconButton} />
            </button>
          </li>
          <li>
            <button onClick={handleReloadWeather} className={styles.menuButton}>
              <ArrowPathIcon className={styles.iconButtonReload} />
            </button>
          </li>
        </ul>
      </div>

      <div className={styles.content}>
        <div className={styles.temperature}>
          {Math.round(weather.main.temp)}
          <span className={styles.degree}>°C</span>
        </div>
        <p className={styles.description}>{weather.weather[0].description}</p>
      </div>

      <div className={styles.footer}>
        <ul className={styles.detailsList}>
          <li className={styles.detail}>
            <AiOutlineEye className={styles.iconDetail} />
            <span>Visibility {weather.visibility / 1000}km</span>
          </li>
          <li className={styles.detail}>
            <LiaTemperatureLowSolid className={styles.iconDetail} />
            <span>Feels like {Math.round(weather.main.feels_like)}°C</span>
          </li>
          <li className={styles.detail}>
            <MdWater className={styles.iconDetail} />
            <span>Humidity {weather.main.humidity}%</span>
          </li>
          <li className={styles.detail}>
            <WiStrongWind className={styles.iconDetail} />
            <span>Wind {weather.wind.speed}km/h</span>
          </li>
        </ul>
      </div>
    </li>
  );
};

export default WeatherCard;
