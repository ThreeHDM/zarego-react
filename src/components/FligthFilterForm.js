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
  origin,
  priceLimit,
  passengers
) => {
  const fromFlights = flightList
    .filter((e) => e.origin === origin)
    .sort((a, b) => a.price - b.price);

  const returnFlights = flightList
    .filter((e) => e.destination === origin)
    .sort((a, b) => a.price - b.price);

  const returnAndFromFlightsWithinPriceLimit = [];

  const smallerArray =
    fromFlights.length < returnFlights.length ? fromFlights : returnFlights;

  //pair cheapest fromFlight with cheapest returnFlight
  for (let i = 0; i < smallerArray.length; i++) {
    if (fromFlights[i].price + returnFlights[i].price < priceLimit) {
      returnAndFromFlightsWithinPriceLimit.push([
        fromFlights[i],
        returnFlights[i],
      ]);
    }
  }

  //filter paired flights removing the ones with conflicting dates and not enough seats
  return returnAndFromFlightsWithinPriceLimit
    .filter((e) => {
      const fromTripDate = new Date(e[0].date);
      const returnTripDate = new Date(e[1].date);
      return fromTripDate < returnTripDate;
    })
    .filter(
      (e) => e[0].availability >= passengers && e[1].availability >= passengers
    );
};

export default function Form() {
  const dispatch = useDispatch();
  let passengersCount = useSelector(
    (state) => state.userPreferences.passengersCount
  );
  let priceLimit = useSelector((state) => state.userPreferences.priceLimit);
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
    dispatch(setPassengersCountAction((passengersCount += 1)));
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
      setPassengersCountAction(passengersCount > 1 ? (passengersCount -= 1) : 1)
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

          <div className="flex flex-row h-10 w-1/3 rounded-lg mt-1">
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
            className="block mb-2 text-sm font-medium text-gray-700"
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

          <p className="mt-5">Vuelos disponibles: {filteredFlights.length}</p>

          <p>
            Destinos Disponibles:
            {destinationsList.map((e, index) => (
              <span key={index}> {e} </span>
            ))}{" "}
          </p>
        </div>
      </div>
    </form>
  );
}
