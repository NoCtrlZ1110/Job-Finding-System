/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../../services/store";
import { Button, Card, Container, Row, Col } from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import { useParams } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import axios from "axios";
import HTTP from "../../../services/request";

const JobDetail: React.FC = () => {
  let { id }: any = useParams();
  const { Role }: any = useContext(AuthContext);
  const [job, setJob]: any = useState(null);
  const [role, setRole] = Role;
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    axios
      .get(HTTP.SERVER + "employee/find/" + id, { withCredentials: true })
      .then((response) => response.data)
      .then((data) => setJob(data));
    // .then(()=>console.log(user);
  }, []);
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
                        src={require("../../../assets/img/theme/profile.jpg")}
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
                        Xin việc
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
                    {job ? job.name : ""}
                    <span className="font-weight-light">
                      , {job ? job.age : ""}
                    </span>
                  </h3>

                  <Table responsive>
                    <br />
                    <tbody>
                      <tr>
                        <td>Vai trò</td>
                        <td>{job ? job.nameJob : ""}</td>
                      </tr>
                      <tr>
                        <td>Công việc</td>
                        <td>{job ? job.job : ""}</td>
                      </tr>
                      <tr>
                        <td>Mô tả</td>
                        <td>{job ? job.job : ""}</td>
                      </tr>
                      <tr>
                        <td>Số lượng</td>
                        <td>{job ? job.count : ""}</td>
                      </tr>
                      <tr>
                        <td>Thời gian</td>
                        <td>{job ? job.time : ""}</td>
                      </tr>
                      <tr>
                        <td>Làm việc từ</td>
                        <td>
                          {job
                            ? JSON.stringify(job.dateStart).slice(1, 11)
                            : ""}
                        </td>
                      </tr>
                      <tr>
                        <td>Lương</td>
                        <td>{job ? job.salary : ""}</td>
                      </tr>
                      <tr>
                        <td>Yêu cầu</td>
                        <td>{job ? job.require : ""}</td>
                      </tr>
                      <tr>
                        <td>Khu vực</td>
                        <td>{job ? job.area : ""}</td>
                      </tr>
                      <tr>
                        <td>Địa chỉ</td>
                        <td>{job ? job.address : ""}</td>
                      </tr>
                      <tr>
                        <td>Điện thoại</td>
                        <td>{job ? job.phone : ""}</td>
                      </tr>
                      <tr>
                        <td>Email</td>
                        <td>{job ? job.email : ""}</td>
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
    </>
  );
};

export default JobDetail;
