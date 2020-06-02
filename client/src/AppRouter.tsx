import React from "react";
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
import { List } from "./components/List/List";
import { EmployeeList } from "./components/List/EmployeeList/EmployeeList";
import { EmployerList } from "./components/List/EmployerList/EmployerList";
import { EmployeeInfo } from "./components/Employee/Info/EmployeeInfo";
import { EmployerInfo } from "./components/Employer/Info/EmployerInfo";
import Login from "./components/Login/Login";
import { Profile } from "./components/Profile/Profile";

const routes = [
  {
    path: "/",
    component: Home,
    exact: true,
  },
  {
    path: "/login",
    component: Login,
    exact: true,
  },
  {
    path: "/select",
    component: Select,
    exact: true,
  },
  { path: "/profile", component: Profile },
  { path: "/employee/info/:id", component: EmployeeInfo },
  { path: "/employer/info/:id", component: EmployerInfo },
  {
    path: "/employee",
    component: Employee,
    // exact: true,
    routes: [
      { path: "/employee/find", component: FindJob, exact: true },
      { path: "/employee/create", component: CreateProfile, exact: true },
    ],
  },
  {
    path: "/employer",
    component: Employer,
    routes: [
      { path: "/employer/find", component: FindEmployee },
      { path: "/employer/create", component: CreateJob },
    ],
  },
  {
    path: "/list",
    component: List,
    routes: [
      { path: "/list/employee", component: EmployeeList },
      { path: "/list/employer", component: EmployerList },
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

export function RouteWithSubRoutes(route: any) {
  return (
    <Route
      path={route.path}
      render={(props) => (
        // pass the sub-routes down to keep nesting
        <route.component {...props} routes={route.routes} />
      )}
    />
  );
}
