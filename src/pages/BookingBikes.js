/** @format */

import React, { useEffect, useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllBikes } from "../redux/actions/bikesAction";
import { Col, Divider, Row, DatePicker, Modal } from "antd";
import moment from "moment";
import { bookBike } from "../redux/actions/bookingAction";
import StripeCheckout from "react-stripe-checkout";
import AOS from "aos";
import "aos/dist/aos.css"; // You can also use <link> for styles
// ..
AOS.init();

const { RangePicker } = DatePicker;

function BookingBikes() {
  const { id } = useParams();
  const { bikes } = useSelector((state) => state.bikesReducer);
  const dispatch = useDispatch();
  const [bike, setBike] = useState(null);
  const [fromTime, setFromTime] = useState();
  const [toTime, setToTime] = useState();
  const [totalHours, setTotalHours] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(getAllBikes());
    if (bikes.length > 0) {
      setBike(bikes.find((bk) => bk._id === id));
    }
  }, [dispatch, id, bikes]);
  useEffect(() => {
    setTotalAmount(totalHours * bike?.rentPerHour);
  }, [totalHours]);

  function selectTimeSlot(values) {
    setFromTime(moment(values[0]).format("MMM DD YYYY HH:mm"));
    setToTime(moment(values[1]).format("MMM DD YYYY HH:mm"));
    setTotalHours(values[1].diff(values[0], "hours"));
  }

  function bookNow(token) {
    const loginUser = JSON.parse(localStorage.getItem("user"));
    const reqObj = {
      token,
      user: loginUser.user._id,
      bike: bike._id,
      totalHours,
      totalAmount,
      bookedTimeSlots: {
        fromTime,
        toTime,
      },
    };
    dispatch(bookBike(reqObj));
    console.log(reqObj);
  }

  function onToken(token) {
    console.log(token);
    bookNow(token);
  }
  return (
    <DefaultLayout>
      <Row
        justify="center"
        className="d-flex align-items-center"
        style={{ height: "90vh" }}
      >
        <Col lg={10} sm={24} xs={24}>
          <img
            src={bike?.image}
            alt={bike?.name}
            className="bikeimg2 bs1 mt-3"
            data-aos="flip-left"
            data-aos-duration="1500"
          />
        </Col>
        <Col lg={10} sm={24} xs={24}>
          <Divider dashed="true">Bike Info</Divider>
          <div className="text-right pr-5">
            <p>
              <b>{bike?.name}</b>
            </p>
            {/* <p>
              <b>{bike?.rentPerHour}</b> Rs Per Hour
            </p> */}
            <p>
              <b>{bike?.milage}</b> KMPL
            </p>
            <p>
              <b>{bike?.type}</b> Bike
            </p>
          </div>
          <Divider dashed="true">Select Time Slot</Divider>
          <div className="text-right px-5">
            <RangePicker
              showTime
              format="MMM DD YYYY HH:mm"
              onChange={selectTimeSlot}
            />{" "}
            <br />
            <button
              className="btn1 mt-2"
              onClick={() => {
                setShowModal(true);
              }}
            >
              See Booked Slots
            </button>
            {fromTime && toTime && (
              <div className="py-3">
                <p>
                  Total Hours : <b>{totalHours}</b>
                </p>
                <p>
                  Rent per Hour : <b> {bike?.rentPerHour} </b>
                </p>
                <h3>Total Amount : {isNaN(totalAmount) ? 0 : totalAmount} </h3>
                {/* <button className="btn1" onClick={bookNow}>
                  Book Now
                </button> */}

                <StripeCheckout
                  shippingAddress
                  amount={totalAmount * 100}
                  currency="INR"
                  token={onToken}
                  stripeKey="pk_test_51LIcFFSJuNGiELAHgjwBCxeEB4fllUd8b9A5isAxk9c6h1gqzJdJZfsBw2JErMZzB1JnYiP9xlevgZPGH9vjFp4t00FjRPtEKv"
                >
                  <button className="btn1">Book Now</button>
                </StripeCheckout>
              </div>
            )}
          </div>
        </Col>
      </Row>

      <Modal
        visible={showModal}
        title="Already Booked Slots"
        footer={false}
        onCancel={() => setShowModal(false)}
      >
        {bike && (
          <div>
            {bike.bookedTimeSlots.map((slot) => {
              return (
                <button className="btn1 mt-2">
                  {slot.fromTime} - {slot.toTime}
                </button>
              );
            })}
          </div>
        )}
      </Modal>
    </DefaultLayout>
  );
}

export default BookingBikes;
