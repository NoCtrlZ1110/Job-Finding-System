import React from "react";
import { RouteWithSubRoutes } from "../../AppRouter";
import { Switch, Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { CardImg, Container, Row, Col } from "reactstrap";

export const Employee: React.FC<{ routes: any }> = ({ routes }) => {
  return (
    <div className="text-center">
      <br />
      <br />
      <br />
      <Row>
        <Col />
        <Col md={3}>
          <div>
            <Link to="profile">
              <CardImg
                id="sideBtn"
                alt="..."
                src={require("../../img/employee.png")}
              />
            </Link>
          </div>
          <div>
            <Link to="list">
              <Button className="m-3" variant="success" id="sideBtn">
                Tất cả việc làm có sẵn
              </Button>
            </Link>
          </div>
          <div>
            <Link to="find">
              <Button className="m-3" variant="success" id="sideBtn">
                Tìm kiếm việc làm
              </Button>
            </Link>
          </div>
          <div>
            <Link to="create">
              <Button className="m-3" variant="info" id="sideBtn">
                Tạo hồ sơ việc làm
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
