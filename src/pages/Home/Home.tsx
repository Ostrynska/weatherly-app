import React, { useState } from 'react';
import CitySearch from '../../components/CitySearch.tsx';
import WeatherCard from '../../components/WeatherCard.tsx';
// import LocationPermissionModal from '../../components/LocationPermission';
import { getWeather } from '../../api/api.ts';

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
  // const [showLocationModal, setShowLocationModal] = useState<boolean>(true);

  // const fetchWeatherByLocation = (lat: number, lon: number) => {
  //   getWeather(lat, lon)
  //     .then((data) => {
  //       setWeather(data);
  //       setSelectedCityName(data.name);
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching weather by location:', error);
  //     });
  // };

  // const handleAllowLocation = () => {
  //   setShowLocationModal(false);
  //   if (!navigator.geolocation) {
  //     alert('Geolocation is not supported by your browser.');
  //     return;
  //   }
  //   navigator.geolocation.getCurrentPosition(
  //     (position) => {
  //       const { latitude, longitude } = position.coords;
  //       fetchWeatherByLocation(latitude, longitude);
  //     },
  //     (error) => {
  //       console.error('Error getting location:', error);
  //       alert('Permission to access location was denied.');
  //     }
  //   );
  // };

  // const handleBlockLocation = () => {
  //   setShowLocationModal(false);
  //   alert('You denied access to your location.');
  // };

  const handleCitySelect = async (city: City) => {
    const { lat, lon, name } = city;
    setSelectedCityName(name);
    try {
      const weatherData = await getWeather(lat, lon);
      setWeather(weatherData);
    } catch (error) {
      console.error('Error fetching weather:', error);
    }
  };

  return (
    <>
      {/* {showLocationModal && (
        <LocationPermissionModal
          onAllow={handleAllowLocation}
          onBlock={handleBlockLocation}
        />
      )} */}

      <CitySearch onCitySelect={handleCitySelect} />

      <WeatherCard weather={weather} selectedCityName={selectedCityName} />
    </>
  );
};

export default Home;
