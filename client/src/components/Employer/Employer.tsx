import React from "react";
import { RouteWithSubRoutes } from "../../AppRouter";
import { Switch, Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
export const Employer: React.FC<{ routes: any }> = ({ routes }) => {
  return (
    <div className="text-center">
      <h1>Bạn là nhà tuyển dụng!</h1>
      {/* <div className="btn-group" role="group"> */}
      <Link to="find" className="btn btn-success m-3">
        Tìm kiếm ứng viên
      </Link>
      <Link to="create" className="btn btn-info m-3">
        Tạo hồ sơ tuyển dụng
      </Link>
      <div className="my-5">
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
      </div>
    </div>
  );
};
