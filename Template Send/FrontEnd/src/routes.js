import React from "react";

const Users = React.lazy(() => import("./containers/users/Users"));
const User = React.lazy(() => import("./containers/users/User"));

const Roles = React.lazy(() => import("./containers/roles/Roles"));
const Role = React.lazy(() => import("./containers/roles/Role"));

const routes = [
  // { path: '/', exact: true, name: 'Home' },
  { path: "/users", exact: true, name: "Users", component: Users },
  { path: "/user/:id", exact: true, name: "User Detail", component: User },
  { path: "/createUser", exact: true, name: "Create User", component: User },

  { path: "/roles", exact: true, name: "Roles", component: Roles },
  { path: "/role/:id", exact: true, name: "Role Detail", component: Role },
  { path: "/createRole", exact: true, name: "Create Role", component: Role },
];

export default routes;
