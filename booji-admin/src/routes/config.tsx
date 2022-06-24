import { lazy } from "react";
import { Navigate, RouteObject } from "react-router-dom";
import AuthLayout from "@/layouts/AuthLayout";
import IssueDetail from "@/pages/IssueDetail";
import { withLoading } from "./utils";
import { defaultLang } from "@/config/constant";

const lang = localStorage.getItem("lang") || defaultLang;
const Auth = lazy(() => import("@/pages/Auth"));
const Home = lazy(() => import("@/pages/Home"));
const Issue = lazy(() => import("@/pages/Issue"));
const User = lazy(() => import("@/pages/User"));
const Usage = lazy(() => import("@/pages/Usage"));
const NotFound = lazy(() => import("@/pages/404"));

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
          {
            path: "usage/:platform",
            element: <Usage />,
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
