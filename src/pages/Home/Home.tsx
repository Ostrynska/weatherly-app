import React, { useState } from 'react';
import Search from '../../components/Search/Search';
import WeatherCard from '../../components/WeatherCard/WeatherCard';
import { getWeather } from '../../api/api';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { addCityWeather, Weather } from '../../redux/city/slice';

import styles from './Home.module.scss';

interface City {
  lat: number;
  lon: number;
  name: string;
}

const Home: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [weather, setWeather] = useState<Weather | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedCityName, setSelectedCityName] = useState<string>('');
  const dispatch = useAppDispatch();

  const cityList = useAppSelector((state) => state.city.cityList);

  const handleCitySelect = async (city: City) => {
    const { lat, lon, name } = city;
    setSelectedCityName(name);
    try {
      const weatherData = await getWeather(lat, lon, { cacheBuster: Date.now() });
      setWeather(weatherData);
      dispatch(addCityWeather({ ...weatherData, name }));
    } catch (error) {
      console.error('Error fetching weather:', error);
    }
  };

  return (
    <section className={styles.section}>
      <Search onCitySelect={handleCitySelect} />

      <ul className={styles.weatherList}>
      {[...cityList].reverse().map((city) => (
        <WeatherCard key={city.id} weather={city} selectedCityName={city.name} />
      ))}
      </ul>
    </section>
  );
};

export default Home;
