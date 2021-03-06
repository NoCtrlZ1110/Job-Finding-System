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
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Profile from "./components/Profile/Profile";
import axios from "axios";
import HTTP from "./services/request";
import { toast } from "react-toastify";
import JobDetail from "./components/Employee/JobDetail/JobDetail";
import EmployeeJobDetail from "./components/Employer/EmployeeJobDetail/EmployeeJobDetail";
import { MyJobs } from "./components/Employer/MyJobs/MyJobs";
import MyJobDetail from "./components/Employer/MyJobDetail/MyJobDetail";
import { Invitation } from "./components/Employee/Invitation/Invitation";

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
  { path: "/employee/job/:id", component: JobDetail, private: true },

  {
    path: "/employer/employeeInfo/:id",
    component: EmployeeJobDetail,
    private: true,
  },
  {
    path: "/employee",
    component: Employee,
    private: true,
    role: "employee",
    routes: [
      { path: "/employee/profileInfo", role: "employee", component: Profile },
      { path: "/employee/list", role: "employee", component: JobList },
      {
        path: "/employee/findJob",
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
      {
        path: "/employee/invitation",
        component: Invitation,
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
      {
        path: "/employer/profileInfo",
        role: "employer",
        component: Profile,
        private: true,
      },
      {
        path: "/employer/list",
        role: "employer",
        component: EmployeeList,
        private: true,
      },
      {
        path: "/employer/findEmployee",
        role: "employer",
        component: FindEmployee,
        private: true,
      },
      {
        path: "/employer/create",
        role: "employer",
        component: CreateJob,
        private: true,
      },
      {
        path: "/employer/myJobs/:id",
        role: "employer",
        component: MyJobDetail,
        private: true,
      },
      {
        path: "/employer/myJobs",
        role: "employer",
        component: MyJobs,
        private: true,
      },
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
  if (route.role) {
    axios
      .get(HTTP.SERVER + "currentRole", { withCredentials: true })
      .then((response: any) => response.data)
      .then((data: any) => {
        if (data === route.role) {
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
