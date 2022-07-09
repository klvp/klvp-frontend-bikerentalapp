/** @format */

import React from "react";
import { Row, Col, Form, Input } from "antd";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userLogin } from "../redux/actions/userAction";
import AOS from "aos";
import "aos/dist/aos.css"; // You can also use <link> for styles
// ..
AOS.init();

function Login() {
  const dispatch = useDispatch();
  const onFinish = (values) => {
    dispatch(userLogin(values));
    console.log(values);
  };
  return (
    <div className="login">
      <Row gutters={16} className="d-flex align-items-center">
        <Col lg={16}>
          <img
            data-aos="slide-right"
            data-aos-duration="1500"
            src="https://images.unsplash.com/photo-1656420731047-3eb41c9d1dee?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8YmxhY2slMjBtb3RvcmN5Y2xlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
            alt="Bike"
          />
        </Col>
        <Col lg={8} className="text-left p-5">
          <Form
            layout="vertical"
            className="login-form p-5"
            onFinish={onFinish}
          >
            <h1>Login</h1>
            <hr />
            <Form.Item
              name="username"
              label="Username"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <button className="btn1 mb-3">Login</button> <br />
            <Link to="/register">
              Dont Have an account Click here to Register
            </Link>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default Login;
