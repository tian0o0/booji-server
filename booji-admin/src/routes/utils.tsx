import FullScreenSpin from "@/components/FullScreenSpin";
import {
  BugOutlined,
  UnorderedListOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { ReactNode, Suspense } from "react";
import { Link, RouteObject } from "react-router-dom";

/**
 * 给懒加载路由加loadings
 * @param routes 原始路由配置
 * @returns 新的路由配置
 */
export function withLoading(routes: RouteObject[]): RouteObject[] {
  let res: RouteObject[] = [];
  if (routes && Array.isArray(routes)) {
    res = routes.map((route: RouteObject) => {
      if (route.element) {
        route.element = (
          <Suspense fallback={<FullScreenSpin />}>{route.element}</Suspense>
        );
      }
      if (route.children) {
        withLoading(route.children);
      }
      return route;
    });
  }
  return res;
}

interface MenuItem {
  key: string;
  label: ReactNode;
  title: string;
  icon: ReactNode;
}
export const MENUS: MenuItem[] = [
  {
    key: "/sys/app",
    label: (
      <Link to="/sys/app">
        <span>App</span>
      </Link>
    ),
    icon: <UnorderedListOutlined />,
    title: "App",
  },
  {
    key: "/sys/issue",
    label: (
      <Link to="/sys/issue">
        <span>Issue</span>
      </Link>
    ),
    icon: <BugOutlined />,
    title: "Issue",
  },
  {
    key: "/sys/user",
    label: (
      <Link to="/sys/user">
        <span>User</span>
      </Link>
    ),
    icon: <UserOutlined />,
    title: "User",
  },
];
