import * as actions from "../types";

const setPassengersCount = () => ({
  type: actions.SET_PASSENGERS_COUNT_START,
  payload: true,
});

const setPassengersCountSuccess = (count) => ({
  type: actions.SET_PASSENGERS_COUNT_SUCCESS,
  payload: count,
});

const setPassengersCountError = () => ({
  type: actions.SET_PASSENGERS_COUNT_ERROR,
  payload: true,
});

const setPassengersCountAction = (count) => {
  return (dispatch) => {
    dispatch(setPassengersCount());

    try {
      dispatch(setPassengersCountSuccess(count));
    } catch (error) {
      dispatch(setPassengersCountError());
    }
  };
};

const setPriceLimit = () => ({
  type: actions.SET_PRICE_LIMIT_START,
  payload: true,
});

const setPriceLimitSuccess = (priceLimit) => ({
  type: actions.SET_PRICE_LIMIT_SUCCESS,
  payload: priceLimit,
});

const setPriceLimitError = () => ({
  type: actions.SET_PRICE_LIMIT_ERROR,
  payload: true,
});

const setPriceLimitAction = (priceLimit) => {
  return (dispatch) => {
    dispatch(setPriceLimit());

    try {
      dispatch(setPriceLimitSuccess(priceLimit));
    } catch (error) {
      dispatch(setPriceLimitError());
    }
  };
};

const setOrigin = () => ({
    type: actions.SET_ORIGIN_START,
    payload: true,
  });
  
  const setOriginsSuccess = (origin) => ({
    type: actions.SET_ORIGIN_SUCCESS,
    payload: origin,
  });
  
  const setOriginError = () => ({
    type: actions.SET_ORIGIN_ERROR,
    payload: true,
  });
  
  const setOriginAction = (origin) => {
    return (dispatch) => {
      dispatch(setOrigin());
  
      try {
        dispatch(setOriginsSuccess(origin));
      } catch (error) {
        dispatch(setOriginError());
      }
    };
  };

export { setPassengersCountAction, setPriceLimitAction, setOriginAction };
