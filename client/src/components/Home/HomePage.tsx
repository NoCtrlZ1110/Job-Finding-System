import React, { useContext } from "react";
import { AuthContext } from "../../services/store";
export const Home = () => {
  const { user, setUser }: any = useContext(AuthContext);

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-12 mb-4 white-text text-center">
            <link
              href="https://fonts.googleapis.com/css2?family=Bungee&family=Pacifico&display=swap"
              rel="stylesheet"
            />
            <h1
              className="display-3 text-white mt-5"
              id="shadow"
              style={{
                color: "#ffffff",
                fontSize: 55,
                fontWeight: 500,
                fontFamily: "Bungee",
              }}
            >
              FINDING JOB SYSTEM {user}
            </h1>
            <h3
              className="lead m-3 blockqoute"
              id="shadow2"
              style={{
                color: "#ffffff",
                fontFamily: "Pacifico",
                fontSize: 35,
              }}
            >
              Hệ Thống Tìm Việc Trực Tuyến
            </h3>
            <br />
            <h2>
              <a href="/select/" className="btn btn-lg btn-success mt-5">
                <>Get Started!</>
              </a>
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};
