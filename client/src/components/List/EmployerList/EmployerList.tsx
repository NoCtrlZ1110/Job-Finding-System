import React from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import BootstrapTable from "react-bootstrap-table-next";
import HTTP from "../../../services/request";
import paginationFactory from "react-bootstrap-table2-paginator";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

export const EmployerList: React.FC = () => {
  const getEmployer = () => {
    return JSON.parse(HTTP.httpGet(HTTP.SERVER + "employer/list"));
  };

  const options = {
    // pageStartIndex: 0,
    sizePerPage: 3,
    hideSizePerPage: true,
    hidePageListOnlyOnePage: true,
  };

  const columns = [
    {
      dataField: "employer_id",
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
      dataField: "address",
      text: "Địa chỉ",
    },
    {
      dataField: "job",
      text: "Ngành",
    },
    {
      dataField: "job_detail",
      text: "Cụ thể",
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
      dataField: "request",
      text: "Yêu cầu",
    },
    {
      dataField: "contact",
      text: "Liên hệ",
    },
    {
      dataField: "comment",
      text: "Ghi chú",
    },
    {
      dataField: "employer_id",
      text: "Action",
      formatter: (cellContent: any, row: any) => {
        let link = `/employer/info/${cellContent}`;
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
              <Col style={{ textAlign: "right" }}>
                <Link to="employee" className="btn btn-info mx-2 mt-2">
                  Người tìm việc
                </Link>
                <Button disabled className="btn btn-info mx-2 mt-2">
                  Nhà tuyển dụng
                </Button>
              </Col>
            </Row>
          </h5>
        </Card.Header>
        <Card.Body>
          <BootstrapTable
            keyField="id"
            data={getEmployer()}
            columns={columns}
            pagination={paginationFactory(options)}
          />
        </Card.Body>
      </Card>
    </>
  );
};
