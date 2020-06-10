import React from "react";
import "./App.css";
import { AppRouter } from "./AppRouter";
import Navbar from "./components/Navbars/Navbar";
import SimpleFooter from "./components/Footers/SimpleFooter";

function App() {
  return (
    <>
      <Navbar />
      <link
        href="https://fonts.googleapis.com/css2?family=Bungee&family=Pacifico&display=swap"
        rel="stylesheet"
      />
      <section
        className="section-profile-cover section-shaped my-0"
        style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
      >
        {/* Circles background */}
        <div className="shape shape-style-1 shape-default alpha-4">
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>
        <div className="separator separator-bottom separator-skew">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x="0"
            y="0"
          >
            <polygon className="fill-white" points="2560 0 2560 100 0 100" />
          </svg>
        </div>
      </section>
      <div id="divContent">
        <br />
        <br />
        <br />
        <br />
        <AppRouter />
      </div>
      <SimpleFooter />
    </>
  );
}

export default App;
