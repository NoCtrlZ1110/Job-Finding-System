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

export const CreateProfile: React.FC = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
                <Form>
                  <Form.Group>
                    <Form.Label>
                      <b>Họ và Tên</b>
                    </Form.Label>
                    <Form.Control
                      type="destination"
                      placeholder="Nhập tên của bạn"
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>
                      <b>Số điện thoại</b>
                    </Form.Label>
                    <Form.Control
                      type="destination"
                      placeholder="Nhập số điện thoại"
                    />
                  </Form.Group>

                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>
                      <b>Email</b>
                    </Form.Label>
                    <Form.Control
                      type="destination"
                      placeholder="Nhập email của bạn"
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>
                      <b>Địa Chỉ</b>
                    </Form.Label>
                    <Form.Control
                      type="destination"
                      placeholder="Nhập địa chỉ"
                    />
                  </Form.Group>

                  <div className="d-flex flex-row-reverse">
                    <Button
                      className="btn-md my-3 mx-2"
                      variant="primary"
                      onClick={handleShow}
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
