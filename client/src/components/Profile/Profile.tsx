/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext } from "react";
import { AuthContext } from "../../services/store";
import { Button, Card, Container, Row, Col } from "reactstrap";
import HTTP from "../../services/request";
import axios from "axios";
import history from "../../services/history";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Profile: React.FC = () => {
  const { User, IsLogged }: any = useContext(AuthContext);
  const [user, setUser] = User;
  const [isLogged, setLogged] = IsLogged;
  /*  axios
    .get(HTTP.SERVER + "status", { withCredentials: true })
    .then((response) => response.data)
    .then((message) => {
      if (message === "LOGGED") {
      } else {
        history.push("/login");
      }
    }); */
  return (
    <>
      <main className="profile-page">
        <section className="section-profile-cover section-shaped my-0" />
        <section className="section mt--200">
          <Container>
            <Card className="card-profile shadow mt--300">
              <div className="px-4">
                <Row className="justify-content-center">
                  <Col className="order-lg-2" lg="3">
                    <div className="card-profile-image">
                      <img
                        alt="..."
                        className="rounded-circle"
                        src={require("../../assets/img/theme/profile.jpg")}
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
                        href="#pablo"
                        onClick={(e: any) => e.preventDefault()}
                        size="sm"
                      >
                        Connect
                      </Button>
                      <Button
                        className="float-right"
                        color="default"
                        href="#pablo"
                        onClick={(e: any) => e.preventDefault()}
                        size="sm"
                      >
                        Message
                      </Button>
                    </div>
                  </Col>
                  <Col className="order-lg-1" lg="4">
                    <div className="card-profile-stats d-flex justify-content-center">
                      <div>
                        <span className="heading">22</span>
                        <span className="description">Friends</span>
                      </div>
                      <div>
                        <span className="heading">10</span>
                        <span className="description">Photos</span>
                      </div>
                      <div>
                        <span className="heading">89</span>
                        <span className="description">Comments</span>
                      </div>
                    </div>
                  </Col>
                </Row>
                <div className="text-center mt-5">
                  <h3>
                    {user ? user.name : ""}
                    <span className="font-weight-light">
                      , {user ? user.age : ""}
                    </span>
                  </h3>
                  <div className="h6 font-weight-300">
                    <i className="ni location_pin mr-2" />
                    {user ? user.area : ""}
                  </div>
                  <div className="h6 mt-4">
                    <i className="ni business_briefcase-24 mr-2" />
                    {user ? user.address : ""}
                  </div>
                  <div>
                    <i className="ni education_hat mr-2" />
                    {user ? user.phone : ""}
                  </div>
                  <div>
                    <i className="ni education_hat mr-2" />
                    {user ? user.email : ""}
                  </div>
                </div>
                <div className="mt-5 py-5 border-top text-center">
                  <Row className="justify-content-center">
                    <Col lg="9">
                      <p>
                        An artist of considerable range, Ryan — the name taken
                        by Melbourne-raised, Brooklyn-based Nick Murphy —
                        writes, performs and records all of his own music,
                        giving it a warm, intimate feel with a solid groove
                        structure. An artist of considerable range.
                      </p>
                      <a href="#pablo" onClick={(e: any) => e.preventDefault()}>
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
    </>
  );
};

export default Profile;
