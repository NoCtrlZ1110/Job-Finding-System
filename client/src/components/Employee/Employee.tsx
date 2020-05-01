import React from "react";
import { RouteWithSubRoutes } from "../../AppRouter";
import { Switch, Link } from "react-router-dom";

export const Employee: React.FC<{ routes: any }> = ({ routes }) => {
  return (
    <div className="text-center">
      <h1>Bạn là người tìm việc!</h1>
      {/* <div className="btn-group" role="group"> */}
      <Link to="find" className="btn btn-success m-3">
        Tìm kiếm việc làm
      </Link>
      <Link to="create" className="btn btn-info m-3">
        Tạo hồ sơ việc làm
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
