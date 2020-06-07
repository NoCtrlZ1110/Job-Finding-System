import React from "react";
export class Home extends React.Component {
  render() {
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-md-12 mb-4 white-text text-center">
              <h1 className="display-3 text-white" style={{ color: "#ffffff" }}>
                FINDING JOB SYSTEM
              </h1>
              <h3
                className="lead text-uppercase m-3 blockqoute "
                style={{ color: "#ffffff" }}
              >
                Hệ Thống Tìm Việc Trực Tuyến
              </h3>
              <br />
              <h2>
                <a href="/select/" className="btn btn-lg btn-success mt-5">
                  <>Bắt Đầu</>
                </a>
              </h2>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
