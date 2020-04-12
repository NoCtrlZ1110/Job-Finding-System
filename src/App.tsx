import React from "react";
import "./App.css";
import { AppRouter } from "./AppRouter";
import Background from "./img/back.jpg";

// var sectionStyle = {
//   width: "100%",
//   // height: "600px",
//   height: "59.2em",
//   minHeight: "100%",
//   backgroundImage: "url(" + Background + ") ",
//   backgroundPosition: "center",
//   backgroundSize: "cover",
//   backgroundRepeat: "no-repeat",
// };

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
      <AppRouter />
    </div>
  );
}

export default App;
