import React, { useMemo } from "react";
import {
  setFilteredFlightsAction,
  setOriginAction,
  setPassengersCountAction,
  setPriceLimitAction,
} from "../actions/userPreferencesAction";

import { useDispatch, useSelector } from "react-redux";

const getAirportsListsFromFlights = (flights) => {
  return [...new Set(flights.map((e) => e.origin))];
};

const getDestinationList = (filteredFlights) => {
  return [...new Set(filteredFlights.map((e) => e[1].origin))];
};

const getFilteredListOfPairedFlights = (
  flightList,
  userOrigin,
  priceLimit,
  passengersCount
) => {
  const fromFlights = flightList
    .filter((e) => e.origin === userOrigin)
    .sort((a, b) => a.price - b.price);

  const returnFlights = flightList
    .filter((e) => e.destination === userOrigin)
    .sort((a, b) => a.price - b.price);

  const fromAndReturnFlightsWhithinPriceDateAndPassengers = [];

  //Choose the smallest array for comparing prices
  const smallerArray =
    fromFlights.length < returnFlights.length ? fromFlights : returnFlights;

  /*
   * pair cheapest fromFlight with cheapest returnFlight if price is within limit, dates are correct
   * and both flights have availability
   */
  for (let i = 0; i < smallerArray.length; i++) {
    if (
      fromFlights[i].price + returnFlights[i].price < priceLimit &&
      new Date(fromFlights[i].date) < new Date(returnFlights[i].date) &&
      fromFlights[i].availability >= passengersCount &&
      returnFlights[1].availability >= passengersCount
    ) {
      fromAndReturnFlightsWhithinPriceDateAndPassengers.push([
        fromFlights[i],
        returnFlights[i],
      ]);
    }
  }

  return fromAndReturnFlightsWhithinPriceDateAndPassengers;
};

export default function Form() {
  const dispatch = useDispatch();
  const passengersCount = useSelector(
    (state) => state.userPreferences.passengersCount
  );
  const priceLimit = useSelector((state) => state.userPreferences.priceLimit);
  const flights = useSelector((state) => state.flights.list);
  const origin = useSelector((state) => state.userPreferences.origin);
  const filteredFlights = useSelector(
    (state) => state.userPreferences.filteredFlights
  );

  const airportsList = useMemo(
    () => getAirportsListsFromFlights(flights),
    [flights]
  );

  const destinationsList = useMemo(
    () => getDestinationList(filteredFlights),
    [filteredFlights]
  );

  const setOrigin = (origin) => {
    dispatch(setOriginAction(origin));
    dispatch(
      setFilteredFlightsAction(
        getFilteredListOfPairedFlights(
          flights,
          origin,
          priceLimit,
          passengersCount
        )
      )
    );
  };

  const priceValue = (priceLimit) => {
    dispatch(setPriceLimitAction(Number(priceLimit)));
    dispatch(
      setFilteredFlightsAction(
        getFilteredListOfPairedFlights(
          flights,
          origin,
          priceLimit,
          passengersCount
        )
      )
    );
  };

  const incrementPassengers = () => {
    dispatch(setPassengersCountAction(passengersCount + 1));
    dispatch(
      setFilteredFlightsAction(
        getFilteredListOfPairedFlights(
          flights,
          origin,
          priceLimit,
          passengersCount
        )
      )
    );
  };

  const decrementPassengers = () => {
    dispatch(
      setPassengersCountAction(passengersCount > 1 ? passengersCount - 1 : 1)
    );
    dispatch(
      setFilteredFlightsAction(
        getFilteredListOfPairedFlights(
          flights,
          origin,
          priceLimit,
          passengersCount
        )
      )
    );
  };

  return (
    <form className="m-auto mt-5 p-6 bg-white rounded-lg border border-gray-200 shadow-md w-5/6 lg:w-1/2">
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            Origen
          </label>
          <select
            onChange={(e) => setOrigin(e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          >
            <option>-- Selecciona el aeropuerto --</option>
            {airportsList.map((airport) => {
              return <option key={airport}>{airport}</option>;
            })}
          </select>
        </div>
        <div className="w-full md:w-1/2 px-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            Cantidad de pasajeros
          </label>

          <div className="flex flex-row h-10 w-1/3 rounded-lg mt-2">
            <div
              onClick={decrementPassengers}
              className="text-center bg-gray-200 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer"
            >
              <span className="m-auto text-2xl font-thin p-5">−</span>
            </div>
            <div className="bg-gray-200 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center  text-gray-700 px-6">
              {passengersCount}
            </div>
            <div
              onClick={incrementPassengers}
              className="text-center bg-gray-200 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer"
            >
              <span className="m-auto text-2xl font-thin p-5">+</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap -mx-3">
        <div className="w-full px-3">
          <label
            htmlFor="price-range"
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          >
            Limite de Precio: ${priceLimit}
          </label>
          <input
            id="price-range"
            type="range"
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            min="100"
            max="2000"
            step="100"
            value={priceLimit}
            onChange={(e) => priceValue(e.target.value)}
          />

          <p className="text-gray-600 text-xs italic">
            Escoge un número límite para el costo de tus pasajes
          </p>

          <p className="block uppercase tracking-wide text-gray-700 text-sm font-medium mt-5">
            Vuelos disponibles:{" "}
            <span className="font-normal">{filteredFlights.length}</span>
          </p>

          <p className="block uppercase tracking-wide text-gray-700 text-sm font-medium mt-5">
            Destinos Disponibles:{" "}
            {destinationsList.map((e, index, arr) => (
              <span className="font-normal" key={index}>
                {e}{index !== arr.length - 1 ? ", " :  " " }
              </span>
            ))}
          </p>
        </div>
      </div>
    </form>
  );
}
