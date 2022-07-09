/** @format */

import React, { useEffect, useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import { Row, Col, Form, Input, Divider, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { editBike, getAllBikes } from "../redux/actions/bikesAction";
import { useParams } from "react-router-dom";

export default function EditBike() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.alertsReducer);
  const { bikes } = useSelector((state) => state.bikesReducer);
  const [bike, setBike] = useState(null);
  const { bikeid } = useParams();

  function onFinish(values) {
    values._id = bike._id;
    dispatch(editBike(values));
    console.log(values);
  }
  useEffect(() => {
    if (bikes.length === 0) {
      dispatch(getAllBikes());
    } else {
      setBike(bikes.find((bk) => bk._id == bikeid));

      // console.log(bike);
    }
  }, [bike, bikes]);

  return (
    <DefaultLayout>
      {loading && (
        <Spin size="large" tip="Loading..." className="spinner"></Spin>
      )}
      {bike && (
        <Row justify="center" gutter={16}>
          <Col lg={10} sm={15} xs={20}>
            <Form initialValues={bike} layout="vertical" onFinish={onFinish}>
              <h1 className="mt-3" style={{ color: "orangeRed" }}>
                Update Bike
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
              <button className="btn1">Update Bike</button>
            </Form>
          </Col>
        </Row>
      )}
    </DefaultLayout>
  );
}
