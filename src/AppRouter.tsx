import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Home } from "./components/Home/HomePage";
import { Select } from "./components/Select/Select";
import { NotFound } from "./components/NotFound/NotFound";
import { Employer } from "./components/Select/Employer/Employer";
import { Employee } from "./components/Select/Employee/Employee";
const routes = [
  {
    path: "/home",
    component: Home,
    exact: true,
  },
  {
    path: "/select",
    component: Select,
    exact: true,
  },
  { path: "/select/employer", component: Employer },
  {
    path: "/select/employee",
    component: Employee,
  },
  {
    path: "*",
    component: NotFound,
    // direct: "/home",
  },
];

export class AppRouter extends React.Component<{}> {
  render() {
    return (
      <Router>
        <Switch>
          {routes.map((route, i) => (
            <RouteWithSubRoutes key={i} {...route} />
          ))}
        </Switch>
      </Router>
    );
  }
}

function RouteWithSubRoutes(route: any) {
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
