import React from "react";
import BagIcon from "./icons/BagIcon";
import MediumLuggageIcon from "./icons/MediumLuggageIcon";
import BigLuggageIcon from "./icons/BigLuggageIcon";

const airportCodeToCityName = (code) => {
  switch (code) {
    case "BRC":
      return "Bariloche";
    case "MDZ":
      return "Mendoza";
    case "COR":
      return "Córdoba";
    case "EPA":
      return "El Palomar";
    default:
      return "";
  }
};

export default function FlightCard({ flights }) {
  const fromFlight = flights[0];
  const returnFlight = flights[1];

  const fromDate = new Date(fromFlight.date);
  const returnDate = new Date(returnFlight.date);
  const totalDays = Math.ceil(
    (returnDate.getTime() - fromDate.getTime()) / (1000 * 3600 * 24)
  );

  return (
    <>
      <div className="m-auto mt-5 bg-white rounded-lg shadow-md w-5/6 lg:w-1/2">
        <div className="flex flex-row bg-gray-100 p-2 rounded-t-lg">
          <h1 className="ml-2 uppercase font-bold text-gray-700">
            {airportCodeToCityName(fromFlight.destination)}
          </h1>
          <p className="ml-2 text-gray-700">{totalDays} días</p>
        </div>

        <div className="mt-2 flex md:flex-row flex-col mx-6 sm:justify-between">
          <div className="flex flex-row place-items-center p-2">
            <img
              src="https://www.zarego.com/wp-content/uploads/2017/12/logo-sticky-1-1.png"
              alt="zarego logo"
              className="w-24"
            />
          </div>

          <div className="flex flex-row p-2">
            <div className="flex flex-col p-2 text-gray-700">
              <p className="font-bold uppercase">Ida</p>
              <p>
                <span>
                  {fromFlight.origin}-{fromFlight.destination}
                </span>
              </p>
              <p>{fromFlight.date}</p>
              <p>Asientos: {fromFlight.availability}</p>
            </div>

            <div className="flex flex-col p-2">
              <p className="font-bold uppercase">Vuelta</p>
              <p>
                <span>
                  {returnFlight.origin}-{returnFlight.destination}
                </span>
              </p>
              <p>{returnFlight.date}</p>
              <p>Asientos: {returnFlight.availability}</p>
            </div>
          </div>

          <div className="flex flex-row place-items-center p-2">
            <BagIcon />
            <MediumLuggageIcon />
            <BigLuggageIcon />
          </div>
        </div>

        <div className="mt-4 bg-gray-100 flex flex-row md:flex-nowrap rounded-b-lg">
          <div className="flex mx-6 py-4 flex-row w-full">
            <div className="text-sm mx-2 flex flex-col">
              <p className="">Costo Total</p>
              <p className="font-bold">
                ${(fromFlight.price + returnFlight.price).toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
