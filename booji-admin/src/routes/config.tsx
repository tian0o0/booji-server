import React from "react";
import { Navigate, RouteObject } from "react-router-dom";
import AuthLayout from "@/layouts/AuthLayout";
import IssueDetail from "@/pages/IssueDetail";
import { withLoading } from "./utils";
import { defaultLang } from "@/config/constant";

const lang = localStorage.getItem("lang") || defaultLang;
const Auth = React.lazy(() => import("@/pages/Auth"));
const Home = React.lazy(() => import("@/pages/Home"));
const Issue = React.lazy(() => import("@/pages/Issue"));
const User = React.lazy(() => import("@/pages/User"));
const NotFound = React.lazy(() => import("@/pages/404"));

export const routes: RouteObject[] = [
  {
    path: "/auth",
    element: <Auth />,
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: "",
        element: <Navigate to={`/${lang}/app`} />,
      },
      {
        path: lang,
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
            path: "issue/:issueId",
            element: <IssueDetail />,
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
