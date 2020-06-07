import React from "react";
import { RouteWithSubRoutes } from "../../AppRouter";
import { Switch, Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

export const Employer: React.FC<{ routes: any }> = ({ routes }) => {
  return (
    <div className="text-center">
      <div>
        <Button
          className="m-2 mt-4"
          variant="secondary"
          size="lg"
          style={{ minWidth: "27em" }}
        >
          NHÀ TUYỂN DỤNG
        </Button>
      </div>
      <Link to="find" className="btn btn-success m-3">
        Tìm kiếm ứng viên
      </Link>
      <Link to="create" className="btn btn-info m-3">
        Tạo hồ sơ tuyển dụng
      </Link>
      <Link to="/list/employee" className="btn btn-success m-3">
        Tất cả ứng viên
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
