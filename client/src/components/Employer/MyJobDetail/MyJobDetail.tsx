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
import history from "../../../services/history";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";

const MyJobDetail: React.FC = () => {
  let { id }: any = useParams();
  const [job, setJob]: any = useState(null);

  useEffect(() => {
    axios
      .get(HTTP.SERVER + "employer/job/" + id, { withCredentials: true })
      .then((response) => response.data)
      .then((data) => {
        toast(data);
        setJob(data);
      });
  }, [id]);

  //---

  let handleInvite = (id2: number) => {
    axios
      .post(
        HTTP.SERVER + `employer/job/${id}/find/${id2}/invite`,
        {},
        {
          withCredentials: true,
        }
      )
      .then((response) => response.data)
      .then((data) => {
        if (data === "ok") toast.success("🤩 Mời việc thành công!");
        else toast.error("🥱 Mời việc thất bại");
      });
  };

  const [show, setShow] = useState(false);
  const [data, setData] = useState();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const options = {
    // pageStartIndex: 0,
    sizePerPage: 3,
    hideSizePerPage: true,
    hidePageListOnlyOnePage: true,
  };

  const columns = [
    {
      dataField: "employeeId",
      text: "ID",
    },
    {
      dataField: "name",
      text: "Name",
    },

    {
      dataField: "job",
      text: "Ngành",
    },

    {
      dataField: "jobDetail",
      text: "Mô tả",
    },
    {
      dataField: "salary",
      text: "Lương mong muốn",
    },

    {
      dataField: "employeeId",
      text: "Chi tiết",
      formatter: (cellContent: any, row: any) => {
        let link = `/employer/employeeInfo/${cellContent}`;
        return (
          <a className="btn btn-sm btn-success" href={link}>
            Chi tiết
          </a>
        );
      },
    },
    {
      dataField: "employeeId",
      text: "Tuyển dụng",
      formatter: (cellContent: any, row: any) => {
        return (
          <Button
            className="btn btn-success btn-sm"
            onClick={() => handleInvite(cellContent)}
          >
            Tuyển Dụng
          </Button>
        );
      },
    },
  ];

  const handleSearch = (event: any) => {
    event.preventDefault();
    console.log(event);

    axios
      .get(HTTP.SERVER + `employer/job/${id}/find`, {
        withCredentials: true,
      })
      .then((response) => response.data)
      .then((data) => {
        if (data === "not found") {
          toast.error("🙄 Không tìm thấy két quả nào!");
        } else {
          setData(data);
          handleShow();
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
                        onClick={handleSearch}
                        size="sm"
                      >
                        Tìm ứng viên
                      </Button>
                      <Button
                        className="mr-4"
                        color="info"
                        onClick={history.goBack}
                        size="sm"
                      >
                        Quay lại
                      </Button>
                    </div>
                  </Col>
                  <Col className="order-lg-1" lg="4">
                    <div className="card-profile-stats d-flex justify-content-center">
                      <div>
                        <span className="heading">{job ? job.count : ""}</span>
                        <span className="description">Số lượng</span>
                      </div>

                      <div>
                        <span className="heading">
                          {job ? job.salary + "$" : ""}
                        </span>
                        <span className="description">Lương (/giờ)</span>
                      </div>
                    </div>
                  </Col>
                </Row>
                <div className="text-center mt-5">
                  <h3>{job ? job.nameJob : ""}</h3>

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
                        <td>{job ? job.salary + "$ / giờ" : ""}</td>
                      </tr>
                      <tr>
                        <td>Yêu cầu</td>
                        <td>{job ? job.require : ""}</td>
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
      <Modal
        show={show}
        onHide={handleClose}
        centered
        size="lg"
        id="resultModal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Kết quả tìm kiếm</Modal.Title>
        </Modal.Header>
        <Modal.Body className="search text-center">
          <h2>
            Đã tìm thấy {data ? data.length : "0"} ứng viên phù hợp với công
            việc "{job ? job.nameJob : ""}" !
          </h2>
          <br />
          <br />

          <BootstrapTable
            keyField="id"
            id="table"
            data={data}
            columns={columns}
            pagination={paginationFactory(options)}
          />
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

export default MyJobDetail;
