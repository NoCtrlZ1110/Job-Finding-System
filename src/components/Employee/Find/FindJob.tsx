import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export const FindJob: React.FC = () => {
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
                    <b>TÌM KIẾM VIỆC LÀM</b>
                  </h5>
                </strong>
              </Card.Header>
              <Card.Body style={{ textAlign: "left" }}>
                <Form>
                  <Form.Group>
                    <Form.Label>
                      <b>Khu vực</b>
                    </Form.Label>
                    <Form.Control
                      type="destination"
                      placeholder="Nhập khu vực bạn muốn tìm việc"
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>
                      <b>Loại công việc</b>
                    </Form.Label>
                    <Form.Control as="select">
                      <option>Công nghệ thông tin</option>
                      <option>Thiết kế đồ hoạ</option>
                      <option>Sửa ống nước</option>
                    </Form.Control>
                  </Form.Group>
                  <Row className="mb-3">
                    <Col>
                      <label className="col-form-label">
                        <b>Từ</b>
                      </label>
                      <input className="form-control col-10" type="date" />
                    </Col>
                    <Col>
                      <label className="col-form-label">
                        <b>Đến</b>
                      </label>
                      <input className="form-control " type="date" />
                    </Col>
                  </Row>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>
                      <b>Mức lương mong muốn</b>
                    </Form.Label>
                    <Form.Control
                      type="destination"
                      placeholder="Nhập khu vực bạn muốn tìm việc"
                    />
                  </Form.Group>

                  <div className="d-flex flex-row-reverse">
                    <Button
                      className="btn-md my-3 mx-2"
                      variant="primary"
                      // type="submit"
                      onClick={handleShow}
                    >
                      <b>Tìm kiếm</b>
                      <FontAwesomeIcon className="ml-2" icon={faSearch} />
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
          <Modal.Title>Kết quả tìm kiếm</Modal.Title>
        </Modal.Header>
        <Modal.Body className="search">
          <h2>Woohoo, không tìm thấy kết quả nào!</h2>
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
