import React from "react";
import "./Select.css";
import searchIcon from "../../img/search.png";
import workIcon from "../../img/work.png";

export class Select extends React.Component {
  render() {
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-md-12  white-text text-center mx-4">
              <br />
              <br />
              <h1 className="font-weight-bold mb-0 pt-md-5 pt-5 mt-5 my-4">
                Bạn là ai?
                <br />
              </h1>
              <br />
              <br />
              <div className="row">
                <div className="col-md-2"></div>
                <div className="card col-md-4">
                  <div className="card-body">
                    <img className="mr-2" src={searchIcon} alt="Ứng Viên"></img>
                  </div>
                  <a className="btn btn-success m-3 btn-lg" href="employee">
                    <strong> Người Tìm Việc</strong>
                  </a>
                </div>
                <div className="card col-md-4 ml-3">
                  <div className="card-body">
                    <img
                      className="mr-2"
                      src={workIcon}
                      alt="Nhà Tuyển Dụng"
                    ></img>
                  </div>
                  <a className="btn btn-success m-3 btn-lg" href="employer">
                    <strong>Nhà Tuyển Dụng</strong>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
