import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function PurchaseConfirmation() {
  const [ticket, setTicket] = useState({
    origin: "GRU",
    destination: "MIA",
    company: "American Airlines",
  });
  const [departureDay, setDepartureDay] = useState(
    new Date().toLocaleDateString()
  );
  const [departureTime, setDepartureTime] = useState(
    new Date().toLocaleTimeString()
  );
  const [arrivalTime, setArrivalTime] = useState(
    new Date().toLocaleTimeString()
  );
  const [name, setName] = useState(localStorage.getItem("name") || "John Doe");
  const [email, setEmail] = useState(
    localStorage.getItem("email") || "johndue@gmail.com"
  );
  const [ccnumber, setCcnumber] = useState(
    localStorage.getItem("ccnumber") || "95645678"
  );

  return (
    <div className="flex flex-col min-h-screen">
      <div>
        <Navbar />
      </div>

      <div className="flex-1">
        {ticket && (
          <div className="max-w-lg mx-auto mt-8 p-8 bg-white rounded-md shadow-md">
            <h1 className="text-2xl font-semibold text-center mb-4">
              Purchase Confirmation
            </h1>
            <div className=" gap-4">
              <table className="table-auto mx-auto border-collapse border border-gray-400">
                <tr>
                  <th
                    scope="col"
                    className="border border-gray-400 px-4 py-2 font-bold"
                  >
                    Origin:
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
                    Destination:
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
                    Departure Time:
                  </th>
                  <td className="border border-gray-400 px-4 py-2">
                    {departureDay} at {departureTime}
                  </td>
                </tr>
                <tr>
                  <th
                    scope="col"
                    className="border border-gray-400 px-4 py-2 font-bold"
                  >
                    Arrival Time:
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
                    Company:
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
                    Name:
                  </th>
                  <td className="border border-gray-400 px-4 py-2">{name}</td>
                </tr>
                <tr>
                  <th
                    scope="col"
                    className="border border-gray-400 px-4 py-2 font-bold"
                  >
                    Email:
                  </th>
                  <td className="border border-gray-400 px-4 py-2">{email}</td>
                </tr>
                <tr>
                  <th
                    scope="col"
                    className="border border-gray-400 px-4 py-2 font-bold"
                  >
                    CC Number:
                  </th>
                  <th className="border border-gray-400 px-4 py-2">
                    {ccnumber}
                  </th>
                </tr>
              </table>
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

export default PurchaseConfirmation;
