import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Cookies from "js-cookie";
import FlightCardUserTickets from "../components/FlightCardUserTickets";

function UserTickets() {
  const [userTickets, setUserTickets] = useState([]);
  const [userDetails, setUserDetails] = useState(
    JSON.parse(Cookies.get("user"))
  );

  const fetchUserTickets = async () => {
    try {
      const response = await fetch(
        "http://localhost/api/payment/transactions_by_user/" +
          userDetails.username,
        {
          method: "GET",
        }
      );

      const responseContent = await response.json();
      if (response.status === 200) {
        console.log(responseContent);
        setUserTickets(responseContent);
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

  useEffect(() => {
    fetchUserTickets();
  }, []);

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
                <FlightCardUserTickets key={ticket.id} ticket={ticket} />
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
