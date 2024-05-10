import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PurchaseForm from "../components/PurchaseForm";

function TicketPurchase() {
  const [ticket, setTicket] = useState({
    id: 1,
    origin: "GRU",
    destination: "MIA",
    departureTime: "2021-10-10T10:00:00",
    arrivalTime: "2021-10-10T15:00:00",
    company: "American Airlines",
    price: 100,
  });
  const [departureDay, setDepartureDay] = useState(null);
  const [departureTime, setDepartureTime] = useState(null);
  const [arrivalTime, setArrivalTime] = useState(null);
  const [eurPrice, setEurPrice] = useState(null);
  const [price, setPrice] = useState(null);

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

  /* useEffect(() => {
    console.log(ticket);
    const urlParts = window.location.pathname.split("/");
    const id = urlParts[urlParts.length - 1];

    const ticketUrl = `http://localhost:8080/api/tickets/${id}`;
    fetchTicket(ticketUrl);

    setCurrencySelected(localStorage.getItem("currency"));
  }, []); */

  useEffect(() => {
    if (ticket) {
      const departureDate = new Date(ticket.departureTime);
      const departureTime = departureDate.toLocaleTimeString("pt-PT");
      const departureDay = departureDate.toLocaleDateString("pt-PT");

      const arrivalDate = new Date(ticket.arrivalTime);
      const arrivalTime = arrivalDate.toLocaleTimeString("pt-PT");

      const ticketPrice = ticket.price;

      setDepartureDay(departureDay);
      setDepartureTime(departureTime);
      setArrivalTime(arrivalTime);
      setEurPrice(ticketPrice);
      setPrice(ticketPrice);
    }
  }, [ticket, eurPrice]);
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
                              {ticket.origin}
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
                              {ticket.destination}
                            </td>
                          </tr>
                          <tr>
                            <th
                              scope="col"
                              className="border border-gray-400 px-4 py-2 font-bold"
                            >
                              Date
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
                              {ticket.company}
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
                              {price} EUR
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
                  <PurchaseForm />
                </div>
              </div>
            </div>
            <div className="text-center my-10">
              <button className="btn btn-primary">Purchase Ticket</button>
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
