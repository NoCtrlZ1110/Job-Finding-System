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
      <Navbar expand="lg">
        <Navbar.Brand href="/">
          <strong style={{ color: "brown" }}>
            Job Finding <FontAwesomeIcon icon={faSearch} />
          </strong>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link className="mr-2" href="/">
              <b>Trang Chủ </b>
            </Nav.Link>

            <Nav.Link className="mr-2" href="/employee/">
              <b>Tìm Việc </b>
            </Nav.Link>
            <Nav.Link className="mr-2" href="/employer/">
              <b>Tuyển Dụng </b>
            </Nav.Link>
            <b>
              <NavDropdown title="Thống Kê" id="dropdown">
                <NavDropdown.Item href="/list/employee">
                  Employees List
                </NavDropdown.Item>
                <NavDropdown.Item href="/list/employer">
                  Employers List
                </NavDropdown.Item>
              </NavDropdown>
            </b>
          </Nav>
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-success">
              <FontAwesomeIcon icon={faSearch} />
            </Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
