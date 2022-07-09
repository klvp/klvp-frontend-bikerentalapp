/** @format */

import axios from "axios";
import { message } from "antd";

export const bookBike = (reqObj) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });
  try {
    await axios.post(
      "https://klvp-bikerental.herokuapp.com/api/bookings/bookbike",
      reqObj
    );
    message.success("Bike booked successfully");
    setTimeout(() => {
      window.location.href = "/mybookings";
    }, 500);
    dispatch({ type: "LOADING", payload: false });
  } catch (error) {
    console.log(error);
    message.error("Something went wrong");
    dispatch({ type: "LOADING", payload: false });
  }
};

export const getAllBookings = () => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });
  try {
    const response = await axios.get(
      "https://klvp-bikerental.herokuapp.com/api/bookings/getbookings"
    );
    dispatch({ type: "GET_ALL_BOOKINGS", payload: response.data });
    dispatch({ type: "LOADING", payload: false });
  } catch (error) {
    console.log(error);
    dispatch({ type: "LOADING", payload: false });
  }
};
