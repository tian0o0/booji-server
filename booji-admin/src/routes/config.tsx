import { lazy } from "react";
import { Navigate, RouteObject } from "react-router-dom";
import AuthLayout from "@/layouts/AuthLayout";
import IssueDetail from "@/pages/IssueDetail";
import { withLoading } from "./utils";
import { lang } from "@/config/constant";

const Auth = lazy(() => import("@/pages/Auth"));
const OAuthRedirect = lazy(() => import("@/pages/Auth/OAuthRedirect"));
const Home = lazy(() => import("@/pages/Home"));
const Issue = lazy(() => import("@/pages/Issue"));
const Performance = lazy(() => import("@/pages/Performance"));
const User = lazy(() => import("@/pages/User"));
const Usage = lazy(() => import("@/pages/Usage"));
const NotFound = lazy(() => import("@/pages/404"));

export const routes: RouteObject[] = [
  {
    path: "/auth",
    element: <Auth />,
  },
  {
    path: "/oauth/redirect",
    element: <OAuthRedirect />,
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
            path: "performance",
            element: <Performance />,
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
