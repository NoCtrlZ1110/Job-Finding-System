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

const EmployeeJobDetail: React.FC = () => {
  let { id }: any = useParams();
  const [info, setInfo]: any = useState(null);
  const handleInvite = () => {
    toast.info("Tính năng đang phát triền 😝", { position: "bottom-right" });
    // axios
    //   .post(
    //     HTTP.SERVER + "employee/find/" + id + "/submit_apply",
    //     {},
    //     {
    //       withCredentials: true,
    //     }
    //   )
    //   .then((response) => response.data)
    //   .then((msg) => {
    //     if (msg === "done") toast.success("😋 Xin việc thành công!");
    //     else toast.error("😥 Xin việc thất bại!");
    //   });
  };

  useEffect(() => {
    axios
      .get(HTTP.SERVER + "employer/find/" + id, { withCredentials: true })
      .then((response) => response.data)
      .then((data) => setInfo(data));
    // .then(()=>console.log(user);
  }, [id]);
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
                        onClick={handleInvite}
                        size="sm"
                      >
                        Tuyển dụng
                      </Button>
                    </div>
                  </Col>
                  <Col className="order-lg-1" lg="4">
                    <div className="card-profile-stats d-flex justify-content-center">
                      <div>
                        <span className="heading">
                          {info ? info.salary + "$" : ""}
                        </span>
                        <span className="description">Lương (/giờ)</span>
                      </div>
                    </div>
                  </Col>
                </Row>
                <div className="text-center mt-5">
                  <h3>
                    {info ? info.name : ""}
                    <span className="font-weight-light">
                      , {info ? info.age : ""}
                    </span>
                  </h3>

                  <Table responsive>
                    <br />
                    <tbody>
                      <tr>
                        <td>Giới tính</td>
                        <td>{info ? info.sex : ""}</td>
                      </tr>
                      <tr>
                        <td>Công việc</td>
                        <td>{info ? info.job : ""}</td>
                      </tr>
                      <tr>
                        <td>Mô tả</td>
                        <td>{info ? info.jobDetail : ""}</td>
                      </tr>

                      <tr>
                        <td>Thời gian</td>
                        <td>{info ? info.time : ""}</td>
                      </tr>

                      <tr>
                        <td>Lương mong muốn</td>
                        <td>{info ? info.salary + "$ / giờ" : ""}</td>
                      </tr>
                      <tr>
                        <td>Ưu điểm</td>
                        <td>{info ? info.talent : ""}</td>
                      </tr>
                      <tr>
                        <td>Khu vực</td>
                        <td>{info ? info.area : ""}</td>
                      </tr>
                      <tr>
                        <td>Địa chỉ</td>
                        <td>{info ? info.address : ""}</td>
                      </tr>
                      <tr>
                        <td>Điện thoại</td>
                        <td>{info ? info.phone : ""}</td>
                      </tr>
                      <tr>
                        <td>Email</td>
                        <td>{info ? info.email : ""}</td>
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
                        href="#showMore"
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

export default EmployeeJobDetail;
