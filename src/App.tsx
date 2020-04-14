import React from "react";
import "./App.css";
import { AppRouter } from "./AppRouter";
import Background from "./img/back.jpg";
import { Navigator } from "./components/Navigator/Navigator";

function App() {
  return (
    // <section style={sectionStyle}>
    <div
      className="view"
      style={{
        backgroundImage: "url(" + Background + ") ",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center center",
        minHeight: "947px",
      }}
    >
      <Navigator />
      <AppRouter />
    </div>
  );
}

export default App;
