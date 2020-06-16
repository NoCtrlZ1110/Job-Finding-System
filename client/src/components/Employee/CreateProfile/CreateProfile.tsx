import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import Modal from "react-bootstrap/Modal";
import HTTP from "../../../services/request";
import axios from "axios";
import { toast } from "react-toastify";
import Table from "react-bootstrap/Table";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

export const CreateProfile: React.FC = () => {
  const [show, setShow] = useState(false);
  const [job, setJob] = useState({
    job: "",
    jobDetail: "",
    time: "",
    salary: "",
    talent: "",
    comment: "",
  });

  useEffect(() => {
    axios
      .get(HTTP.SERVER + "employee/job", { withCredentials: true })
      .then((response) => response.data)
      .then((msg) => setJob(msg));
  }, []);

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const data = {
      job: event.target.elements.job.value,
      jobDetail: event.target.elements.job_detail.value,
      time: event.target.elements.time.value,
      salary: event.target.elements.salary.value,
      talent: event.target.elements.talent.value,
      comment: event.target.elements.comment.value,
    };

    axios
      .post(HTTP.SERVER + "employee/job", data, { withCredentials: true })
      .then((response) => response.data)
      .then((msg) => toast(msg))
      .then(() => {
        axios
          .get(HTTP.SERVER + "employee/job", { withCredentials: true })
          .then((response) => response.data)
          .then((msg) => setJob(msg));
      });
  };

  return (
    <>
      <Container>
        <Row>
          <Col>
            <Card style={{ color: "#2665b8" }}>
              <Card.Header className="text-left">
                <div className="d-flex bd-highlight">
                  <h5 className="p-2 flex-grow-1 bd-highlight">
                    <b>HỒ SƠ VIỆC LÀM</b>
                  </h5>
                  <Button
                    variant="success"
                    className="mr-3 p-2 bd-highlight"
                    onClick={handleShow}
                  >
                    Cập nhật hồ sơ
                    <FontAwesomeIcon className="ml-2" icon={faEdit} />
                  </Button>
                </div>
              </Card.Header>
              <Card.Body style={{ textAlign: "left" }}>
                <div className="text-center">
                  <Table responsive>
                    <br />
                    <tbody>
                      <tr>
                        <td>Chuyên ngành</td>
                        <td>{job ? job.job : ""}</td>
                      </tr>
                      <tr>
                        <td>Mô tả</td>
                        <td>{job ? job.jobDetail : ""}</td>
                      </tr>
                      <tr>
                        <td>Thời gian</td>
                        <td>{job ? job.time : ""}</td>
                      </tr>
                      <tr>
                        <td>Lương mong muốn</td>
                        <td>{job ? job.salary : ""}</td>
                      </tr>
                      <tr>
                        <td>Ưu điểm</td>
                        <td>{job ? job.talent : ""}</td>
                      </tr>
                      <tr>
                        <td>Bổ sung</td>
                        <td>{job ? job.comment : ""}</td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <Modal show={show} onHide={handleClose} centered size="lg">
        <Form onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Tạo hồ sơ</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row></Row>
            <Row>
              <Col>
                <Form.Group controlId="job">
                  <Form.Label>
                    <b>Nhóm ngành</b>
                  </Form.Label>
                  <Form.Control required as="select">
                    <option value="">---</option>
                    <option>CNTT</option>
                    <option>Gia Sư</option>
                    <option>Bán Hàng</option>
                    <option>Sửa Chữa</option>
                    <option>Xây Dựng</option>
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="job_detail">
                  <Form.Label>
                    <b>Chuyên ngành</b>
                  </Form.Label>
                  <Form.Control required as="select">
                    <option value="">---</option>
                    <option>C</option>
                    <option>C++</option>
                    <option>Java</option>
                    <option>Web</option>
                    <option>Front-end</option>
                    <option>Back-end</option>
                    <option>Mobile App</option>
                    <option>Data Science</option>
                    <option>Machine Learning</option>
                    <option>Artificial Intelligence</option>
                    <option>Khác</option>
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="time">
                  <Form.Label>
                    <b>Thời gian</b>
                  </Form.Label>
                  <Form.Control required as="select">
                    <option value="">---</option>
                    <option value="Sáng">Ca sáng</option>
                    <option value="Tối">Ca tối</option>
                    <option value="Cả Ngày">Cả ngày</option>
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group controlId="salary">
                  <Form.Label>
                    <b>Mức lương mong muốn</b>
                  </Form.Label>
                  <Form.Control
                    required
                    type="number"
                    placeholder="Nhập mức lương mong muốn (Nghìn đồng /giờ)"
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="talent">
                  <Form.Label>
                    <b>Ưu điểm bản thân</b>
                  </Form.Label>
                  <Form.Control type="text" placeholder="Ưu điểm của bạn" />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="comment">
                  <Form.Label>
                    <b>Ghi chú</b>
                  </Form.Label>
                  <Form.Control type="comment" placeholder="Nhập chú thích" />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col xs={10} />
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <div className="d-flex flex-row-reverse">
              <Button
                className="btn-md my-3 mx-2"
                variant="primary"
                type="submit"
              >
                <>Lưu hồ sơ</>
                <FontAwesomeIcon className="ml-2" icon={faPlusCircle} />
              </Button>
            </div>
            <Button variant="danger" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};
