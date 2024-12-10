import React, { useState } from 'react';
import CitySearch from '../../components/CitySearch';
import WeatherCard from '../../components/WeatherCard';
// import LocationPermissionModal from '../../components/LocationPermission';
import { getWeather } from '../../api/api';

const Home = () => {
  const [weather, setWeather] = useState(null);
  const [selectedCityName, setSelectedCityName] = useState('');
  //   const [showLocationModal, setShowLocationModal] = useState(true);

  //   const fetchWeatherByLocation = (lat, lon) => {
  //     getWeather(lat, lon)
  //       .then((data) => {
  //         setWeather(data);
  //         setSelectedCityName(data.name);
  //       })
  //       .catch((error) => {
  //         console.error('Error fetching weather by location:', error);
  //       });
  //   };

  //   const handleAllowLocation = () => {
  //     setShowLocationModal(false);
  //     if (!navigator.geolocation) {
  //       alert('Geolocation is not supported by your browser.');
  //       return;
  //     }
  //     navigator.geolocation.getCurrentPosition(
  //       (position) => {
  //         const { latitude, longitude } = position.coords;
  //         fetchWeatherByLocation(latitude, longitude);
  //       },
  //       (error) => {
  //         console.error('Error getting location:', error);
  //         alert('Permission to access location was denied.');
  //       }
  //     );
  //   };

  //   const handleBlockLocation = () => {
  //     setShowLocationModal(false);
  //     alert('You denied access to your location.');
  //   };

  const handleCitySelect = async ({ lat, lon, name }) => {
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
