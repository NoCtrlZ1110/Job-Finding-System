import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import BootstrapTable from "react-bootstrap-table-next";
import HTTP from "../../../services/request";
import paginationFactory from "react-bootstrap-table2-paginator";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import { Button } from "reactstrap";
import { toast } from "react-toastify";

export const Invitation: React.FC = () => {
  const [list, setList] = useState([]);
  const [loaded, setLoad] = useState(false);

  const getData = () => {
    axios
      .get(HTTP.SERVER + "employee/apply_list", { withCredentials: true })
      .then((response) => response.data)
      .then((data) => {
        setList(data);
        setLoad(true);
      });
  };
  useEffect(() => getData(), []);

  let handleAccept = (id: number) => {
    axios
      .post(
        HTTP.SERVER + `employee/find/${id}/submit_apply`,
        {},
        {
          withCredentials: true,
        }
      )
      .then((response) => response.data)
      .then((data) => {
        if (data === "done") {
          toast("😜 Nhận việc thành công!");
          setInterval(() => window.location.reload(), 1500);
        } else toast("😣 Nhận việc thất bại!");
      });
  };

  let handleIgnore = (id: number) => {
    axios
      .post(
        HTTP.SERVER + `employee/find/${id}/ignore`,
        {},
        {
          withCredentials: true,
        }
      )
      .then((response) => response.data)
      .then((data) => {
        if (data === "done") toast("😥 Từ chối việc làm thành công!");
        setInterval(() => window.location.reload(), 1500);
      });
  };

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
      text: "Tên công ty/tổ chức",
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
      text: "",
      formatter: (cellContent: any, row: any) => {
        let link = `/employee/job/${cellContent}`;
        return (
          <div>
            <div>
              <Button
                className="btn-sm btn-success"
                href={link}
                style={{ minWidth: 130 }}
              >
                Chi tiết
              </Button>
            </div>
            <div>
              <Button
                className="btn-sm btn-success mt-1"
                onClick={() => handleAccept(cellContent)}
                style={{ minWidth: 130 }}
              >
                Nhận Việc
              </Button>
            </div>
            <div>
              <Button
                className="btn-sm btn-success mt-1"
                onClick={() => handleIgnore(cellContent)}
                style={{ minWidth: 130 }}
              >
                Từ Chối
              </Button>
            </div>
          </div>
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
                  <b>Lời mời làm việc</b>
                </div>
              </Col>
            </Row>
          </h5>
        </Card.Header>
        <Card.Body>
          {list.length > 0 ? (
            <BootstrapTable
              keyField="employerJobId"
              data={list}
              columns={columns}
              pagination={paginationFactory(options)}
            />
          ) : loaded ? (
            <h3>Bạn không có lời mời nào!</h3>
          ) : (
            ""
          )}
        </Card.Body>
      </Card>
    </>
  );
};
