import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Card, CardImg, Container, Row, Col } from "reactstrap";
import { AuthContext } from "../../services/store";

export const Select: React.FC<any> = ({ routes }) => {
  const { /* User, */ IsLogged, Role }: any = useContext(AuthContext);
  // const [user] = User;
  const [role] = Role;
  const [isLogged] = IsLogged;
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col  text-center mx-4 mt-5">
            <h1
              className="font-weight-bold"
              style={{
                color: "#ffffff",
                fontSize: 40,
                fontFamily: "Bungee",
              }}
            >
              {isLogged === "LOGGED" ? "BẠN LÀ" : "WHO ARE YOU?"}
              <br />
              <br />
            </h1>
            <br />
            <Container className="container-lg">
              {role ? (
                role === "employer" ? (
                  <Row>
                    <Col md={3} />
                    <Col className="mb-5 mb-md-0">
                      <Card className="card-lift--hover shadow border-0">
                        <Link to="/employer/profileInfo">
                          <CardImg
                            alt="..."
                            src={require("../../img/employer.png")}
                          />
                        </Link>
                      </Card>
                    </Col>
                    <Col md={3} />
                  </Row>
                ) : (
                  <Row>
                    <Col md={3} />
                    <Col className="mb-5 mb-lg-0 ">
                      <Card className="card-lift--hover shadow border-0">
                        <Link to="/employee/profileInfo">
                          <CardImg
                            alt="..."
                            src={require("../../img/employee.png")}
                          />
                        </Link>
                      </Card>
                    </Col>
                    <Col md={3} />
                  </Row>
                )
              ) : (
                <Row>
                  <Col className="mb-5 mb-md-0" md="5">
                    <Card className="card-lift--hover shadow border-0">
                      <Link to="/employer/">
                        <CardImg
                          alt="..."
                          src={require("../../img/employer.png")}
                        />
                      </Link>
                    </Card>
                  </Col>
                  <Col />
                  <Col className="mb-5 mb-lg-0 " md="5">
                    <Card className="card-lift--hover shadow border-0">
                      <Link to="/employee/">
                        <CardImg
                          alt="..."
                          src={require("../../img/employee.png")}
                        />
                      </Link>
                    </Card>
                  </Col>
                </Row>
              )}

              {/* <Col md={2} /> */}
            </Container>
          </div>
        </div>
      </div>
    </div>
  );
};
