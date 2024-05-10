import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import Footer from "../components/Footer";

function AdminPage() {
  const [flightsInfo, setFlightsInfo] = useState(true);
  const [checkin, setCheckin] = useState(false);
  const [passengerInfo, setPassengerInfo] = useState({
    name: "",
    passengerBI: "",
    checkInTime: "",
    numberOfBags: 0,
    bagWeights: [],
  });

  const handleBagWeightChange = (index, value) => {
    if (isNaN(value)) {
      value = 0;
    }
    setPassengerInfo((prevState) => {
      const updatedBagWeights = [...prevState.bagWeights];
      updatedBagWeights[index] = value;
      return {
        ...prevState,
        bagWeights: updatedBagWeights,
      };
    });
  };

  const handleSubmitCheckIn = (event) => {
    event.preventDefault();

    let hasErrors = false;

    if (passengerInfo.passengerBI.toString().length != 9) {
      alert("BI number must be have 9 digits.");
      hasErrors = true;
    }

    if (passengerInfo.numberOfBags > 6) {
      alert("Number of bags cannot be negative.");
      hasErrors = true;
    }

    if (passengerInfo.bagWeights.some((weight) => weight > 40)) {
      alert("Bag weight cannot exceed 40 kg.");
      hasErrors = true;
    }

    if (
      passengerInfo.name === "" ||
      passengerInfo.passengerBI === "" ||
      passengerInfo.checkInTime === ""
    ) {
      alert("Please fill in all fields.");
      hasErrors = true;
    }

    if (!hasErrors) {
      alert("Check-in successful!");
      console.log("Passenger Info:", passengerInfo);
      event.target.reset();
      setPassengerInfo({
        name: "",
        passengerBI: "",
        checkInTime: "",
        numberOfBags: 0,
        bagWeights: [],
      });
    }
  };

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

          {checkin && (
            <div>
              <div className="mb-10">
                <h1 className="text-4xl font-bold">Check-In</h1>
              </div>

              <form onSubmit={handleSubmitCheckIn} className="space-y-4">
                <div className="flex flex-col">
                  <label htmlFor="name" className="text-lg font-medium">
                    Name:
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={passengerInfo.name}
                    onChange={(e) =>
                      setPassengerInfo((prevState) => ({
                        ...prevState,
                        name: e.target.value,
                      }))
                    }
                    required
                    className="border border-gray-300 rounded-md px-4 py-2"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="passengerBI" className="text-lg font-medium">
                    BI:
                  </label>
                  <input
                    type="text"
                    id="passengerBI"
                    name="passengerBI"
                    value={passengerInfo.passengerBI}
                    onChange={(e) =>
                      setPassengerInfo((prevState) => ({
                        ...prevState,
                        passengerBI: e.target.value,
                      }))
                    }
                    required
                    className="border border-gray-300 rounded-md px-4 py-2"
                  />
                  {passengerInfo.passengerBI.toString().length > 9 && (
                    <p className="text-red-600">BI number have 9 digits.</p>
                  )}
                  {passengerInfo.passengerBI.toString().length < 9 &&
                    passengerInfo.passengerBI.toString().length > 0 && (
                      <p className="text-red-600">
                        Add more{" "}
                        {9 - passengerInfo.passengerBI.toString().length}{" "}
                        digit(s)
                      </p>
                    )}
                </div>
                <div className="flex flex-col">
                  <label htmlFor="checkInTime" className="text-lg font-medium">
                    Check-in Time:
                  </label>
                  <input
                    type="datetime-local"
                    id="checkInTime"
                    name="checkInTime"
                    value={passengerInfo.checkInTime}
                    onChange={(e) =>
                      setPassengerInfo((prevState) => ({
                        ...prevState,
                        checkInTime: e.target.value,
                      }))
                    }
                    required
                    className="border border-gray-300 rounded-md px-4 py-2"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="numberOfBags" className="text-lg font-medium">
                    Number of Bags:
                  </label>
                  <input
                    type="number"
                    id="numberOfBags"
                    value={passengerInfo.numberOfBags}
                    onChange={(e) =>
                      setPassengerInfo((prevState) => ({
                        ...prevState,
                        numberOfBags: parseInt(e.target.value),
                      }))
                    }
                    min={0}
                    required
                    className="border border-gray-300 rounded-md px-4 py-2"
                  />
                  {passengerInfo.numberOfBags > 6 && (
                    <p className="text-red-600">
                      Number of bags cannot be greater than 6.
                    </p>
                  )}
                </div>
                {Array.from(
                  { length: passengerInfo.numberOfBags },
                  (_, index) => (
                    <div key={index} className="flex flex-col">
                      <label
                        htmlFor={`bagWeight${index + 1}`}
                        className="text-lg font-medium"
                      >{`Bag ${index + 1} Weight (kg):`}</label>
                      <input
                        type="number"
                        id={`bagWeight${index + 1}`}
                        value={passengerInfo.bagWeights[index]}
                        onChange={(e) =>
                          handleBagWeightChange(
                            index,
                            parseFloat(e.target.value)
                          )
                        }
                        min={0}
                        required
                        className="border border-gray-300 rounded-md px-4 py-2"
                      />
                      {passengerInfo.bagWeights[index] > 40 && (
                        <p className="text-red-600">
                          Bag weight cannot exceed 40 kg.
                        </p>
                      )}
                    </div>
                  )
                )}
                <button
                  type="submit"
                  className="bg-green-600 text-white rounded-md px-4 py-2 hover:bg-green-700"
                >
                  Check In
                </button>
              </form>
            </div>
          )}
        </div>
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
}

export default AdminPage;
