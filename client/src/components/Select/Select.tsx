import React from "react";
import { Link } from "react-router-dom";
import { Card, CardImg, Container, Row, Col } from "reactstrap";

export const Select: React.FC<any> = ({ routes }) => {
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col  text-center mx-4 mt-5">
            <h1 className="font-weight-bold" style={{ color: "#ffffff" }}>
              Bạn là ai?
              <br />
            </h1>
            <br />
            <Container className="container-lg">
              <Row>
                <Col className="mb-5 mb-md-0" md="6">
                  <Card className="card-lift--hover shadow border-0">
                    <Link to="/employer/">
                      {/*  <div className="card-body">
                        <img
                          className="mr-2"
                          src={workIcon}
                          alt="Nhà Tuyển Dụng"
                        ></img>
                      </div>
                      <Link
                        className="btn btn-success m-3 btn-lg"
                        to="/employer/"
                      >
                        Nhà Tuyển Dụng
                      </Link> */}
                      <CardImg
                        alt="..."
                        src={require("../../img/employer.png")}
                      />
                    </Link>
                  </Card>
                </Col>
                <Col className="mb-5 mb-lg-0" md="6">
                  <Card className="card-lift--hover shadow border-0">
                    <Link to="/employee/">
                      {/* <div className="card-body">
                        <img
                          className="mr-2"
                          src={searchIcon}
                          alt="Ứng Viên"
                        ></img>
                      </div>
                      <Link
                        className="btn btn-success m-3 btn-lg"
                        to="/employee/"
                      >
                        Người Tìm Việc
                      </Link> */}
                      <CardImg
                        alt="..."
                        src={require("../../img/employee.png")}
                      />
                    </Link>
                  </Card>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      </div>
    </div>
  );
};

// import { RouteWithSubRoutes } from "../../AppRouter";
/* <Switch>
{routes.map((route: any, i: any) => (
  <RouteWithSubRoutes key={i} {...route} />
  ))}
  // Router Outlet!
  */
