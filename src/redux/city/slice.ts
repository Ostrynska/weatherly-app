import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Weather {
    wind: any;
    id: number;
    name: string;
    dt: number;
    main: {
        feels_like(feels_like: any): import("react").ReactNode;
        temp: number;
    };
    weather: {
        icon: string;
        description: string;
    }[];
}

interface CityState {
    cityList: Weather[];
}

const initialState: CityState = {
    cityList: [],
};

const citySlice = createSlice({
    name: 'city',
    initialState,
    reducers: {
        addCityWeather: (state, action: PayloadAction<Weather & { name: string }>) => {
            const newCity = action.payload;

            const existingCity = state.cityList.find(
                (city) => city.id === newCity.id
            );

            if (!existingCity) {
                state.cityList.push(newCity);
            }
        },
updateCityWeather: (state, action: PayloadAction<Weather>) => {
  const updatedCity = {
    ...action.payload,
    updatedAt: Date.now() / 1000,
  };

  const cityIndex = state.cityList.findIndex(
    (city) => city.id === updatedCity.id
  );

  if (cityIndex !== -1) {
    state.cityList[cityIndex] = updatedCity;
  }
},

    },
});

export const { addCityWeather, updateCityWeather } = citySlice.actions;

export default citySlice.reducer;

