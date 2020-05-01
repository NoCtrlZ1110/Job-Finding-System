import React from "react";
export class Home extends React.Component {
  render() {
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-md-12 mb-4 white-text text-center">
              <h1 className="font-weight-bold mb-0 pt-md-5 pt-5 mt-5">
                <strong>FINDING JOB SYSTEM</strong>
              </h1>
              <h3 className="text-uppercase m-3 blockqoute ">
                <strong>Hệ Thống Tìm Việc Trực Tuyến</strong>
              </h3>
              <br />
              <h2>
                <a href="/select/" className="btn btn-lg btn-success mt-5">
                  <strong>Bắt Đầu</strong>
                </a>
              </h2>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
