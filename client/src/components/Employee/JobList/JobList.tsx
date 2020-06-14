import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import BootstrapTable from "react-bootstrap-table-next";
import HTTP from "../../../services/request";
import paginationFactory from "react-bootstrap-table2-paginator";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";

export const JobList: React.FC = () => {
  const [list, setList] = useState([]);

  const getEmployer = () => {
    axios
      .get(HTTP.SERVER + "employee/list_job", { withCredentials: true })
      .then((response) => response.data)
      .then((data) => {
        setList(data);
      });
  };
  useEffect(() => getEmployer(), []);

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
      dataField: "name",
      text: "Name",
    },
    {
      dataField: "area",
      text: "Khu Vực",
    },
    {
      dataField: "nameJob",
      text: "Tên công việc",
    },
    {
      dataField: "job",
      text: "Ngành",
    },
    {
      dataField: "jobDetail",
      text: "Cụ thể",
    },
    {
      dataField: "time",
      text: "Thời gian",
    },
    {
      dataField: "salary",
      text: "Lương",
    },
    {
      dataField: "count",
      text: "Số lượng",
    },

    {
      dataField: "employerJobId",
      text: "Action",
      formatter: (cellContent: any, row: any) => {
        let link = `/employee/job/${cellContent}`;
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
                <div className="mt-3">THỐNG KÊ TẤT CẢ NHÀ TUYỂN DỤNG</div>
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
