import * as actions from "../types";

const initialState = {
  passengersCount: 1,
  priceLimit: 300,
  origin: "",
  error: false,
  loading: false,
};

const userPreferencesReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.SET_PASSENGERS_COUNT_START:
      return {
        ...state,
        loading: action.payload,
      };
    case actions.SET_PASSENGERS_COUNT_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case actions.SET_PASSENGERS_COUNT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        passengersCount: action.payload,
      };
    case actions.SET_PRICE_LIMIT_START:
      return {
        ...state,
        loading: action.payload,
      };
    case actions.SET_PRICE_LIMIT_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case actions.SET_PRICE_LIMIT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        priceLimit: action.payload,
      };
      case actions.SET_ORIGIN_START:
      return {
        ...state,
        loading: action.payload,
      };
    case actions.SET_ORIGIN_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case actions.SET_ORIGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        origin: action.payload,
      };
    default:
      return state;
  }
};

export default userPreferencesReducer;
