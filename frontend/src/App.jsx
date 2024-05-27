import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AllFlights from "./pages/AllFlights";
import Flight from "./pages/Flight";
import UserTickets from "./pages/UserTickets";
import Checkin from "./pages/Checkin";
import AdminPage from "./pages/AdminPage";
import TicketPurchase from "./pages/TicketPurchase";
import PurchaseConfirmation from "./pages/PurchaseConfirmation";
import FlightTracker from "./pages/FlightTracker";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/register" Component={Register} />
        <Route path="/login" Component={Login} />
        <Route path="/allflights" Component={AllFlights} />
        <Route path="/flightInfo/:id" element={<Flight />} />
        <Route path="/check-in-online" Component={Checkin} />
        <Route path="/ticketPurchase/:id" element={<TicketPurchase />} />
        <Route path="/PurchaseConfirmation" Component={PurchaseConfirmation} />
        <Route path="/UserTickets" Component={UserTickets}></Route>
        <Route path="/admin" Component={AdminPage}></Route>
        <Route path="/flighttracker" Component={FlightTracker}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
