/** @format */

import "./App.css";
import { Redirect, Route } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import BookingBikes from "./pages/BookingBikes";
import "antd/dist/antd.css";
import MyBookings from "./pages/MyBookings";
import AddBike from "./pages/AddBike";
import AdminHome from "./pages/AdminHome";
import EditBike from "./pages/EditBike";

function App() {
  return (
    <div className="App">
      <Router>
        <ProtectedRoute exact path="/" component={Home} />
        <Route exact path="/login" component={Login} on />
        <Route exact path="/register" component={Register} />
        <ProtectedRoute exact path="/booking/:id" component={BookingBikes} />
        <ProtectedRoute exact path="/mybookings" component={MyBookings} />
        <ProtectedRoute exact path="/addbike" component={AddBike} />
        <ProtectedRoute exact path="/admin" component={AdminHome} />
        <ProtectedRoute exact path="/editbike/:bikeid" component={EditBike} />
      </Router>
    </div>
  );
}

export default App;

function ProtectedRoute(props) {
  if (localStorage.getItem("user")) {
    return <Route {...props} />;
  } else {
    return <Redirect to="/login" />;
  }
}
