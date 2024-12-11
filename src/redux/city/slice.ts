import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Weather {
    visibility: number;
    id: number;
    name: string;
    dt: number;
    updatedAt: number;
    coord: {
        lat: number;
        lon: number;
    };
    main: {
        pressure: number;
        humidity: number;
        feels_like: number;
        temp: number;
    };
    weather: {
        icon: string;
        description: string;
    }[];
    wind: {
        speed: number;
    };
    sys: {
        sunset: number;
        sunrise: number;
        country: string;
    };
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
