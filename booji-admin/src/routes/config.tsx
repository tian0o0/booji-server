import { lazy } from "react";
import { Navigate, RouteObject } from "react-router-dom";
import AuthLayout from "@/layouts/AuthLayout";
import { withLoading } from "./utils";
import { lang } from "@/config/constant";

const Auth = lazy(() => import("@/pages/Auth"));
const OAuthRedirect = lazy(() => import("@/pages/Auth/OAuthRedirect"));
const App = lazy(() => import("@/pages/App"));
const AppDetail = lazy(() => import("@/pages/AppDetail"));
const Issue = lazy(() => import("@/pages/Issue"));
const IssueDetail = lazy(() => import("@/pages/IssueDetail"));
const Performance = lazy(() => import("@/pages/Performance"));
const User = lazy(() => import("@/pages/User"));
const Usage = lazy(() => import("@/pages/AppDetail/Usage"));
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
            element: <App />,
          },
          {
            path: "app/:appKey",
            element: <AppDetail />,
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
          // {
          //   path: "usage/:platform",
          //   element: <Usage />,
          // },
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
