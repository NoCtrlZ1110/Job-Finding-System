import React from "react";
import { RouteWithSubRoutes } from "../../AppRouter";
import { Switch, Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export const List: React.FC<{ routes: any }> = ({ routes }) => {
  return (
    <div>
      <div className="container ">
        <div className="row">
          <div className="col-md-12 mb-4 white-text text-center">
            <h1 className="font-weight-bold">
              <strong>THỐNG KÊ</strong>
            </h1>
            <h3 className="text-uppercase m-3 blockqoute ">
              <strong>Thống kê nhà tuyển dụng và người tìm việc hiện có</strong>
            </h3>
            <br />
            <Link to="employee" className="btn btn-success m-3">
              Người tìm việc
            </Link>
            <Link to="employer" className="btn btn-info m-3">
              Nhà tuyển dụng
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
        </div>
      </div>
    </div>
  );
};
