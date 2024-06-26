import React, { useState, useEffect } from "react";
import plane from "../assets/plane.png";
import arrow from "../assets/arrow.png";

function FlightCard({ flight }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 m-4 flex flex-row items-center justify-between relative">
      <div className="flex flex-col">
        <div className="mr-6">
          <h3 className="text-3xl font-semibold">
            {flight.origin.iata} - {flight.destination.iata}
          </h3>
        </div>
        <div className="mb-5">
          <p className="text-base">{flight.flightIata}</p>
        </div>
        <div className="flex flex-row items-center">
          <img src={plane} alt="Plane" />
          <p className="text-base">{flight.airline}</p>
        </div>
      </div>
      <div>
        <img src={arrow} alt="arrow" />
      </div>
      <div className="absolute top-0 right-0 bg-yellow-200 p-2 rounded-bl">
        <p className="text-sm">{flight.price} €</p>
      </div>
    </div>
  );
}

export default FlightCard;
