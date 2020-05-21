import React, { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import HTTP from "../../../services/request";
import history from "../../../services/history";

export const CreateJob: React.FC = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    history.push("/list/employer");
  };
  const handleShow = () => setShow(true);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const data = {
      name: event.target.elements.name.value,
      area: event.target.elements.area.value,
      address: event.target.elements.address.value,
      job: event.target.elements.job.value,
      job_detail: event.target.elements.job_detail.value,
      time: event.target.elements.time.value,
      salary: event.target.elements.salary.value,
      request: event.target.elements.request.value,
      contact: event.target.elements.contact.value,
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
    fetch(HTTP.SERVER + "employer/create", requestOptions)
      .then((response) => response.json())
      .then(() => handleShow());
  };

  return (
    <>
      <Card style={{ color: "#2665b8" }}>
        <Card.Header>
          <strong>
            <h5>
              <b>TẠO HỒ SƠ TUYỂN DỤNG</b>
            </h5>
          </strong>
        </Card.Header>
        <Card.Body style={{ textAlign: "left" }}>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col>
                <Row>
                  <Col xs={6}>
                    <Form.Group controlId="name">
                      <Form.Label>
                        <b>Tên công ty</b>
                      </Form.Label>
                      <Form.Control
                        required
                        type="destination"
                        placeholder="Nhập tên công ty của bạn"
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={3}>
                    <Form.Group>
                      <Form.Label>
                        <b>Tỉnh Thành</b>
                      </Form.Label>
                      <Form.Control required as="select">
                        <option value="">---</option>
                        <option>Hà Nội</option>
                      </Form.Control>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="area">
                      <Form.Label>
                        <b>Khu Vực</b>
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
                </Row>
                <Row>
                  <Col>
                    <Form.Group controlId="contact">
                      <Form.Label>
                        <b>Email</b>
                      </Form.Label>
                      <Form.Control
                        required
                        type="email"
                        placeholder="Nhập email công ty"
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="address">
                      <Form.Label>
                        <b>Địa chỉ cụ thể công ty</b>
                      </Form.Label>
                      <Form.Control
                        required
                        type="destination"
                        placeholder="Nhập địa chỉ cụ thể công ty"
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col xs={6}>
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
                  <Col xs={3}>
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
                        <option>---</option>
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
                </Row>
                <Row>
                  <Col>
                    <Form.Group controlId="salary">
                      <Form.Label>
                        <b>Mức lương tối đa</b>
                      </Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Đơn vị: nghìn $/giờ"
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="request">
                      <Form.Label>
                        <b>Yêu cầu</b>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Yêu cầu ứng viên"
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group controlId="comment">
                  <Form.Label>
                    <b>Ghi chú</b>
                  </Form.Label>
                  <Form.Control type="comment" placeholder="Nhập chú thích" />
                </Form.Group>
              </Col>
            </Row>

            <div className="d-flex flex-row-reverse">
              <Button
                className="btn-md my-3 mx-2"
                variant="primary"
                type="submit"
                // onClick={handleShow}
              >
                <b>
                  Tạo Hồ Sơ
                  <FontAwesomeIcon className="ml-2" icon={faPlusCircle} />
                </b>
              </Button>
            </div>
            <Row>
              <Col xs={10} />
            </Row>
          </Form>
        </Card.Body>
      </Card>

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
