// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from "react";
const request = import("request");
var http = {
  // SERVER: "http://localhost:8080/",
  SERVER: "/",
  httpGet: (theUrl: string): any => {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", theUrl, false); // false for synchronous request
    xmlHttp.send(null);
    return xmlHttp.responseText;
  },

  httpPost: async (address: string, obj: any) => {
    (await request).post(
      address,
      {
        json: obj,
      },
      (error: any, res: any, body: any) => {
        if (error) {
          console.error(error);
          return;
        }
        // this.getData();
        alert(`statusCode: ${res.statusCode} -> ` + body.message);
        // console.log(body)
        return body.code;
      }
    );
  },
};

export default http;
