import React, { useState, useEffect } from "react";
import plane from "../assets/plane.png";
import Cookies from "js-cookie";

function FlightCardUserTickets({ ticket }) {
  const [flight, setflight] = useState(null);
  const [userDetails, setUserDetails] = useState(
    JSON.parse(Cookies.get("user"))
  );
  const [checkin, setCheckin] = useState(false);
  const [seat, setSeat] = useState(null);

  const fetchTicket = async () => {
    try {
      const response = await fetch(
        `http://deti-tqs-04.ua.pt/api/flight/flights/${ticket.iataFlight}`,
        {
          method: "GET",
        }
      );

      const responseContent = await response.json();
      if (response.status === 200) {
        setflight(responseContent);
      } else if (response.status === 404) {
        setflight(null);
      }
    } catch (error) {
      console.error("Error:", error);
      setflight(null);
    }
  };

  const handleCheckin = async () => {
    try {
      const response = await fetch(
        `http://deti-tqs-04.ua.pt/api/flight/checkin/create?userId=${userDetails.id}&iataFlight=${ticket.iataFlight}`,
        {
          method: "POST",
        }
      );

      if (response.status === 200) {
        console.log("Check-in successful");
      } else {
        console.error("Check-in failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }

    try {
      const response = await fetch(
        `http://deti-tqs-04.ua.pt/api/payment/update_transaction/${ticket.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userEmail: userDetails.username,
            iataFlight: ticket.iataFlight,
            status: "PAYED",
          }),
        }
      );

      if (response.status === 200) {
        console.log("Checked-in");
      } else if (response.status === 404) {
        console.error("Transaction not found");
      } else if (response.status === 400) {
        console.error("Transaction already checked-in");
      }
    } catch (error) {
      console.error("Error:", error);
    }

    checkCheckedIn();
  };

  const checkCheckedIn = async () => {
    try {
      const response = await fetch(
        `http://deti-tqs-04.ua.pt/api/payment/${ticket.id}`,
        {
          method: "GET",
        }
      );

      const responseContent = await response.json();
      if (response.status === 200) {
        if (responseContent.status === "CHECKEDIN") {
          setCheckin(true);
        }
      } else if (response.status === 404) {
        console.error(responseContent);
      } else if (response.status === 400) {
        console.error(responseContent);
      }
    } catch (error) {
      console.error("Error:", error);
    }

    try {
      const response = await fetch(
        `http://deti-tqs-04.ua.pt/api/flight/checkin/tickets/${ticket.id}`,
        {
          method: "GET",
        }
      );

      if (response.status === 200) {
        const responseContent = await response.json();
        setSeat(responseContent.seat);
      } else if (response.status === 404) {
        console.error("Not checked-in");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchTicket();
    checkCheckedIn();
  }, []);

  return (
    <>
      {flight != null && (
        <div className="bg-white rounded-lg shadow-md p-6 m-4 flex flex-row items-center justify-between relative">
          <div className="flex flex-col">
            <div className="mr-6">
              <h3 className="text-3xl font-semibold">
                {flight.origin.iata} - {flight.destination.iata}
              </h3>
            </div>
            <div className="mb-5">
              <p className="text-base">Flight IATA: {flight.flightIata}</p>
              <h3 className="text-base">Ticket ID: {ticket.id}</h3>
            </div>
            <div className="flex flex-row items-center">
              <img src={plane} alt="Plane" />
              <p className="text-base">{flight.airline}</p>
            </div>
          </div>
          <div>
            {checkin ? (
              <div>
                <div className="">Seat: {seat}</div>
                <div className="bg-green-500  text-white font-bold py-2 px-4 rounded">
                  Checked-in
                </div>
              </div>
            ) : (
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleCheckin}
              >
                Check-in
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default FlightCardUserTickets;
