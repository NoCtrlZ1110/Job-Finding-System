import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import BootstrapTable from "react-bootstrap-table-next";
import HTTP from "../../../services/request";
import paginationFactory from "react-bootstrap-table2-paginator";
import axios from "axios";
import { Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";

export const MyJobs: React.FC = () => {
  const [list, setList] = useState([]);
  const [loaded, setLoad] = useState(false);
  const [show, setShow] = useState(false);
  const [data, setData] = useState();
  const [id, setId] = useState(null);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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

  const handleClick = (id: any) => {
    axios
      .get(HTTP.SERVER + "employer/job/" + id + "/submit_list", {
        withCredentials: true,
      })
      .then((response) => response.data)
      .then((data) => {
        if (data === "no submit") {
          toast.error("😥 Việc làm này không có ai ứng tuyển!");
        } else {
          setData(data);
          setId(id);
          handleShow();
        }
      });
  };
  let handleInvite = (id2: number) => {
    axios
      .post(
        HTTP.SERVER + `employer/job/${id}/find/${id2}/invite`,
        {},
        {
          withCredentials: true,
        }
      )
      .then((response) => response.data)
      .then((data) => {
        if (data === "ok") {
          toast.success("🤩 Mời việc thành công!");
          handleClose();
        } else toast.error("🥱 Mời việc thất bại");
      });
  };

  let handleIgnore = (id2: number) => {
    axios
      .post(
        HTTP.SERVER + `employer/job/${id}/find/${id2}/ignore`,
        {},
        {
          withCredentials: true,
        }
      )
      .then((response) => response.data)
      .then((data) => {
        if (data === "ok") {
          toast.success("😗 Từ chối thành công!");
          handleClose();
        } else toast.error("🥱 Từ chối thất bại");
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
      dataField: "namejob",
      text: "Name",
    },

    {
      dataField: "employerJobId",
      text: "Chi tiết",
      formatter: (cellContent: any, row: any) => {
        let link = `/employer/myJobs/${cellContent}`;
        return (
          <a className="btn btn-success" href={link}>
            Chi tiết
          </a>
        );
      },
    },
    {
      dataField: "employerJobId",
      text: "Danh sách ứng viên",
      formatter: (cellContent: any, row: any) => {
        return (
          <Button
            className="btn btn-success"
            // onClick={() => handleClick(cellContent)}
            onClick={() => handleClick(cellContent)}
          >
            Các ứng viên
          </Button>
        );
      },
    },
  ];
  const columns2 = [
    {
      dataField: "employeeId",
      text: "ID",
    },
    {
      dataField: "name",
      text: "Name",
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
      text: "Chi tiết",
      formatter: (cellContent: any, row: any) => {
        let link = `/employer/employeeInfo/${cellContent}`;
        return (
          <a className="btn btn-sm btn-success" href={link}>
            Chi tiết
          </a>
        );
      },
    },
    {
      dataField: "employeeId",
      text: "Tuyển dụng",
      formatter: (cellContent: any, row: any) => {
        return (
          <Button
            className="btn btn-success btn-sm"
            onClick={() => handleInvite(cellContent)}
          >
            Tuyển Dụng
          </Button>
        );
      },
    },
    {
      dataField: "employeeId",
      text: "Từ chối",
      formatter: (cellContent: any, row: any) => {
        return (
          <Button
            className="btn btn-success btn-sm"
            onClick={() => handleIgnore(cellContent)}
          >
            Từ chối
          </Button>
        );
      },
    },
  ];
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        centered
        size="lg"
        id="resultModal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Kết quả tìm kiếm</Modal.Title>
        </Modal.Header>
        <Modal.Body className=" text-center">
          <h2>Có {data ? data.length : "0"} ứng viên muốn xin việc !</h2>
          <br />
          <br />

          <BootstrapTable
            keyField="employerJobId"
            id="table"
            data={data}
            columns={columns2}
            pagination={paginationFactory(options)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
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
