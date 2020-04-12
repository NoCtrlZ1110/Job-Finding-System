import React from "react";
import { Redirect } from "react-router-dom";

export class NotFound extends React.Component {
  render() {
    return <Redirect to="/home" />;
  }
}
