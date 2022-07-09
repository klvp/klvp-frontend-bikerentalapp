/** @format */

import React from "react";
import { Link } from "react-router-dom";
import { Button, Dropdown, Menu, Row, Col } from "antd";

function DefaultLayout(props) {
  const menu = (
    <Menu
      items={[
        {
          key: "1",
          label: <a href="/">Home</a>,
        },
        {
          key: "2",
          label: <a href="/mybookings">My Bookings</a>,
        },
        {
          key: "3",
          label: <a href="/admin">Admin</a>,
        },
        {
          key: "4",
          label: (
            <p
              onClick={() => {
                localStorage.removeItem("user");
                window.location.href = "/login";
              }}
              style={{ color: "orangeRed" }}
            >
              Logout
            </p>
          ),
        },
      ]}
    />
  );
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <div>
      <Row gutter={16} justify="center">
        <Col lg={24} sm={24} xs={24}>
          <div className="header d-flex justify-content-between bs1 align-items-center">
            <h1 className="pl-1" style={{ paddingTop: "1rem" }}>
              <Link to="/" style={{ color: "orangeRed" }}>
                Bike Rental
              </Link>
            </h1>
            {/* <button>User</button> */}
            <Dropdown overlay={menu} placement="bottom">
              <Button className="mx-3 px-5">{user.user.username}</Button>
            </Dropdown>
          </div>
        </Col>
      </Row>

      <div className="content">{props.children}</div>
      <div className="footer text-center">
        <h6>Developed by KLVP ❤️ </h6>
      </div>
    </div>
  );
}

export default DefaultLayout;
