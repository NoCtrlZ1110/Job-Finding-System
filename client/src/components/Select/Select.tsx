import React from "react";
import searchIcon from "../../img/search.png";
import workIcon from "../../img/work.png";
import { Link } from "react-router-dom";

export const Select: React.FC<any> = ({ routes }) => {
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-12  white-text text-center mx-4">
            <br />
            <br />
            <h1 className="font-weight-bold ">
              Bạn là ai?
              <br />
            </h1>
            <br />
            <br />
            <div className="row">
              <div className="col-md-2"></div>
              <div className="col ">
                <div className="card select col-md-4">
                  <div className="card-body">
                    <img
                      className="mr-2"
                      src={workIcon}
                      alt="Nhà Tuyển Dụng"
                    ></img>
                  </div>
                  <Link className="btn btn-success m-3 btn-lg" to="/employer/">
                    <strong>Nhà Tuyển Dụng</strong>
                  </Link>
                </div>
              </div>
              <div className="col">
                <div className="card select col-md-4">
                  <div className="card-body">
                    <img className="mr-2" src={searchIcon} alt="Ứng Viên"></img>
                  </div>
                  <Link className="btn btn-success m-3 btn-lg" to="/employee/">
                    <strong> Người Tìm Việc</strong>
                  </Link>
                </div>
              </div>
            </div>
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
