import React from "react";
import { RouteWithSubRoutes } from "../../AppRouter";
import { Switch, Link } from "react-router-dom";
/* import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col"; */
import Button from "react-bootstrap/Button";
import { CardImg, Container, Row, Col } from "reactstrap";

export const Employer: React.FC<{ routes: any }> = ({ routes }) => {
  return (
    <div className="text-center">
      <br />
      <br />
      <br />
      <Row>
        <Col md={4}>
          <div>
            <Link to="/employer/profileInfo">
              <CardImg
                id="sideBtn"
                alt="..."
                src={require("../../img/employer.png")}
              />
            </Link>
          </div>
          <div>
            <Link to="/employer/myJobs">
              <Button className="m-3 mt-4" variant="secondary" id="sideBtn">
                Việc làm của bạn
              </Button>
            </Link>
          </div>
          <div>
            <Link to="/employer/list">
              <Button className="m-3 mt-4" variant="primary" id="sideBtn">
                Thống kê người tìm việc
              </Button>
            </Link>
          </div>
          <div>
            <Link to="/employer/findEmployee">
              <Button className="m-3" variant="success" id="sideBtn">
                Tìm kiếm ứng viên
              </Button>
            </Link>
          </div>
          <div>
            <Link to="/employer/create">
              <Button className="m-3" variant="info" id="sideBtn">
                Tạo hồ sơ tuyển dụng
              </Button>
            </Link>
          </div>
        </Col>
        <Col md={8}>
          <Container>
            <Row>
              <Col>
                <Switch>
                  {routes.map((route: any, i: any) => (
                    <RouteWithSubRoutes key={i} {...route} />
                  ))}
                </Switch>
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
    </div>
  );
};
