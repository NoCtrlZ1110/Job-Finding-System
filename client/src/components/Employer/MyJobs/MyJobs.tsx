import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import BootstrapTable from "react-bootstrap-table-next";
import HTTP from "../../../services/request";
import paginationFactory from "react-bootstrap-table2-paginator";
import axios from "axios";
import { Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

export const MyJobs: React.FC = () => {
  const [list, setList] = useState([]);
  const [loaded, setLoad] = useState(false);

  const getEmployee = () => {
    axios
      .get(HTTP.SERVER + "employer/job", { withCredentials: true })
      .then((response) => response.data)
      .then((data) => {
        setList(data);
        setLoad(true);
      });
  };
  useEffect(() => getEmployee(), []);

  const options = {
    // pageStartIndex: 0,
    sizePerPage: 3,
    hideSizePerPage: true,
    hidePageListOnlyOnePage: true,
  };

  const columns = [
    {
      dataField: "employerJobId",
      text: "ID",
    },
    {
      dataField: "namejob",
      text: "Name",
    },

    {
      dataField: "employerJobId",
      text: "Action",
      formatter: (cellContent: any, row: any) => {
        let link = `/employer/myJobs/${cellContent}`;
        return (
          <a className="btn btn-success" href={link}>
            Chi tiết
          </a>
        );
      },
    },
  ];

  return (
    <>
      <Card className="list" style={{ color: "#2665b8" }}>
        <Card.Header className="text-left">
          <h5>
            <div className="d-flex bd-highlight">
              <div className="p-2 flex-grow-1 bd-highlight">
                <b>VIỆC LÀM CỦA BẠN ĐÃ TẠO</b>
              </div>

              <Button
                href="/employer/create"
                className="mr-3 p-2 bd-highlight btn-success"
              >
                <FontAwesomeIcon className="mr-2" icon={faPlusCircle} />
                Tạo việc làm
              </Button>
            </div>
          </h5>
        </Card.Header>
        <Card.Body>
          {list.length > 0 ? (
            <BootstrapTable
              keyField="id"
              data={list}
              columns={columns}
              pagination={paginationFactory(options)}
            />
          ) : loaded ? (
            <span>
              <h3>Bạn chưa tạo việc làm nào!</h3>
              <br />
            </span>
          ) : (
            ""
          )}
        </Card.Body>
      </Card>
    </>
  );
};
