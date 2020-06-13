import React, { useEffect } from "react";
import history from "./services/history";
import { Router, Switch, Route } from "react-router-dom";
import { Home } from "./components/Home/HomePage";
import { Select } from "./components/Select/Select";
import { NotFound } from "./components/NotFound/NotFound";
import { Employer } from "./components/Employer/Employer";
import { Employee } from "./components/Employee/Employee";
import { FindJob } from "./components/Employee/Find/FindJob";
import { CreateProfile } from "./components/Employee/CreateProfile/CreateProfile";
import { FindEmployee } from "./components/Employer/FindEmployee/FindEmployee";
import { CreateJob } from "./components/Employer/CreateJob/CreateJob";
import { EmployeeList } from "./components/Employer/EmployeeList/EmployeeList";
import { JobList } from "./components/Employee/JobList/JobList";
import { EmployeeInfo } from "./components/Employee/Info/EmployeeInfo";
import { EmployerInfo } from "./components/Employer/Info/EmployerInfo";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Profile from "./components/Profile/Profile";
import axios from "axios";
import HTTP from "./services/request";
import { toast } from "react-toastify";

const routes = [
  {
    path: "/",
    component: Home,
    exact: true,
  },
  {
    path: "/test",
    component: Profile,
    exact: true,
  },
  {
    path: "/login",
    component: Login,
    exact: true,
  },
  {
    path: "/register",
    component: Register,
    exact: true,
  },
  {
    path: "/select",
    component: Select,
    exact: true,
  },
  { path: "/profile", component: Profile, private: true },
  { path: "/employee/info/:id", component: EmployeeInfo },
  { path: "/employer/info/:id", component: EmployerInfo },
  {
    path: "/employee",
    component: Employee,
    private: true,
    role: "employee",
    routes: [
      { path: "/employee/list", role: "employer", component: JobList },
      {
        path: "/employee/find",
        component: FindJob,
        exact: true,
        role: "employee",
      },
      {
        path: "/employee/create",
        component: CreateProfile,
        exact: true,
        role: "employee",
      },
    ],
  },
  {
    path: "/employer",
    component: Employer,
    private: true,
    role: "employer",
    routes: [
      { path: "/employer/list", role: "employer", component: EmployeeList },
      { path: "/employer/find", role: "employer", component: FindEmployee },
      { path: "/employer/create", role: "employer", component: CreateJob },
    ],
  },
  {
    path: "*",
    component: NotFound,
  },
];

export function AppRouter(props: any) {
  return (
    <Router history={history}>
      <Switch>
        {routes.map((route, i) => (
          <RouteWithSubRoutes key={i} {...route} />
        ))}
      </Switch>
    </Router>
  );
}

export function checkRoute(route: any) {
  console.log(route);

  if (route.role) {
    axios
      .get(HTTP.SERVER + "currentAccount", { withCredentials: true })
      .then((response: any) => response.data)
      .then((data: any) => {
        if (data.type === route.role) {
        } else {
          history.push("/");
          toast.error("🙄 Đây không phải vai trò của bạn", {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      });
  }
}

export function RouteWithSubRoutes(route: any) {
  useEffect(() => {
    if (route.private) {
      axios
        .get(HTTP.SERVER + "status", { withCredentials: true })
        .then((response: any) => response.data)
        .then((message: any) => {
          if (message === "LOGGED") {
            checkRoute(route);
          } else {
            // history.push("/login");
            history.push({
              pathname: "/login",
              state: { role: route.role },
            });
            toast.error("😎 Vui lòng đăng nhập trước!", {
              position: "bottom-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
        });
    }
  }, [route]);

  return (
    <Route
      path={route.path}
      render={(props) => (
        // pass the sub-routes down to keep nesting
        <>
          <route.component {...props} routes={route.routes} />
        </>
      )}
    />
  );
}
