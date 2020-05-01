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
                  <Row>
                    <Col>
                      <Form.Group>
                        <Form.Label>
                          <b>Tỉnh Thành</b>
                        </Form.Label>
                        <Form.Control as="select">
                          <option></option>
                          <option>Hà Nội</option>
                        </Form.Control>
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group>
                        <Form.Label>
                          <b>Khu Vực</b>
                        </Form.Label>
                        <Form.Control as="select">
                          <option>---</option>
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
                  <Form.Group>
                    <Form.Label>
                      <b>Loại công việc</b>
                    </Form.Label>
                    <Form.Control as="select">
                      <option>---</option>
                      <option>Công nghệ thông tin</option>
                      <option>Thiết kế đồ hoạ</option>
                      <option>Sửa ống nước</option>
                    </Form.Control>
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>
                      <b>Mức lương mong muốn</b>
                    </Form.Label>
                    <Form.Control
                      type="destination"
                      placeholder="Đơn vị: Nghìn $/giờ"
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>
                      <b>Thời gian làm việc</b>
                    </Form.Label>
                    <Form.Control as="select">
                      <option>---</option>
                      <option>Ca sáng</option>
                      <option>Ca tối</option>
                      <option>Cả ngày</option>
                    </Form.Control>
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
