import React from "react";

import Card from "react-bootstrap/Card";
import BootstrapTable from "react-bootstrap-table-next";
import Button from "react-bootstrap/Button";
import HTTP from "../../../services/request";

export const EmployeeList: React.FC = () => {
  const getEmployee = () => {
    return JSON.parse(HTTP.httpGet("/employee/list"));
  };

  const columns = [
    {
      dataField: "employee_id",
      text: "ID",
    },
    {
      dataField: "name",
      text: "Name",
    },
    {
      dataField: "sex",
      text: "Sex",
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
      dataField: "address",
      text: "Địa chỉ",
    },
    {
      dataField: "job",
      text: "Ngành",
    },
    {
      dataField: "time",
      text: "Thời gian",
    },
    {
      dataField: "salary",
      text: "Lương mong muốn",
    },
    {
      dataField: "talent",
      text: "Điểm mạnh",
    },
    {
      dataField: "comment",
      text: "Ghi chú",
    },
    {
      dataField: "Button",
      text: "Action",
      formatter: (cellContent: any, row: any) => {
        return <Button variant="success">Chi tiết</Button>;
      },
    },
  ];

  return (
    <>
      <Card className="listE" style={{ color: "#2665b8" }}>
        <Card.Header>
          <strong>
            <h5>
              <b>EmployeeList</b>
            </h5>
          </strong>
        </Card.Header>
        <Card.Body>
          <BootstrapTable
            keyField="id"
            data={getEmployee()}
            columns={columns}
          />
        </Card.Body>
      </Card>
    </>
  );
};
