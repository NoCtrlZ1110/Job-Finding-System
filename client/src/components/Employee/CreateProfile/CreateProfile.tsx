import React, { useState } from "react";
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
import history from "../../../services/history";

export const CreateProfile: React.FC = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    history.push("/list/employee");
  };
  const handleShow = () => setShow(true);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const data = {
      name: event.target.elements.name.value,
      sex: event.target.elements.sex.value,
      age: event.target.elements.age.value,
      contact: event.target.elements.contact.value,
      area: event.target.elements.area.value,
      address: event.target.elements.address.value,
      job: event.target.elements.job.value,
      job_detail: event.target.elements.job_detail.value,
      time: event.target.elements.time.value,
      salary: event.target.elements.salary.value,
      talent: event.target.elements.talent.value,
      comment: event.target.elements.comment.value,
    };

    console.log(data);

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    fetch(HTTP.SERVER + "employee/create", requestOptions)
      .then((response) => response.json())
      .then(() => handleShow());
  };

  return (
    <>
      <Container>
        <Row>
          <Col>
            <Card style={{ color: "#2665b8" }}>
              <Card.Header>
                <strong>
                  <h5>
                    <b>TẠO HỒ SƠ VIỆC LÀM</b>
                  </h5>
                </strong>
              </Card.Header>
              <Card.Body style={{ textAlign: "left" }}>
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col>
                      <Form.Group controlId="name">
                        <Form.Label>
                          <b>Họ và Tên</b>
                        </Form.Label>
                        <Form.Control required placeholder="Nhập tên của bạn" />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group controlId="sex">
                        <Form.Label>
                          <b>Giới Tính</b>
                        </Form.Label>
                        <Form.Control required as="select">
                          <option value="">---</option>
                          <option>Nam</option>
                          <option>Nữ</option>
                        </Form.Control>
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group controlId="age">
                        <Form.Label>
                          <b>Tuổi</b>
                        </Form.Label>
                        <Form.Control
                          required
                          type="number"
                          placeholder="Nhập tuổi của bạn"
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Form.Group controlId="contact">
                    <Form.Label>
                      <b>Email</b>
                    </Form.Label>
                    <Form.Control
                      required
                      type="email"
                      placeholder="Nhập email của bạn"
                    />
                  </Form.Group>
                  <Row>
                    <Col>
                      <Form.Group>
                        <Form.Label>
                          <b>Tỉnh Thành</b>
                        </Form.Label>
                        <Form.Control as="select">
                          <option>---</option>
                          <option>Hà Nội</option>
                        </Form.Control>
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group controlId="area">
                        <Form.Label>
                          <b>Khu vực</b>
                        </Form.Label>
                        <Form.Control required as="select">
                          <option value="">---</option>
                          <option>Ba Đình</option>
                          <option>Bắc Từ Liêm</option>
                          <option>Cầu Giấy</option>
                          <option>Đống Đa</option>
                          <option>Hà Đông</option>
                          <option>Hai Bà Trưng</option>
                          <option>Hoàn Kiếm</option>
                          <option>Hoàng Mai</option>
                          <option>Long Biên</option>
                          <option>Nam Từ Liêm</option>
                          <option>Tây Hồ</option>
                          <option>Thanh Xuân</option>
                          <option>Sơn Tây</option>
                        </Form.Control>
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group controlId="address">
                        <Form.Label>
                          <b>Địa chỉ cụ thể</b>
                        </Form.Label>
                        <Form.Control
                          required
                          type="text"
                          placeholder="Số nhà, đường, ..."
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Group controlId="job">
                        <Form.Label>
                          <b>Nhóm ngành</b>
                        </Form.Label>
                        <Form.Control required as="select">
                          <option value="">---</option>
                          <option>CNTT</option>
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
                          <option>Sáng</option>
                          <option>Chiều</option>
                          <option>Tối</option>
                          <option>Cả ngày</option>
                        </Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Group controlId="salary">
                        <Form.Label>
                          <b>Mức lương tối thiểu mong muốn</b>
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
                        <Form.Control
                          type="text"
                          placeholder="Ưu điểm của bạn"
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group controlId="comment">
                        <Form.Label>
                          <b>Ghi chú</b>
                        </Form.Label>
                        <Form.Control
                          type="comment"
                          placeholder="Nhập chú thích"
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <div className="d-flex flex-row-reverse">
                    <Button
                      className="btn-md my-3 mx-2"
                      variant="primary"
                      type="submit"
                    >
                      <b>Tạo hồ sơ</b>
                      <FontAwesomeIcon className="ml-2" icon={faPlusCircle} />
                    </Button>
                  </div>
                  <Row>
                    <Col xs={10} />
                  </Row>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <Modal show={show} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Tạo hồ sơ</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h2>Đã tạo hồ sơ thành công!</h2>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
