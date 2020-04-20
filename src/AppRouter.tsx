import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import { Home } from "./components/Home/HomePage";
import { Select } from "./components/Select/Select";
import { NotFound } from "./components/NotFound/NotFound";
import { Employer } from "./components/Employer/Employer";
import { Employee } from "./components/Employee/Employee";
import history from "./services/history";
import { FindJob } from "./components/Employee/Find/FindJob";
import { CreateProfile } from "./components/Employee/CreateProfile/CreateProfile";

const routes = [
  {
    path: "/",
    component: Home,
    exact: true,
  },
  {
    path: "/select",
    component: Select,
    exact: true,
  },
  {
    path: "/employee",
    component: Employee,
    // exact: true,
    routes: [
      { path: "/employee/find", component: FindJob },
      { path: "/employee/create", component: CreateProfile },
    ],
  },
  { path: "/employer", component: Employer, exact: true },
  {
    path: "*",
    component: NotFound,
  },
];

export class AppRouter extends React.Component<{}> {
  render() {
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
