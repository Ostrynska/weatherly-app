import React, { useEffect, useState } from 'react';
import CitySearch from '../../components/CitySearch.tsx';
import WeatherCard from '../../components/WeatherCard.tsx';
import { getWeather } from '../../api/api.ts';
import { useAppDispatch, useAppSelector } from '../../redux/hooks.ts';
import { addCityWeather } from '../../redux/city/slice.ts';

import styles from './Home.module.scss';

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

interface City {
  lat: number;
  lon: number;
  name: string;
}

const Home: React.FC = () => {
  const [weather, setWeather] = useState<Weather | null>(null);
  const [selectedCityName, setSelectedCityName] = useState<string>('');
  const dispatch = useAppDispatch();

  const cityList = useAppSelector((state) => state.city.cityList);

  const handleCitySelect = async (city: City) => {
    const { lat, lon, name } = city;
    setSelectedCityName(name);
    try {
      const weatherData = await getWeather(lat, lon);
      setWeather(weatherData);
      dispatch(addCityWeather({ ...weatherData, name }));
    } catch (error) {
      console.error('Error fetching weather:', error);
    }
  };

  useEffect(() => {
    if (selectedCityName) {
      console.log('City chosen:', selectedCityName);
    }
  }, [selectedCityName]);

  useEffect(() => {
    if (weather) {
      console.log('City weather data:', weather);
    }
  }, [weather]);

  return (
    <section className={styles.section}>
      <CitySearch onCitySelect={handleCitySelect} />

      <ul className={styles.weatherList}>
        {cityList.map((city) => (
          <WeatherCard key={city.id} weather={city} selectedCityName={city.name} />
        ))}
      </ul>
    </section>
  );
};

export default Home;
