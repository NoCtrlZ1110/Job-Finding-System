import React from "react";
import { RouteWithSubRoutes } from "../../AppRouter";
import { Switch, Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

export const Employee: React.FC<{ routes: any }> = ({ routes }) => {
  return (
    <div className="text-center">
      <div>
        <Button
          className="mx-2 mt-4  "
          variant="secondary"
          size="lg"
          style={{ minWidth: "28em" }}
        >
          <b>NGƯỜI TÌM VIỆC</b>
        </Button>
      </div>
      <Link to="find" className="btn btn-success m-3">
        Tìm kiếm việc làm
      </Link>
      <Link to="create" className="btn btn-info m-3">
        Tạo hồ sơ việc làm
      </Link>
      <Link to="/list/employer" className="btn btn-success m-3">
        Tất cả nhà tuyển dụng
      </Link>
      <div className="my-5">
        <Switch>
          {routes.map((route: any, i: any) => (
            <RouteWithSubRoutes key={i} {...route} />
          ))}
        </Switch>
      </div>
    </div>
  );
};
