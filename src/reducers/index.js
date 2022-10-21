import { combineReducers } from "redux";
import flightsReducer from "./flightsReducer";
import userPreferencesReducer from "./userPreferencesReducer";

export default combineReducers({
    flights: flightsReducer,
    userPreferences: userPreferencesReducer
});
