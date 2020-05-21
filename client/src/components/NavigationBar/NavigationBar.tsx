import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export class NavigationBar extends React.Component {
  render() {
    return (
      <>
        <Navbar className="shadow p-3 mb-5 bg-blue rounded" expand="lg">
          <Navbar.Brand href="/">
            <span>
              <b>
                Job Finding <FontAwesomeIcon icon={faSearch} />
              </b>
            </span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Button className="mx-2 btn-md btn-info" href="/employer/">
                <b>Tuyển Dụng </b>
              </Button>
              <Button className="mx-2 btn-md btn-info" href="/employee/">
                <b>Tìm Việc </b>
              </Button>
            </Nav>
            <b>
              <NavDropdown title="Thống Kê" id="dropdown">
                <NavDropdown.Item href="/list/employee">
                  Ứng viên
                </NavDropdown.Item>
                <NavDropdown.Item href="/list/employer">
                  Nhà tuyển dụng
                </NavDropdown.Item>
              </NavDropdown>
            </b>
            {/* <Form inline>
              <FormControl
                type="text"
                placeholder="Search"
                className="mr-sm-2 "
              />
              <Button href="/select" variant="outline-success">
                <FontAwesomeIcon icon={faSearch} />
              </Button>
            </Form> */}
            <Button className="mx-2 btn-md btn-info" href="/login/">
              <b>Đăng Nhập</b>
            </Button>
          </Navbar.Collapse>
        </Navbar>
      </>
    );
  }
}
