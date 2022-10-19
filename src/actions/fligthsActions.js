import * as actions from "../types";
import axiosClient from "../config/axios";

const getFlights = () => ({
  type: actions.FETCH_FLIGHTS_START,
  payload: true,
});

const getFlightsSuccess = (flights) => ({
    type: actions.FETCH_FLIGHTS_SUCCESS,
    payload: flights
});

const getFlightsError = () => ({
  type: actions.FETCH_FLIGHTS_ERROR,
  payload: true,
});

const getFlightsAction = () => {
  return async (dispatch) => {
    dispatch(getFlights());

    try {
      const response = await axiosClient.get("/flights");
      dispatch (getFlightsSuccess(response.data))
    } catch (error) {
      dispatch(getFlightsError());
    }
  };
};

export { getFlightsAction };
