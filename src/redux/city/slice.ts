import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
        addCityWeather: (state, action: PayloadAction<Weather & { name: string }>) =>
        {
            const newCity = action.payload;

            const existingCity = state.cityList.find(
                (city) => city.id === newCity.id
            );

            if (!existingCity) {
                state.cityList.push(newCity); // Додаємо нове місто
            }
        }
    }
});

export const { addCityWeather } = citySlice.actions;

export default citySlice.reducer;
