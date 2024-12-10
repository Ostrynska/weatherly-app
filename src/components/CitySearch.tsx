import React, { useState } from 'react';
import Select from 'react-select';
import { searchCities } from '../api/api.ts';

interface CityOption {
  label: string;
  value: {
    lat: number;
    lon: number;
    name: string;
  };
}

interface CitySearchProps {
  onCitySelect: (city: { lat: number; lon: number; name: string }) => void;
}

const CitySearch: React.FC<CitySearchProps> = ({ onCitySelect }) => {
  const [cityOptions, setCityOptions] = useState<CityOption[]>([]);

  const handleSearch = async (inputValue: string) => {
    if (!inputValue.trim()) return;

    try {
      const cities = await searchCities(inputValue);

      const uniqueCities = cities.filter(
        (city: any, index: number, self: any[]) =>
          index ===
          self.findIndex(
            (c) =>
              c.name === city.name &&
              c.country === city.country &&
              (c.state || '') === (city.state || '')
          )
      );

      setCityOptions(
        uniqueCities.map((city: any) => ({
          label: `${city.name}${city.state ? ', ' + city.state : ''}, ${city.country}`,
          value: { lat: city.lat, lon: city.lon, name: city.name },
        }))
      );
    } catch (error) {
      console.error('Error searching cities:', error);
    }
  };

  const handleCityChange = (option: CityOption | null) => {
    if (!option) return;
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
      isClearable
    />
  );
};

export default CitySearch;
