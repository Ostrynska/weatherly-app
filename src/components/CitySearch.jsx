import React, { useState } from 'react';
import Select from 'react-select';
import { searchCities } from '../api/api';

const CitySearch = ({ onCitySelect }) => {
  const [cityOptions, setCityOptions] = useState([]);

  const handleSearch = async (inputValue) => {
    if (typeof inputValue !== 'string' || inputValue.trim() === '') return;

    try {
      const cities = await searchCities(inputValue);
      const uniqueCities = cities.filter(
        (city, index, self) =>
          index ===
          self.findIndex(
            (c) =>
              c.name === city.name &&
              c.country === city.country &&
              (c.state || '') === (city.state || '')
          )
      );

      setCityOptions(
        uniqueCities.map((city) => ({
          label: `${city.name}${city.state ? ', ' + city.state : ''}, ${city.country}`,
          value: { lat: city.lat, lon: city.lon },
        }))
      );
    } catch (error) {
      console.error('Error searching cities:', error);
    }
  };

  const handleCityChange = (option) => {
    if (!option || !option.value) return;
    onCitySelect(option.value);
  };

  return (
    <Select
      placeholder="Search city, region..."
      onInputChange={(value) => {
        if (typeof value === 'string') handleSearch(value);
      }}
      options={cityOptions}
      onChange={handleCityChange}
    />
  );
};

export default CitySearch;
