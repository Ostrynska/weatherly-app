import { combineReducers } from '@reduxjs/toolkit';
import cityReducer from "./city/slice.ts";

const rootReducer = combineReducers({
    city: cityReducer,
});

export default rootReducer;
