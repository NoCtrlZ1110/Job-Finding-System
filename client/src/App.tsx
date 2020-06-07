import React from "react";
import "./App.css";
import { AppRouter } from "./AppRouter";
import Background from "./img/back.jpg";
import { NavigationBar } from "./components/NavigationBar/NavigationBar";
import DemoNavbar from "./components/Navbars/DemoNavbar";
import SimpleFooter from "./components/Footers/SimpleFooter";
import CardsFooter from "./components/Footers/CardsFooter";

function App() {
  return (
    // <section style={sectionStyle}>

    <div
      className="view"
      // style={{
      //   backgroundImage: "url(" + Background + ") ",
      //   backgroundRepeat: "no-repeat",
      //   backgroundSize: "cover",
      //   backgroundPosition: "center center",
      //   width: "100%",
      //   minHeight: window.innerHeight,

      //   backgroundAttachment: "fixed",
      // }}
    >
      <DemoNavbar />

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
        {/* SVG separator */}
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
        <AppRouter />
      </div>
      {/* <SimpleFooter /> */}
      <CardsFooter />
    </div>
  );
}

export default App;
