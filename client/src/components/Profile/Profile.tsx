import React from "react";
import Button from "react-bootstrap/Button";
import HTTP from "../../services/request";
import history from "../../services/history";
import axios from "axios";

export const Profile: React.FC<{ routes: any }> = ({ routes }) => {
  axios
    .get(HTTP.SERVER + "status", { withCredentials: true })
    .then((response) => response.data)
    .then((message) => {
      if (message === "LOGGED") {
      } else {
        history.push("/login");
      }
    });
  return (
    <div className="text-center">
      <div>
        <Button
          className="mx-2 mt-4  "
          variant="secondary"
          size="lg"
          style={{ minWidth: "28em" }}
        >
          <b>PROFILE INFORMATION</b>
        </Button>
      </div>
    </div>
  );
};
