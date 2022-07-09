/** @format */

import { Col, Row } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import DefaultLayout from "../components/DefaultLayout";
import { getAllBookings } from "../redux/actions/bookingAction";

function MyBookings() {
  const dispatch = useDispatch();
  const bookings = useSelector((state) => state.bookingsReducer);
  const user = JSON.parse(localStorage.getItem("user"));
  const [userBookings, setUserBookings] = useState();
  const flag = true;
  useEffect(() => {
    dispatch(getAllBookings());
  }, []);
  // console.log(bookings.bookings);
  return (
    <DefaultLayout>
      <Row justify="center" gutter={16}>
        <Col lg={18} sm={24} xs={24}>
          <h5 className=" my-3 px-5">My Bookings</h5>

          {bookings.bookings
            .filter((itm) => itm.user === user.user._id)
            .map((booking) => {
              return (
                <Row
                  gutter={24}
                  className="bs2 mt-3 p-2 d-flex align-items-center text-left"
                  key={booking._id}
                >
                  <Col lg={7} sm={7} xs={8}>
                    <p>
                      <b>{booking.bike.name}</b>
                    </p>
                    <p>
                      Total hours : <b>{booking.totalHours}</b>
                    </p>
                    <p>
                      Rent per hour : <b>{booking.bike.rentPerHour}</b>
                    </p>
                    <p>
                      Total amount : <b>{booking.totalAmount}</b>
                    </p>
                  </Col>
                  <Col lg={10} sm={10} xs={12} className="text-wrap">
                    <p>
                      Transaction Id : <b>{booking.transactionId}</b>
                    </p>
                    <p>
                      From : <b>{booking.bookedTimeSlots.fromTime}</b>
                    </p>
                    <p>
                      To : <b>{booking.bookedTimeSlots.toTime}</b>
                    </p>
                    <p>
                      Date of booking :{" "}
                      <b>{moment(booking.createdAt).format("MMM DD YYYY")}</b>
                    </p>
                  </Col>
                  <Col lg={7} sm={7} xs={0}>
                    <img
                      src={booking.bike.image}
                      alt={booking.bike.name}
                      style={{
                        width: "15rem",
                        aspectRatio: "1/1",
                        objectFit: "cover",
                        borderRadius: "10px",
                      }}
                    />
                  </Col>
                </Row>
              );
            })}
        </Col>
      </Row>
    </DefaultLayout>
  );
}

export default MyBookings;
