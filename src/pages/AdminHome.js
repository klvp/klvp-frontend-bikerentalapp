/** @format */

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DefaultLayout from "../components/DefaultLayout";
import { getAllBikes, deleteBike } from "../redux/actions/bikesAction";
import { Row, Col, Spin, Tooltip, Popconfirm } from "antd";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

function AdminHome() {
  const { bikes } = useSelector((state) => state.bikesReducer);
  const { loading } = useSelector((state) => state.alertsReducer);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getAllBikes());
  }, [dispatch]);

  // function deleteBikes(bikeid) {
  //   // dispatch(deleteBike({ _id: bikeid }));
  //   // console.log(bikeid);
  // }

  return (
    <DefaultLayout>
      {loading === true && (
        <Spin size="large" tip="Loading..." className="spinner"></Spin>
      )}

      <Row justify="center" gutter="16" className="mt-4">
        <Col className="">
          <>
            <h1 style={{ color: "orangeRed" }}>Admin Panel</h1>
            <Link to="/addbike" className="btn1">
              Add New Bike
            </Link>
          </>
        </Col>
      </Row>

      <Row justify="center" gutter="16" className="mt-3">
        {bikes.map((bike) => (
          <Col lg={5} sm={10} xs={24} justify="center" key={bike._id}>
            <div className="bike p-3 bs1">
              <img src={bike.image} className="bikeimg" alt={bike.image} />
              <div className="bike-content ">
                <div className="mt-2">
                  <p>{bike.name}</p>
                  <p>Rent Per Hour = {bike.rentPerHour} Rs</p>
                </div>
                <div className="d-flex justify-content-around">
                  <Tooltip placement="left" title="Edit">
                    <span
                      className="mx-1"
                      style={{
                        color: "green",
                        fontSize: "1rem",
                        cursor: "pointer",
                      }}
                    >
                      <EditOutlined
                        onClick={() => {
                          history.push(`/editbike/${bike._id}`);
                        }}
                      />
                    </span>
                  </Tooltip>
                  <Popconfirm
                    title="Are you sure to delete this Bike?"
                    onConfirm={() => {
                      dispatch(deleteBike({ bikeid: bike._id }));
                      console.log(bike._id);
                    }}
                    okText="Yes"
                    cancelText="No"
                  >
                    <span
                      className="mx-1"
                      style={{
                        color: "red",
                        fontSize: "1rem",
                        cursor: "pointer",
                      }}
                    >
                      <DeleteOutlined
                      // onClick={}
                      />
                    </span>
                  </Popconfirm>
                </div>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </DefaultLayout>
  );
}

export default AdminHome;
