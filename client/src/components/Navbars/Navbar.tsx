import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import Headroom from "headroom.js";
import { BrowserRouter } from "react-router-dom";
import logo from "../../img/logo_.png";
import axios from "axios";
import HTTP from "../../services/request";

// reactstrap components
import {
  Button,
  UncontrolledCollapse,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
  Media,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
} from "reactstrap";
import { AuthContext } from "../../services/store";

export const NavBar: React.FC<{}> = () => {
  const { User, IsLogged }: any = useContext(AuthContext);
  const [user, setUser] = User;
  const [isLogged, setLogged] = IsLogged;

  useEffect(() => {
    let headroom = new Headroom(document.getElementById("navbar-main"));
    headroom.init();
    axios
      .get(HTTP.SERVER + "status", { withCredentials: true })
      .then((response) => response.data)
      .then((message) => {
        setLogged(message);
      });
  });

  let handleLogout = () => {
    axios
      .get(HTTP.SERVER + "employee/logout", { withCredentials: true })
      .then((response) => response.data)
      .then((message) => {
        alert(message);
        window.location.href = "/";
      });
  };

  return (
    <>
      {/* //DebugMode
      {JSON.stringify(user)}
      {JSON.stringify(isLogged)} */}
      <BrowserRouter>
        <header className="header-global">
          <Navbar
            className="navbar-main navbar-transparent navbar-light headroom"
            expand="lg"
            id="navbar-main"
          >
            <Container>
              <NavbarBrand className="mr-lg-5">
                <a href="/">
                  <img src={logo} alt="logo"></img>
                </a>
              </NavbarBrand>
              <button className="navbar-toggler" id="navbar_global">
                <span className="navbar-toggler-icon" />
              </button>
              <UncontrolledCollapse
                toggler="#navbar_global"
                navbar
                /*    className={this.state.collapseClasses}
                onExiting={this.onExiting}
                onExited={this.onExited} */
              >
                <div className="navbar-collapse-header">
                  <Row>
                    <Col className="collapse-brand" xs="6">
                      <a href="/">
                        <img src={logo} alt="logo"></img>
                      </a>
                    </Col>
                    <Col className="collapse-close" xs="6">
                      <button className="navbar-toggler" id="navbar_global">
                        <span />
                        <span />
                      </button>
                    </Col>
                  </Row>
                </div>
                <Nav className="navbar-nav-hover align-items-lg-center" navbar>
                  <UncontrolledDropdown nav>
                    <DropdownToggle nav>
                      <i className="ni ni-ui-04 d-lg-none mr-1" />
                      <span className="nav-link-inner--text">Components</span>
                    </DropdownToggle>
                    <DropdownMenu className="dropdown-menu-xl">
                      <div className="dropdown-menu-inner">
                        <Media
                          className="d-flex align-items-center"
                          href="https://github.com/NoCtrlZ1110/Job-Finding-System"
                          target="_blank"
                        >
                          <div className="icon icon-shape bg-gradient-primary rounded-circle text-white">
                            <i className="ni ni-spaceship" />
                          </div>
                          <Media body className="ml-3">
                            <h6 className="heading text-primary mb-md-1">
                              Getting started
                            </h6>
                            <p className="description d-none d-md-inline-block mb-0">
                              Learn how to use Argon compiling Scss, change
                              brand colors and more.
                            </p>
                          </Media>
                        </Media>
                        <Media
                          className="d-flex align-items-center"
                          href="https://github.com/NoCtrlZ1110/Job-Finding-System"
                          target="_blank"
                        >
                          <div className="icon icon-shape bg-gradient-success rounded-circle text-white">
                            <i className="ni ni-palette" />
                          </div>
                          <Media body className="ml-3">
                            <h6 className="heading text-primary mb-md-1">
                              Foundation
                            </h6>
                            <p className="description d-none d-md-inline-block mb-0">
                              Learn more about colors, typography, icons and the
                              grid system we used for Argon.
                            </p>
                          </Media>
                        </Media>
                        <Media
                          className="d-flex align-items-center"
                          href="https://github.com/NoCtrlZ1110/Job-Finding-System"
                          target="_blank"
                        >
                          <div className="icon icon-shape bg-gradient-warning rounded-circle text-white">
                            <i className="ni ni-ui-04" />
                          </div>
                          <Media body className="ml-3">
                            <h5 className="heading text-warning mb-md-1">
                              Components
                            </h5>
                            <p className="description d-none d-md-inline-block mb-0">
                              Browse our 50 beautiful handcrafted components
                              offered in the Free version.
                            </p>
                          </Media>
                        </Media>
                      </div>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                  <UncontrolledDropdown nav>
                    <DropdownToggle nav>
                      <i className="ni ni-collection d-lg-none mr-1" />
                      <span className="nav-link-inner--text">Examples</span>
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem href="/profile">Profile</DropdownItem>
                      <DropdownItem href="/login">Login</DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </Nav>
                <Nav className="align-items-lg-center ml-lg-auto" navbar>
                  <NavItem>
                    <NavLink
                      className="nav-link-icon"
                      href="/profile"
                      id="tooltip112445449"
                    >
                      <i className="fa fa-github" />
                      <span className="nav-link-inner--text d-lg-none ml-2">
                        Github
                      </span>
                    </NavLink>
                    <UncontrolledTooltip delay={0} target="tooltip112445449">
                      Profile
                    </UncontrolledTooltip>
                  </NavItem>
                  <NavItem className="d-none d-lg-block ml-lg-4">
                    {isLogged === "NOTLOGGED" ? (
                      <Button
                        className="btn-neutral btn-icon"
                        color="default"
                        href="/login"
                      >
                        <span className="btn-inner--icon">
                          <i className="fa fa-sign-in mr-2" />
                        </span>
                        <span className="nav-link-inner--text ml-1">Login</span>
                      </Button>
                    ) : (
                      <Button
                        className="btn-neutral btn-icon"
                        color="default"
                        onClick={handleLogout}
                      >
                        <span className="btn-inner--icon">
                          <i className="fa fa-sign-in mr-2" />
                        </span>
                        <span className="nav-link-inner--text ml-1">
                          Logout
                        </span>
                      </Button>
                    )}
                  </NavItem>
                </Nav>
              </UncontrolledCollapse>
            </Container>
          </Navbar>
        </header>
      </BrowserRouter>
    </>
  );
};
// }

export default NavBar;
