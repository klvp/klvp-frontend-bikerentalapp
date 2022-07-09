/** @format */

import React from "react";
import DefaultLayout from "../components/DefaultLayout";
import { Row, Col, Form, Input, Divider, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { addBike } from "../redux/actions/bikesAction";

export default function AddBike() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.alertsReducer);
  function onFinish(values) {
    values.bookedTimeSlots = [];
    dispatch(addBike(values));
    console.log(values);
  }
  return (
    <DefaultLayout>
      {loading && (
        <Spin size="large" tip="Loading..." className="spinner"></Spin>
      )}
      <Row justify="center" gutter={16}>
        <Col lg={10} sm={15} xs={20}>
          <Form layout="vertical" onFinish={onFinish}>
            <h1 className="mt-3" style={{ color: "orangeRed" }}>
              Add New Bike
            </h1>
            <Divider />
            <Form.Item
              name="name"
              label="Bike Name"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="image"
              label="Bike Image URL"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="rentPerHour"
              label="Rent per Hour"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="milage"
              label="Mileage"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="type"
              label="Bike Type"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <button className="btn1">Add Bike</button>
          </Form>
        </Col>
      </Row>
    </DefaultLayout>
  );
}
