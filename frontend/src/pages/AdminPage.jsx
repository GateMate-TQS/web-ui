import React, { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import logo from "../assets/logo.png";

function AdminPage() {
  const [flightsInfo, setFlightsInfo] = useState(true);
  const [checkin, setCheckin] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      <div>
        <div className="navbar bg-blue-600 text-white h-20 flex items-center relative">
          <div className="flex-1">
            <Link to="/">
              <img src={logo} alt="Logo" className="w-60 h-50" />
            </Link>
            <div className="p-5">
              <button
                className="text-2xl"
                onClick={() => {
                  setFlightsInfo(true);
                  setCheckin(false);
                }}
              >
                Flights Info
              </button>
            </div>
            <div className="p-5">
              <button
                className="text-2xl"
                onClick={() => {
                  setFlightsInfo(false);
                  setCheckin(true);
                }}
              >
                Check-In
              </button>
            </div>
          </div>
          <div className="flex-none">
            <div className="menu menu-horizontal flex items-center">
              <div className="ml-2 text-2xl relative">
                <button className="block px-4 py-2 text-red-500 hover:bg-white rounded-md w-full text-left transition duration-300 ease-in-out">
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1">
        <div className="p-10">
          {flightsInfo && (
            <div>
              <div className="mb-10">
                <h1 className="text-4xl bold">Flights Info</h1>
              </div>
              <div className="mb-10 flex flex-row">
                <div className="w-1/5 mr-1">
                  <input
                    className="pl-2 appearance-none bg-gray-100 text-zinc-600 w-full h-10 text-xl font-normal outline-none inline-flex"
                    type="text"
                    name="flightIata"
                    id="flightIata"
                    placeholder=" Flight Iata"
                  />
                </div>
                <div className="w-1/5 ml-1">
                  <button className="w-full bg-blue-700 rounded justify-center items-center inline-flex px-12 py-2 text-center text-white text-base font-bold leading-normal">
                    Search
                  </button>
                </div>
              </div>
              <div>
                <div className="collapse collapse-arrow bg-base-200 mb-2">
                  <input type="radio" name="my-accordion-2" />
                  <div className="collapse-title text-3xl font-medium">
                    Flight 1
                  </div>
                  <div className="collapse-content bg-white rounded-lg shadow-lg">
                    <p className="text-lg">From: Lagos</p>
                    <p className="text-lg">To: Abuja</p>
                    <p className="text-lg">Departure: 10:00</p>
                    <p className="text-lg">Arrival: 11:00</p>
                    <p className="text-lg">Price: $100</p>
                  </div>
                </div>
                <div className="collapse collapse-arrow bg-base-200 mb-2">
                  <input type="radio" name="my-accordion-2" />
                  <div className="collapse-title text-3xl font-medium">
                    Flight 2
                  </div>
                  <div className="collapse-content bg-white rounded-lg shadow-lg">
                    <p className="text-lg">From: Lagos</p>
                    <p className="text-lg">To: Abuja</p>
                    <p className="text-lg">Departure: 10:00</p>
                    <p className="text-lg">Arrival: 11:00</p>
                    <p className="text-lg">Price: $100</p>
                  </div>
                </div>
                <div className="collapse collapse-arrow bg-base-200">
                  <input type="radio" name="my-accordion-2" />
                  <div className="collapse-title text-3xl font-medium">
                    Flight 3
                  </div>
                  <div className="collapse-content bg-white rounded-lg shadow-lg">
                    <p className="text-lg">From: Lagos</p>
                    <p className="text-lg">To: Abuja</p>
                    <p className="text-lg">Departure: 10:00</p>
                    <p className="text-lg">Arrival: 11:00</p>
                    <p className="text-lg">Price: $100</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {checkin && <div>checkin</div>}
        </div>
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
}

export default AdminPage;
