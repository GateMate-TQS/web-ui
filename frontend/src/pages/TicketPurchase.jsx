import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Cookies from "js-cookie";

function TicketPurchase() {
  if (!Cookies.get("token")) {
    window.location.href = "/login";
  }

  const [ticket, setTicket] = useState();
  const [departureDay, setDepartureDay] = useState(null);
  const [departureTime, setDepartureTime] = useState(null);
  const [arrivalDay, setArrivalDay] = useState(null);
  const [arrivalTime, setArrivalTime] = useState(null);
  const [userDetails, setUserDetails] = useState(null);

  const fetchTicket = async (url) => {
    try {
      const response = await fetch(url, {
        method: "GET",
      });

      const responseContent = await response.json();
      if (response.status === 200) {
        console.log("Ticket found");
        setTicket(responseContent);
      } else if (response.status === 404) {
        console.error("Ticket not found");
        setTicket(null);
      }
    } catch (error) {
      console.error("Error:", error);
      setTicket(null);
    }
  };

  const purchaseTicket = async () => {
    console.log("Purchasing ticket");
    try {
      const response = await fetch(
        "http://deti-tqs-04.ua.pt/api/payment/create_transaction",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userEmail: userDetails.username,
            iataFlight: ticket.flightIata,
            status: "PAYED",
          }),
        }
      );

      if (response.status === 201) {
        window.location.href = "/UserTickets";
      } else if (response.status === 400) {
        console.error("Error:", response);
      }
    } catch (error) {
      console.error("Error:", error);
      setTicket(null);
    }
  };

  useEffect(() => {
    const urlParts = window.location.pathname.split("/");
    const id = urlParts[urlParts.length - 1];

    const ticketUrl = `http://deti-tqs-04.ua.pt/api/flight/flights/${id}`;
    fetchTicket(ticketUrl);
    const user = JSON.parse(Cookies.get("user"));
    setUserDetails(user);
  }, []);

  useEffect(() => {
    if (ticket) {
      const departureDate = new Date(ticket.origin.scheduled);
      const departureTime = departureDate.toLocaleTimeString("pt-PT");
      const departureDay = departureDate.toLocaleDateString("pt-PT");

      const arrivalDate = new Date(ticket.destination.scheduled);
      const arrivalTime = arrivalDate.toLocaleTimeString("pt-PT");
      const arrivalDay = arrivalDate.toLocaleDateString("pt-PT");

      setDepartureDay(departureDay);
      setDepartureTime(departureTime);
      setArrivalDay(arrivalDay);
      setArrivalTime(arrivalTime);
    }
  }, [ticket]);

  const submitForm = async (event) => {};
  return (
    <div className="flex flex-col min-h-screen">
      <div>
        <Navbar />
      </div>

      <div className="flex-1">
        {ticket && (
          <div>
            <div className="flex justify-center">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                {/* Ticket Details */}
                <div className="md:col-span-1 rounded-lg p-6">
                  <div className="text-4xl font-bold text-center mb-6">
                    Ticket Details
                  </div>
                  <div className="flex justify-center">
                    <div className="w-full">
                      <table className="table-auto mx-auto border-collapse border border-gray-400">
                        <tbody>
                          <tr>
                            <th
                              scope="col"
                              className="border border-gray-400 px-4 py-2 font-bold"
                            >
                              Origin
                            </th>
                            <td className="border border-gray-400 px-4 py-2">
                              {ticket.origin.iata}
                            </td>
                          </tr>
                          <tr>
                            <th
                              scope="col"
                              className="border border-gray-400 px-4 py-2 font-bold"
                            >
                              Destination
                            </th>
                            <td className="border border-gray-400 px-4 py-2">
                              {ticket.destination.iata}
                            </td>
                          </tr>
                          <tr>
                            <th
                              scope="col"
                              className="border border-gray-400 px-4 py-2 font-bold"
                            >
                              Departure Date
                            </th>
                            <td className="border border-gray-400 px-4 py-2">
                              {departureDay}
                            </td>
                          </tr>
                          <tr>
                            <th
                              scope="col"
                              className="border border-gray-400 px-4 py-2 font-bold"
                            >
                              Departure Time
                            </th>
                            <td className="border border-gray-400 px-4 py-2">
                              {departureTime}
                            </td>
                          </tr>
                          <tr>
                            <th
                              scope="col"
                              className="border border-gray-400 px-4 py-2 font-bold"
                            >
                              Arrival Date
                            </th>
                            <td className="border border-gray-400 px-4 py-2">
                              {arrivalDay}
                            </td>
                          </tr>
                          <tr>
                            <th
                              scope="col"
                              className="border border-gray-400 px-4 py-2 font-bold"
                            >
                              Arrival Time
                            </th>
                            <td className="border border-gray-400 px-4 py-2">
                              {arrivalTime}
                            </td>
                          </tr>
                          <tr>
                            <th
                              scope="col"
                              className="border border-gray-400 px-4 py-2 font-bold"
                            >
                              Company
                            </th>
                            <td className="border border-gray-400 px-4 py-2">
                              {ticket.airline}
                            </td>
                          </tr>
                          <tr>
                            <th
                              scope="col"
                              className="border border-gray-400 px-4 py-2 font-bold"
                            >
                              Price
                            </th>
                            <td className="border border-gray-400 px-4 py-2">
                              {ticket.price} EUR
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                {/* Purchase Form */}
                <div className="md:col-span-1 p-6">
                  <div className="text-4xl font-bold text-center mb-6">
                    Purchase Form
                  </div>
                  <div className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md">
                    <form className="space-y-4">
                      <div className="flex flex-col">
                        <label htmlFor="name" className="text-sm font-semibold">
                          Name
                        </label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label
                          htmlFor="email"
                          className="text-sm font-semibold"
                        >
                          Email
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="text"
                          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label
                          htmlFor="ccNumber"
                          className="text-sm font-semibold"
                        >
                          CC Number
                        </label>
                        <input
                          id="ccNumber"
                          name="ccNumber"
                          type="text"
                          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label
                          htmlFor="cardType"
                          className="text-sm font-semibold"
                        >
                          Card Type
                        </label>
                        <select
                          name="cardType"
                          id="cardType"
                          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                          style={{ appearance: "none" }}
                        >
                          <option value="">Select Card Type</option>
                          <option value="visa">Visa</option>
                          <option value="mastercard">Mastercard</option>
                          <option value="amex">American Express</option>
                        </select>
                      </div>
                      <div className="flex flex-col">
                        <label
                          htmlFor="creditCardNumber"
                          className="text-sm font-semibold"
                        >
                          Credit Card Number
                        </label>
                        <input
                          id="creditCardNumber"
                          name="creditCardNumber"
                          type="text"
                          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label
                          htmlFor="month"
                          className="text-sm font-semibold"
                        >
                          Month
                        </label>
                        <input
                          id="month"
                          name="month"
                          type="number"
                          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label htmlFor="year" className="text-sm font-semibold">
                          Year
                        </label>
                        <input
                          id="year"
                          name="year"
                          type="number"
                          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label
                          htmlFor="nameOnCard"
                          className="text-sm font-semibold"
                        >
                          Name on Card
                        </label>
                        <input
                          id="nameOnCard"
                          name="nameOnCard"
                          type="text"
                          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                        />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center my-10">
              <button className="btn btn-primary" onClick={purchaseTicket}>
                Purchase Ticket
              </button>
            </div>
          </div>
        )}
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default TicketPurchase;
