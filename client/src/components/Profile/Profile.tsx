/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext, useState } from "react";
import { AuthContext } from "../../services/store";
import { Button, Card, Container, Row, Col } from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import axios from "axios";
import HTTP from "../../services/request";

const Profile: React.FC = () => {
  const { User, IsLogged }: any = useContext(AuthContext);
  const [user, setUser] = User;
  const [isLogged, setLogged] = IsLogged;
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleSubmit = (event: any) => {
    event.preventDefault();
    console.log(event.target.elements);

    const data = {
      address: event.target.elements.address.value,
      age: event.target.elements.age.value,
      area: event.target.elements.area.value,
      email: event.target.elements.email.value,
      name: event.target.elements.name.value,
      phone: event.target.elements.phone.value,
      sex: event.target.elements.sex.value,
    };

    console.log(data);

    axios
      .post(HTTP.SERVER + user.type + "/profile", data, {
        withCredentials: true,
      })
      .then((response) => response.data)
      .then((data) => {
        if (data === "ok") {
          toast("✨ Cập nhật thông tin thành công!");
          setInterval(() => window.location.reload(), 1500);
          handleClose();
        }
      });
  };
  return (
    <>
      <main className="profile-page">
        <section className="section-profile-cover section-shaped my-0" />
        <section className="section mt--300">
          <Container>
            <Card className="card-profile shadow mt--300">
              <div className="px-4">
                <Row className="justify-content-center">
                  <Col className="order-lg-2" lg="3">
                    <div className="card-profile-image">
                      <img
                        alt="..."
                        className="rounded-circle"
                        src={require("../../assets/img/theme/profile.jpg")}
                      />
                    </div>
                  </Col>
                  <Col
                    className="order-lg-3 text-lg-right align-self-lg-center"
                    lg="4"
                  >
                    <div className="card-profile-actions py-4 mt-lg-0">
                      <Button
                        className="mr-4"
                        color="info"
                        href="#pablo"
                        onClick={handleShow}
                        size="sm"
                      >
                        Edit Profile
                      </Button>
                    </div>
                  </Col>
                  <Col className="order-lg-1" lg="4">
                    <div className="card-profile-stats d-flex justify-content-center">
                      <div>
                        <span className="heading">22</span>
                        <span className="description">Friends</span>
                      </div>
                      <div>
                        <span className="heading">10</span>
                        <span className="description">Photos</span>
                      </div>
                      <div>
                        <span className="heading">89</span>
                        <span className="description">Comments</span>
                      </div>
                    </div>
                  </Col>
                </Row>
                <div className="text-center mt-5">
                  <h3>
                    {user ? user.name : ""}
                    <span className="font-weight-light">
                      , {user ? user.age : ""}
                    </span>
                  </h3>

                  <Table responsive>
                    <br />
                    <tbody>
                      <tr>
                        <td>Khu vực</td>
                        <td>{user ? user.area : ""}</td>
                      </tr>
                      <tr>
                        <td>Địa chỉ</td>
                        <td>{user ? user.address : ""}</td>
                      </tr>
                      <tr>
                        <td>Điện thoại</td>
                        <td>{user ? user.phone : ""}</td>
                      </tr>
                      <tr>
                        <td>Email</td>
                        <td>{user ? user.email : ""}</td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
                <div className=" py-5 border-top text-center">
                  <Row className="justify-content-center">
                    <Col lg="9">
                      <p>
                        Đừng bao giờ sợ thất bại. Bạn chỉ cần đúng có một lần
                        trong đời thôi.
                      </p>
                      <a
                        href="#pablo"
                        onClick={(e: any) =>
                          toast.info("😁😁😁 Không có gì ở đây hết", {
                            position: "bottom-right",
                          })
                        }
                      >
                        Show more
                      </a>
                    </Col>
                  </Row>
                </div>
              </div>
            </Card>
          </Container>
        </section>
      </main>
      <Modal
        show={show}
        onHide={handleClose}
        centered
        size="lg"
        id="resultModal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Sửa thông tin cá nhân</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body className="search">
            <Form.Group controlId="name">
              <Form.Label>
                <b>Tên</b>
              </Form.Label>
              <Form.Control
                type="name"
                placeholder={user ? user.name : ""}
                required
              />
            </Form.Group>
            <Row>
              {" "}
              <Col>
                <Form.Group controlId="sex">
                  <Form.Label>
                    <b>Giới tính</b>
                  </Form.Label>
                  <Form.Control as="select" required>
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
                    type="number"
                    required
                    placeholder={user ? user.age : ""}
                  />
                </Form.Group>
              </Col>
            </Row>
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
            <Form.Group controlId="address">
              <Form.Label>
                <b>Địa chỉ</b>
              </Form.Label>
              <Form.Control
                type="address"
                required
                placeholder={user ? user.address : ""}
              />
            </Form.Group>
            <Form.Group controlId="phone">
              <Form.Label>
                <b>Số điện thoại</b>
              </Form.Label>
              <Form.Control
                type="number"
                required
                placeholder={user ? user.phone : ""}
              />
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>
                <b>Email</b>
              </Form.Label>
              <Form.Control
                type="email"
                required
                placeholder={user ? user.email : ""}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" type="submit">
              Submit
            </Button>
            <Button variant="danger" onClick={handleClose}>
              Cancel
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default Profile;
