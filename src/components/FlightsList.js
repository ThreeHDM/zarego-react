import React, { useEffect } from "react";
import { getFlightsAction } from "../actions/fligthsActions";
import { useDispatch, useSelector } from "react-redux";
import Flight from "./FlightCard";

export const Flights = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getFlights = () => dispatch(getFlightsAction());

    getFlights();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const flights = useSelector((state) => state.flights.list);

  console.log(flights);

  return (
    <>
      <h1 className="text-3xl font-bold underline">FLIGHTS</h1>
      {flights.length === 0
        ? "No flights available..."
        : flights.map((flight, index) => <Flight key={index} flight={flight} />)}
    </>
  );
};
