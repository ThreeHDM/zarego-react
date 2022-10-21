import React, { useEffect } from "react";
import { getFlightsAction } from "../actions/fligthsActions";

import { useDispatch, useSelector } from "react-redux";
import Flight from "./FlightCard";
import FligthFilterForm from "./FligthFilterForm";

export const FlightsList = () => {
  const dispatch = useDispatch();

  const flights = useSelector((state) => state.flights.list);

  useEffect(() => {
    dispatch(getFlightsAction());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <FligthFilterForm />
      {flights.length === 0
        ? "No flights available..."
        : flights.map((flight, index) => (
            <Flight key={index} flight={flight} />
          ))}
    </>
  );
};
