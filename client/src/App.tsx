import React from "react";
import "./App.css";
import { AppRouter } from "./AppRouter";
import Background from "./img/back.jpg";
import { NavigationBar } from "./components/NavigationBar/NavigationBar";

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
        width: "100%",
        minHeight: window.innerHeight,

        backgroundAttachment: "fixed",
      }}
    >
      <NavigationBar />
      <AppRouter />
    </div>
  );
}

export default App;
