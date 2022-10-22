import React from "react";

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
              <p>
                Asientos: {fromFlight.availability}
              </p>
            </div>

            <div className="flex flex-col p-2">
              <p className="font-bold uppercase">Vuelta</p>
              <p >
                <span >
                  {returnFlight.origin}-{returnFlight.destination}
                </span>
              </p>
              <p>{returnFlight.date}</p>
              <p>
                Asientos: {returnFlight.availability}
              </p>
            </div>
          </div>

          <div className="flex flex-row place-items-center p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1.5em"
              height="1.5em"
              preserveAspectRatio="xMidYMid meet"
              viewBox="-2 -4 24 24"
            >
              <path
                fill="#03a691"
                d="M15 6v8h-2V6H7v8H5V6a3 3 0 0 0-3 3v2a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V9a3 3 0 0 0-3-3zM7.17 4h5.66a3.004 3.004 0 0 0-5.66 0zM5.1 4a5.002 5.002 0 0 1 9.8 0h.1a5 5 0 0 1 5 5v2a5 5 0 0 1-5 5H5a5 5 0 0 1-5-5V9a5 5 0 0 1 5-5h.1z"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1.5em"
              height="1.5em"
              preserveAspectRatio="xMidYMid meet"
              viewBox="0 0 16 16"
            >
              <path
                fill="#03a691"
                d="M5.333 1.5a.5.5 0 0 1 .5-.5h4.333a.5.5 0 0 1 0 1H10v1h1a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2v.5a.5.5 0 1 1-1 0V14H6v.5a.5.5 0 0 1-1 0V14a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h1V2h-.167a.5.5 0 0 1-.5-.5ZM7 2v1h2V2H7ZM5 4a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1H5Zm0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 1 1 0 1h-5a.5.5 0 0 1-.5-.5Z"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="2em"
              height="2em"
              preserveAspectRatio="xMidYMid meet"
              viewBox="0 0 32 32"
            >
              <path
                fill="currentColor"
                d="M14.19 1.5c-.662 0-1.19.544-1.19 1.2v2.77h-2.72C8.469 5.47 7 6.93 7 8.729V25.21c0 1.8 1.469 3.259 3.28 3.259H11v.63c0 .55.45 1 1 1c.56 0 1-.45 1-1v-.63h6v.63c0 .55.45 1 1 1c.56 0 1-.45 1-1v-.63h.72c1.811 0 3.28-1.46 3.28-3.269V8.73c0-1.8-1.469-3.259-3.28-3.259H19V2.7c0-.656-.528-1.2-1.19-1.2h-3.62Zm3.62 1c.098 0 .19.084.19.2V5h-4V2.7c0-.116.092-.2.19-.2h3.62ZM11 27c-.55 0-1-.45-1-1V9c0-.55.45-1 1-1s1 .45 1 1v17c0 .55-.44 1-1 1Zm5 0c-.55 0-1-.45-1-1V10.704l2 2V26c0 .55-.44 1-1 1Zm2.22-14.49l-3.47-3.47a.592.592 0 0 1 0-.85l1.74-1.74c.24-.24.62-.24.85 0l3.47 3.47c.23.23.23.61 0 .85l-1.74 1.74c-.24.24-.62.24-.85 0Zm2.242-4.352c.156-.1.34-.158.538-.158c.55 0 1 .45 1 1v17c0 .55-.44 1-1 1c-.55 0-1-.45-1-1V12.994l1.525-1.524l.007-.008a1.61 1.61 0 0 0-.015-2.25l-1.055-1.054Z"
              />
            </svg>
          </div>
        </div>

        <div className="mt-4 bg-gray-100 flex flex-row md:flex-nowrap rounded-b-lg">
          <div className="flex mx-6 py-4 flex-row w-full">
            <div className="text-sm mx-2 flex flex-col">
              <p className="">Costo Total</p>
              <p className="font-bold">
                ${(fromFlight.price + returnFlight.price).toFixed(2)}{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
