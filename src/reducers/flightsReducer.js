import * as actions from "../types";

const initialState = {
  list: [],
  error: false,
  loading: false,
};

const flightsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.FETCH_FLIGHTS_START:
      return {
        ...state,
        loading: action.payload,
      };
    case actions.FETCH_FLIGHTS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case actions.FETCH_FLIGHTS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        list: action.payload,
      };
    default:
      return state;
  }
};

export default flightsReducer;
