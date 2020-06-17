import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import HTTP from "../../../services/request";
import axios from "axios";
import { toast } from "react-toastify";

export const CreateJob: React.FC = () => {
  const handleSubmit = (event: any) => {
    event.preventDefault();
    const data = {
      namejob: event.target.elements.namejob.value,
      count: event.target.elements.count.value,
      job: event.target.elements.job.value,
      jobDetail: event.target.elements.job_detail.value,
      time: event.target.elements.time.value,
      salary: event.target.elements.salary.value,
      require: event.target.elements.require.value,
      comment: event.target.elements.comment.value,
      dateStart: event.target.elements.dateStart.value,
    };

    console.log(data);

    axios
      .post(HTTP.SERVER + "employer/job/create", data, {
        withCredentials: true,
      })
      .then((response) => response.data)
      .then((msg) => {
        if (msg === "done") toast("😎 Tạo việc làm thành công");
        else toast("🙄 Tạo việc làm thất bại");
      });
  };

  return (
    <>
      <Card style={{ color: "#2665b8" }}>
        <Card.Header>
          <h5>
            <b>TẠO HỒ SƠ TUYỂN DỤNG</b>
          </h5>
        </Card.Header>
        <Card.Body style={{ textAlign: "left" }}>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col>
                <Row>
                  <Col xs={6}>
                    <Form.Group controlId="namejob">
                      <Form.Label>
                        <b>Tên công việc</b>
                      </Form.Label>
                      <Form.Control
                        required
                        type="destination"
                        placeholder="Nhập tên công việc"
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="count">
                      <Form.Label>
                        <b>Số lượng</b>
                      </Form.Label>
                      <Form.Control
                        required
                        type="number"
                        placeholder="Số người muốn tuyển"
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col></Col>
                  <Col></Col>
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
                        <option>Gia Sư</option>
                        <option>Bán Hàng</option>
                        <option>Sửa Chữa</option>
                        <option>Xây Dựng</option>
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
                        required
                        type="number"
                        placeholder="Đơn vị: nghìn $/giờ"
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="time">
                      <Form.Label>
                        <b>Thời gian</b>
                      </Form.Label>
                      <Form.Control required as="select">
                        <option value="">---</option>
                        <option value="Sáng">Ca sáng</option>
                        <option value="Tối">Ca tối</option>
                        <option value="Cả Ngày">Cả ngày</option>
                      </Form.Control>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group controlId="dateStart">
                      <Form.Label>
                        <b>Ngày bắt đầu</b>
                      </Form.Label>
                      <Form.Control type="date" required />
                    </Form.Group>
                  </Col>

                  <Col>
                    <Form.Group controlId="require">
                      <Form.Label>
                        <b>Yêu cầu</b>
                      </Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="Yêu cầu ứng viên"
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row></Row>
                <Form.Group controlId="comment">
                  <Form.Label>
                    <b>Ghi chú</b>
                  </Form.Label>
                  <Form.Control
                    type="comment"
                    required
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
                // onClick={handleShow}
              >
                Tạo Hồ Sơ
                <FontAwesomeIcon className="ml-2" icon={faPlusCircle} />
              </Button>
            </div>
            <Row>
              <Col xs={10} />
            </Row>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
};
