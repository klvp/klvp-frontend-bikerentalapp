/** @format */

import axios from "axios";
import { message } from "antd";

export const userLogin = (reqObj) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });
  try {
    const response = await axios.post(
      "https://klvp-bikerental.herokuapp.com/api/users/login",
      reqObj
    );
    if (response.data.msg === "User not registered") {
      message.success(response.data.msg);
      return;
    }
    localStorage.setItem("user", JSON.stringify(response.data));
    message.success(response.data.msg);
    window.location.href = "/";
    dispatch({ type: "LOADING", payload: false });
  } catch (error) {
    console.log(error);
    message.error(error);
    dispatch({ type: "LOADING", payload: false });
  }
};

export const userRegister = (reqObj) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });
  try {
    const response = await axios.post(
      "https://klvp-bikerental.herokuapp.com/api/users/register",
      reqObj
    );
    console.log(response.data);
    setTimeout(() => {
      window.location.href = "/login";
    }, 500);
    message.success(response.data.msg);
    dispatch({ type: "LOADING", payload: false });
  } catch (error) {
    console.log(error);
    message.error("Something went wrong");
    dispatch({ type: "LOADING", payload: false });
  }
};
