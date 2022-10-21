import React, { useMemo } from "react";
import {
  setOriginAction,
  setPassengersCountAction,
  setPriceLimitAction,
} from "../actions/userPreferencesAction";

import { useDispatch, useSelector } from "react-redux";

const getAirportsListsFromFlights = (flights) => {
  return [...new Set(flights.map((e) => e.origin))];
};

export default function Form() {
  const dispatch = useDispatch();

  let passengersCount = useSelector(
    (state) => state.userPreferences.passengersCount
  );
  let priceLimit = useSelector((state) => state.userPreferences.priceLimit);

  const flights = useSelector((state) => state.flights.list);

  const airportsList = useMemo(
    () => getAirportsListsFromFlights(flights),
    [flights]
  );

  const setOrigin = (origin) => {
    dispatch(setOriginAction(origin));
  };

  const priceValue = (priceLimit) => {
    dispatch(setPriceLimitAction(Number(priceLimit)));
  };

  const increment = () => {
    dispatch(setPassengersCountAction((passengersCount += 1)));
  };

  const decrement = () => {
    dispatch(
      setPassengersCountAction(passengersCount > 1 ? (passengersCount -= 1) : 1)
    );
  };

  return (
    <form className="m-auto mt-5 p-6 bg-white rounded-lg border border-gray-200 shadow-md w-5/6">
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            Origen
          </label>
          <select
            onChange={(e) => setOrigin(e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          >
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
              onClick={decrement}
              className="text-center bg-gray-200 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer"
            >
              <span className="m-auto text-2xl font-thin p-5">−</span>
            </div>
            <div className="bg-gray-200 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center  text-gray-700 px-6">
              {passengersCount}
            </div>
            <div
              onClick={increment}
              className="text-center bg-gray-200 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer"
            >
              <span className="m-auto text-2xl font-thin p-5">+</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-6">
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
        </div>
      </div>
    </form>
  );
}
