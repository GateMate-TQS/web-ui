import React, { useState, useEffect, useCallback } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import "../../node_modules/leaflet/dist/leaflet.css";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import airplaneIcon from "../assets/plane.webp";
import "leaflet-rotatedmarker";
import image1 from "../assets/allflights/1.jpeg";

function FlightTracker() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="">
        <Navbar />
      </div>
      <div
        className="flex-1 "
        style={{
          backgroundImage: `url(${image1})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="flex flex-col z-0 justify-center items-center mt-20">
          <div
            className="w-1/3 p-5 mt-9 flex flex-col mb-20"
            style={{ backgroundColor: "white", borderRadius: "10px" }}
          >
            <div>
              <button className="text-blue-400" onClick={() => resetFilters()}>
                <u>Reset all</u>
              </button>
            </div>
            <div className="pb-5 pt-2">
              <div className="font-bold" style={{ fontSize: "20px" }}>
                Enter your booking details
              </div>
              <hr />
            </div>
            <div className="py-5">
              <div>
                <div className="font-bold">Booking Reference Number</div>
                <hr />
                <div className="mt-3">
                  <input
                    type="text"
                    className="pl-2 appearance-none bg-gray-100 text-zinc-600 w-full h-10 text-xl font-normal outline-none"
                    value={filter.company}
                    onChange={(e) =>
                      setFilter({ ...filter, company: e.target.value })
                    }
                    placeholder="Enter Booking Reference Number"
                  />
                </div>
              </div>
            </div>
            <div className="py-5">
              <div>
                <div className="font-bold">Last Name</div>
                <hr />
                <div className="mt-3">
                  <input
                    type="text"
                    className="pl-2 appearance-none bg-gray-100 text-zinc-600 w-full h-10 text-xl font-normal outline-none"
                    value={filter.from}
                    onChange={(e) =>
                      setFilter({ ...filter, from: e.target.value })
                    }
                    placeholder="Enter Last Name"
                  />
                </div>
              </div>
            </div>

            <div className="py-13">
              <button
                className="w-full bg-blue-700 rounded justify-center items-center inline-flex px-12 py-2 text-center text-white text-base font-bold leading-normal"
                onClick={() => handleSearch()}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
}

export default FlightTracker;
