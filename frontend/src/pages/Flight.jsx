import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FlightInfo from "../components/FlightInfo";
import FlightInfoTable from "../components/FlightInfoTable";
import FlightLiveDataTable from "../components/FlightLiveDataTable";
import "../css/flight.css";

function Flight(props) {
  const location = useLocation();
  const flightIata = location.state?.flightIata;
  const token = localStorage.getItem("token");
  const [flightInfo, setFlightInfo] = useState({
    flightIata: "AA123",
    airlineName: "American Airlines",
    departure: {
      name: "Guarulhos International Airport",
      terminal: "Terminal 3",
      gate: "A1",
      delay: "10 minutes",
      scheduled: "2021-10-10T10:00:00",
      estimated: "2021-10-10T10:10:00",
      actual: "2021-10-10T10:10:00",
      iata: "GRU",
    },
    arrival: {
      name: "Miami International Airport",
      terminal: "Terminal 1",
      gate: "B2",
      delay: "5 minutes",
      scheduled: "2021-10-10T15:00:00",
      estimated: "2021-10-10T15:05:00",
      actual: "2021-10-10T15:05:00",
      iata: "MIA",
    },
  });
  const [flightInfoNotFound, setflightInfoNotFound] = useState(false);

  const fetchFlightInfo = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/flight/" + flightIata,
        {
          method: "GET",
        }
      );

      const responseContent = await response.json();
      if (response.status === 200) {
        console.log("FLight info found");
        setFlightInfo(responseContent);
        setflightInfoNotFound(false);
      } else if (response.status === 404) {
        console.error("Flight info not found");
        setFlightInfo(null);
        setflightInfoNotFound(true);
      }
    } catch (error) {
      console.error("Erro:", error);
      setFlightInfo(null);
      setflightInfoNotFound(true);
    }
  };

  /* useEffect(() => {
    fetchFlightInfo();
  }, []); */

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <div>
          <Navbar />
        </div>
        <div className="flex-1">
          <div className="h-10 bg-white"></div>

          {flightInfoNotFound && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mx-auto w-1/2 h-10 text-center flex items-center justify-center mt-10"
              role="alert"
            >
              <strong className="font-bold">Flight info not found!</strong>
            </div>
          )}
          {!flightInfoNotFound && flightInfo && (
            <div>
              <div className="bg-sky-950 text-white flex flex-col items-center justify-center mx-5">
                <div className="mt-7">
                  <p className="text-4xl">
                    {flightInfo.departure.iata} - {flightInfo.arrival.iata}
                  </p>
                </div>
                <div className="mt-2 mb-16">
                  <p className="text-xs">
                    {flightInfo.flightIata} - {flightInfo.airlineName}
                  </p>
                </div>
              </div>
              <div>
                <FlightInfo flight={flightInfo} />
              </div>
              <div className="flex flex-row justify-between gap-10 mb-10">
                <div className="overflow-x-auto w-1/3 ml-10">
                  <p className="text-center text-4xl font-bold mb-5">
                    Departure
                  </p>
                  <FlightInfoTable flight={flightInfo.departure} />
                </div>
                <div className="overflow-x-auto w-1/3 mr-10">
                  <p className="text-center text-4xl font-bold mb-5">Arrival</p>
                  <FlightInfoTable flight={flightInfo.arrival} />
                </div>
              </div>
              <div className="flex justify-center mb-10">
                <Link
                  to={`/ticketPurchase/${flightInfo.iata}`}
                  key={flightInfo.iata}
                  state={{ flightIata: flightInfo.iata }}
                >
                  <button className="btn btn-primary">Purchase Ticket</button>
                </Link>
              </div>
            </div>
          )}
        </div>
        <div>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default Flight;
