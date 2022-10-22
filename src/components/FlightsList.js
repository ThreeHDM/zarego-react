import React, { useEffect } from "react";
import { getFlightsAction } from "../actions/fligthsActions";

import { useDispatch, useSelector } from "react-redux";
import Flights from "./FlightsCard";
//import { setPriceLimitAction } from "../actions/userPreferencesAction";

export const FlightsList = () => {
  const dispatch = useDispatch();
  const filteredFlights = useSelector((state) => state.userPreferences.filteredFlights);

  

  useEffect(() => {
    dispatch(getFlightsAction());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {filteredFlights.length === 0
        ? (<p className="m-auto mt-5 p-6 bg-white rounded-lg border border-gray-200 shadow-md w-5/6 lg:w-1/2 italic">Elige el origen, cantidad de pasajeros y el limite de precio que desas para tus vuelos</p>)
        : filteredFlights.map((flights, index) => (
            <Flights key={index} flights={flights} />
          ))}
    </>
  );
};
