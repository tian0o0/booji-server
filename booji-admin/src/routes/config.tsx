import React from "react";
import { Navigate, RouteObject } from "react-router-dom";
import BasicLayout from "@/layouts/BasicLayout";
import { withLoading } from "./utils";

const Auth = React.lazy(() => import("@/pages/Auth"));
const Home = React.lazy(() => import("@/pages/Home"));
const Issue = React.lazy(() => import("@/pages/Issue"));
const User = React.lazy(() => import("@/pages/User"));
const NotFound = React.lazy(() => import("@/pages/404"));

const routes: RouteObject[] = [
  {
    path: "/auth",
    element: <Auth />,
  },
  {
    path: "/",
    element: <BasicLayout />,
    children: [
      {
        path: "",
        element: <Navigate to="/sys/app" />,
      },
      {
        path: "sys",
        children: [
          {
            path: "app",
            element: <Home />,
          },
          {
            path: "issue",
            element: <Issue />,
          },
          {
            path: "user",
            element: <User />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default withLoading(routes);
