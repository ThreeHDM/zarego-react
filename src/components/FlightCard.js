import React from "react";

export default function FlightCard({ flight }) {
  const {date, origin, destination, availability} = flight;
  return (
    <div className="flex flex-col items-center bg-white rounded-lg border shadow-md md:flex-row md:max-w-xl w-5/6 m-auto my-5 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 ">
      <div className="flex flex-col justify-between p-4 leading-normal">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {date} - {origin} to {destination}
        </h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          Seats: {availability}
        </p>
      </div>
    </div>
  );
}
