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
import HTTP from "../../../services/request";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";

export const FindJob: React.FC = () => {
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
      dataField: "employer_id",
      text: "ID",
    },
    {
      dataField: "name",
      text: "Name",
    },
    {
      dataField: "area",
      text: "Khu Vực",
    },
    {
      dataField: "address",
      text: "Địa chỉ",
    },
    {
      dataField: "job",
      text: "Ngành",
    },
    {
      dataField: "time",
      text: "Thời gian",
    },
    {
      dataField: "salary",
      text: "Lương mong muốn",
    },
    {
      dataField: "request",
      text: "Yêu Cầu",
    },
    {
      dataField: "comment",
      text: "Ghi chú",
    },
    {
      dataField: "employer_id",
      text: "Action",
      formatter: (cellContent: any, _row: any) => {
        let link = `/employer/info/${cellContent}`;
        return (
          <a className="btn btn-success" href={link}>
            Chi tiết
          </a>
        );
      },
    },
  ];

  const handleSubmit = (event: any) => {
    event.preventDefault();
    console.log(event);

    const data = {
      area: event.target.elements.area.value,
      job: event.target.elements.job.value,
      time: event.target.elements.time.value,
      salary: event.target.elements.salary.value,
    };

    console.log(data);

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    fetch(HTTP.SERVER + "employer/find", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        handleShow();
      });
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
                    <b>TÌM KIẾM VIỆC LÀM</b>
                  </h5>
                </strong>
              </Card.Header>
              <Card.Body style={{ textAlign: "left" }}>
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col>
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
                  <Form.Group controlId="job">
                    <Form.Label>
                      <b>Loại công việc</b>
                    </Form.Label>
                    <Form.Control as="select">
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

                  <Form.Group controlId="salary">
                    <Form.Label>
                      <b>Mức lương mong muốn</b>
                    </Form.Label>
                    <Form.Control
                      type="destination"
                      placeholder="Đơn vị: Nghìn $/giờ"
                    />
                  </Form.Group>

                  <Form.Group controlId="time">
                    <Form.Label>
                      <b>Thời gian làm việc</b>
                    </Form.Label>
                    <Form.Control as="select">
                      <option value="">---</option>
                      <option>Ca sáng</option>
                      <option>Ca tối</option>
                      <option>Cả ngày</option>
                    </Form.Control>
                  </Form.Group>

                  <div className="d-flex flex-row-reverse">
                    <Button
                      className="btn-md my-3 mx-2"
                      variant="primary"
                      type="submit"
                      // onClick={handleShow}
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
        <Modal.Body className="search">
          <h2>Đã tìm thấy {data ? data.length : "0"} kết quả!</h2>

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
