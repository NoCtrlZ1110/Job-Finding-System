import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import BootstrapTable from "react-bootstrap-table-next";
import HTTP from "../../../services/request";
import paginationFactory from "react-bootstrap-table2-paginator";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";

export const EmployeeList: React.FC = () => {
  const [list, setList] = useState([]);
  const getEmployee = () => {
    axios
      .get(HTTP.SERVER + "employer/list_candidate", { withCredentials: true })
      .then((response) => response.data)
      .then((data) => {
        setList(data);
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
      dataField: "employeeId",
      text: "ID",
    },
    {
      dataField: "name",
      text: "Name",
    },

    {
      dataField: "age",
      text: "Age",
    },
    {
      dataField: "area",
      text: "Khu Vực",
    },

    {
      dataField: "job",
      text: "Ngành",
    },

    {
      dataField: "jobDetail",
      text: "Mô tả",
    },
    {
      dataField: "salary",
      text: "Lương mong muốn",
    },

    {
      dataField: "employeeId",
      text: "Action",
      formatter: (cellContent: any, row: any) => {
        let link = `/employer/employeeInfo/${cellContent}`;
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
        <Card.Header>
          <h5>
            <Row>
              <Col>
                <div className="mt-3">
                  <b>THỐNG KÊ NGƯỜI TÌM VIỆC HIỆN CÓ</b>
                </div>
              </Col>
            </Row>
          </h5>
        </Card.Header>
        <Card.Body>
          <BootstrapTable
            keyField="id"
            data={list}
            columns={columns}
            pagination={paginationFactory(options)}
          />
        </Card.Body>
      </Card>
    </>
  );
};
