/** @format */

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DefaultLayout from "../components/DefaultLayout";
import { getAllBikes } from "../redux/actions/bikesAction";
import { Row, Col, Spin, DatePicker } from "antd";
import { Link } from "react-router-dom";
import moment from "moment";

const { RangePicker } = DatePicker;

function Home() {
  const { bikes } = useSelector((state) => state.bikesReducer);
  const { loading } = useSelector((state) => state.alertsReducer);
  const dispatch = useDispatch();
  const [totalBikes, setTotalBikes] = useState([]);

  useEffect(() => {
    dispatch(getAllBikes());
  }, [dispatch]);

  useEffect(() => {
    setTotalBikes(bikes);
  }, [bikes]);

  function setFilter(values) {
    var temp = [];
    var selectedFrom = moment(values[0], "MMM DD YYYY HH:mm");
    var selectedTo = moment(values[1], "MMM DD YYYY HH:mm");

    for (var bk of bikes) {
      if (bk.bookedTimeSlots.length === 0) {
        temp.push(bk);
      } else {
        for (var booking of bk.bookedTimeSlots) {
          if (
            selectedFrom.isBetween(booking.fromTime, booking.toTime) ||
            selectedTo.isBetween(booking.fromTime, booking.toTime) ||
            moment(booking.fromTime).isBetween(selectedFrom, selectedTo) ||
            moment(booking.toTime).isBetween(selectedFrom, selectedTo)
          ) {
          } else {
            if (!temp.includes(bk)) {
              temp.push(bk);
            }
          }
        }
      }
    }
    setTotalBikes(temp);
  }

  return (
    <DefaultLayout>
      <Row className="mt-3" justify="center" gutter="16">
        <Col lg={20} sm={22} xs={22} xxs={24}>
          <RangePicker
            showTime
            format="MMM DD YYYY HH:mm"
            onChange={setFilter}
          />
        </Col>
      </Row>

      {loading === true && (
        <Spin size="large" tip="Loading..." className="spinner"></Spin>
      )}

      <Row justify="center" gutter="16" className="mt-3">
        {totalBikes.map((bike) => (
          <Col lg={5} sm={10} xs={24} xxs={24} justify="center" key={bike._id}>
            <div className="bike p-3 bs1">
              <img src={bike.image} className="bikeimg " alt={bike.image} />
              <div className="bike-content ">
                <div className="mt-2">
                  <p>{bike.name}</p>
                  <p>Rent Per Hour = {bike.rentPerHour} Rs</p>
                </div>
                <div>
                  <button className="btn1">
                    <Link to={`/booking/${bike._id}`}>Book Now</Link>{" "}
                  </button>
                </div>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </DefaultLayout>
  );
}

export default Home;
