import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FlightCard from "../components/FlightCard";

function UserTickets() {
  const [userTickets, setUserTickets] = useState([]);

  const fetchUserTickets = async (token) => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/user/subscribed_flights",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: token,
          }),
        }
      );

      if (response.status === 200) {
        const planesData = await response.json();
        setUserTickets(planesData);
      } else if (response.status === 401) {
        localStorage.removeItem("token");
        localStorage.setItem("invalidToken", true);
        window.location.href = "/login";
      } else if (response.status === 204) {
        setUserTickets([]);
      }
    } catch (error) {
      console.error("Erro:", error);
    }
  };

  /* useEffect(() => {
    fetchUserTickets(token);
  }, [token]); */

  return (
    <div className="flex flex-col min-h-screen">
      <div>
        <Navbar />
      </div>

      <div className="flex-1 p-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">My Tickets</h2>
          <div>
            {userTickets.length > 0 &&
              userTickets.map((ticket) => (
                <Link
                  to={`/flightInfo/${ticket.flightIata}`}
                  key={ticket.flightIata}
                  state={{ flightIata: ticket.flightIata }}
                >
                  <FlightCard flight={ticket} />
                </Link>
              ))}
            {userTickets.length === 0 && (
              <p className="text-xl">You don't have tickets!</p>
            )}
          </div>
        </div>
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
}

export default UserTickets;
