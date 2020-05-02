import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import HTTP from "../../../services/request";
import Card from "react-bootstrap/Card";
import EmployerModel from "../../../model/EmployerModel";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import history from "../../../services/history";

export const EmployerInfo: React.FC = () => {
  let { id } = useParams();
  const [data, setData] = useState<EmployerModel>({
    employer_id: 11,
    name: "",
    area: "",
    address: "",
    job: "",
    job_detail: "",
    time: "",
    salary: 0,
    contact: "",
    comment: "",
    apply: null,
    request: "",
  });
  useEffect(() => {
    const fetchData = () => {
      const result = JSON.parse(
        HTTP.httpGet(HTTP.SERVER + `employee/find/${id}`)
      );
      setData(result[0]);
    };
    fetchData();
  }, [id]);

  return (
    <div className="text-center">
      <div className="container" style={{ maxWidth: "50em" }}>
        <h1 className="my-5">
          <strong>THÔNG TIN NHÀ TUYỂN DỤNG</strong>
        </h1>
        <Card bg="info" text="white">
          <Card.Body>
            <Card.Title>
              <h4>
                <b>{data.name}</b>
              </h4>
            </Card.Title>
            <div className="mt-4" style={{ textAlign: "left" }}>
              <ListGroup variant="flush">
                <Row>
                  <Col>
                    <ListGroup.Item action variant="info">
                      <b>Employee ID:</b> {data.employer_id}
                    </ListGroup.Item>
                    <ListGroup.Item action variant="info">
                      <b>Area:</b> {data.area}
                    </ListGroup.Item>
                    <ListGroup.Item action variant="info">
                      <b>Address:</b> {data.address}
                    </ListGroup.Item>
                    <ListGroup.Item action variant="info">
                      <b>Job:</b> {data.job}
                    </ListGroup.Item>
                    <ListGroup.Item action variant="info">
                      <b>Job Detail:</b> {data.job_detail}
                    </ListGroup.Item>
                  </Col>
                  <Col>
                    <ListGroup.Item action variant="info">
                      <b>Time:</b> {data.time}
                    </ListGroup.Item>
                    <ListGroup.Item action variant="info">
                      <b>Salary:</b> {data.salary}
                    </ListGroup.Item>
                    <ListGroup.Item action variant="info">
                      <b>Talent:</b> {data.request}
                    </ListGroup.Item>
                    <ListGroup.Item action variant="info">
                      <b>Contact:</b> {data.contact}
                    </ListGroup.Item>
                    <ListGroup.Item action variant="info">
                      <b>Comment:</b> {data.comment}
                    </ListGroup.Item>
                  </Col>
                </Row>
              </ListGroup>
            </div>
          </Card.Body>
        </Card>
        <div className="text-center">
          <Button className="m-5" variant="success">
            Đăng ký xin việc
          </Button>
          <Button className="m-5" variant="success" onClick={history.goBack}>
            Quay Lại
          </Button>
        </div>
      </div>
    </div>
  );
};
