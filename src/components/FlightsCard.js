import React from "react";

export default function FlightCard({ flights }) {
  
  const fromFlight = flights[0];
  const returnFlight = flights[1];

  return (
    <>
    Total del viaje: {fromFlight.price + returnFlight.price}
    <div className="flex flex-col items-center bg-white rounded-lg border shadow-md md:flex-row w-5/6 m-auto my-5 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 ">
      <div className="flex flex-col justify-between p-4 leading-normal">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {fromFlight.date} - {fromFlight.origin} to {fromFlight.destination}
        </h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          Seats: {fromFlight.availability}
        </p>
      </div>
    </div>
    <div className="flex flex-col items-center bg-white rounded-lg border shadow-md md:flex-row w-5/6 m-auto my-5 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 ">
      <div className="flex flex-col justify-between p-4 leading-normal">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {returnFlight.date} - {returnFlight.origin} to {returnFlight.destination}
        </h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          Seats: {returnFlight.availability}
        </p>
      </div>
    </div>
    
    </>
  );
}
