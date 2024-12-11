import React, { useState } from 'react';
import Select from 'react-select';
import { searchCities } from '../api/api.ts';
import Location from './Location.tsx';
import styles from './Search.module.scss';

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

  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      backgroundColor: 'rgba(255, 255, 255, 0.1)', // Transparent white
      border: 'none',
      borderBottom: '1px solid rgba(255, 255, 255, 0.3)',
      borderRadius: '4px',
      boxShadow: 'none',
      color: '#fff',
      padding: '5px',

    }),
    placeholder: (provided: any) => ({
      ...provided,
      color: '#f3e9e9',
      padding: '2px 20px'
    }),
    singleValue: (provided: any) => ({
      ...provided,
      color: '#fff',
      padding: '2px 20px'
    }),
    input: (provided: any) => ({
      ...provided,
      color: '#fff',
    }),
    dropdownIndicator: (provided: any) => ({
      ...provided,
      color: '#f3e9e9',
    }),
    indicatorSeparator: () => ({
      display: 'none',
    }),
    menu: (provided: any) => ({
      ...provided,
      backgroundColor: 'rgba(0, 0, 0, 0.8)', // Dropdown background
      border: '1px solid rgba(255, 255, 255, 0.3)',
      borderRadius: '4px',
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isFocused
        ? 'rgba(255, 255, 255, 0.2)' // Highlighted background
        : 'transparent',
      color: '#fff',
      cursor: 'pointer',
    }),
  };

  return (
    <div className={styles.container} >
      <Select
        styles={customStyles}
        placeholder="Enter city name or pick up current location"
        onInputChange={(value) => {
          if (typeof value === 'string') handleSearch(value);
        }}
        options={cityOptions}
        onChange={handleCityChange}
        isClearable
      />
      <Location />
    </div>
  );
};

export default CitySearch;
