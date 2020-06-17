import React, { useEffect, useContext } from "react";
import Headroom from "headroom.js";
import { BrowserRouter } from "react-router-dom";
import logo from "../../img/logo_.png";
import axios from "axios";
import HTTP from "../../services/request";
import { AuthContext } from "../../services/store";
import { toast } from "react-toastify";
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

export const NavBar: React.FC<{}> = () => {
  const { User, IsLogged, Role }: any = useContext(AuthContext);
  const [user, setUser] = User;
  const [role, setRole] = Role;
  const [isLogged, setLogged] = IsLogged;

  useEffect(() => {
    let headroom = new Headroom(document.getElementById("navbar-main"));
    headroom.init();
    axios
      .get(HTTP.SERVER + "status", { withCredentials: true })
      .then((response) => response.data)
      .then((message) => setLogged(message));
    axios
      .get(HTTP.SERVER + "currentRole", { withCredentials: true })
      .then((response) => response.data)
      .then((message) => {
        if (message === "NOTLOGGED") setRole(null);
        else setRole(message);
        console.log(message);
      });
    axios
      .get(HTTP.SERVER + "currentAccount", { withCredentials: true })
      .then((response) => response.data)
      .then((profile) => {
        if (profile === "NOTLOGGED") setUser(null);
        else setUser(profile);
        console.log(profile);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogged]);

  let handleLogout = () => {
    axios
      .get(HTTP.SERVER + "logout", { withCredentials: true })
      .then((response) => response.data)
      .then((message) => {
        if (message) {
          toast.success("😭 Đăng xuất thành công!", { autoClose: 1800 });
          setInterval(() => {
            window.location.href = "/";
          }, 2000);
        } else {
          toast.success("🙄 Đăng xuất thất bại!", { autoClose: 1800 });
        }
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
                  <img src={logo} alt="logo" id="logo"></img>
                </a>
              </NavbarBrand>
              <button className="navbar-toggler" id="navbar_global">
                <span className="navbar-toggler-icon" />
              </button>
              <UncontrolledTooltip delay={0} target="logo">
                Trang chủ
              </UncontrolledTooltip>
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
                      <span className="nav-link-inner--text">Chức năng</span>
                    </DropdownToggle>
                    <DropdownMenu className="dropdown-menu-xl">
                      <div className="dropdown-menu-inner">
                        <Media
                          className="d-flex align-items-center"
                          href={"/" + (role ? role : "employee") + "/list"}
                          // target="_blank"
                        >
                          <div className="icon icon-shape bg-gradient-primary rounded-circle text-white">
                            <i className="ni ni-spaceship" />
                          </div>
                          <Media body className="ml-3">
                            <h6 className="heading text-primary mb-md-1">
                              {role === "employer"
                                ? "Tất cả ứng viên"
                                : "Tất cả công việc"}
                            </h6>
                            <p className="description d-none d-md-inline-block mb-0">
                              {role === "employer"
                                ? "Tất cả người tìm việc hiện có"
                                : "Các công việc hiện đang sẵn có"}
                            </p>
                          </Media>
                        </Media>
                        <Media
                          className="d-flex align-items-center"
                          href={"/" + (role ? role : "employee") + "/findJob"}
                          // target="_blank"
                        >
                          <div className="icon icon-shape bg-gradient-success rounded-circle text-white">
                            <i className="ni ni-palette" />
                          </div>
                          <Media body className="ml-3">
                            <h6 className="heading text-primary mb-md-1">
                              {role === "employer"
                                ? "Tìm ứng viên"
                                : "Tìm việc"}
                            </h6>
                            <p className="description d-none d-md-inline-block mb-0">
                              {role === "employer"
                                ? "Tìm ứng viên theo yêu cầu"
                                : "Tìm công việc theo yêu cầu"}
                            </p>
                          </Media>
                        </Media>
                        <Media
                          className="d-flex align-items-center"
                          href={"/" + (role ? role : "employee") + "/list"}
                          // target="_blank"
                        >
                          <div className="icon icon-shape bg-gradient-warning rounded-circle text-white">
                            <i className="ni ni-ui-04" />
                          </div>
                          <Media body className="ml-3">
                            <h5 className="heading text-warning mb-md-1">
                              {role === "employer"
                                ? "Ứng viên phù hợp"
                                : "Công việc phù hợp"}
                            </h5>
                            <p className="description d-none d-md-inline-block mb-0">
                              Lọc theo hồ sơ của bạn đưa ra kết quả phù hợp nhất
                            </p>
                          </Media>
                        </Media>
                      </div>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                  <UncontrolledDropdown nav>
                    <DropdownToggle nav>
                      <i className="ni ni-collection d-lg-none mr-1" />
                      <span className="nav-link-inner--text">Thông tin</span>
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem href="/profile">Trang cá nhân</DropdownItem>
                      <DropdownItem
                        href="https://github.com/NoCtrlZ1110/Job-Finding-System"
                        target="_blank"
                      >
                        Mã nguồn
                      </DropdownItem>
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
                      <i className="fa fa-github mr-2" />
                      {user ? <span>{user.name}</span> : ""}
                      <span className="nav-link-inner--text d-lg-none ml-2"></span>
                    </NavLink>
                    <UncontrolledTooltip delay={0} target="tooltip112445449">
                      Profile
                    </UncontrolledTooltip>
                  </NavItem>
                  <NavItem className="d-none d-lg-block ml-lg-4">
                    {isLogged === "LOGGED" ? (
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
                    ) : (
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
