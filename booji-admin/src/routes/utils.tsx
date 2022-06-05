import { UserOutlined, VideoCameraOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { Suspense } from "react";
import { RouteObject } from "react-router-dom";

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
          <Suspense fallback={<Spin />}>{route.element}</Suspense>
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

interface MenuObject {
  icon?: JSX.Element;
  title: string;
  to: string;
}
export const MENUS: MenuObject[] = [
  {
    icon: <UserOutlined />,
    title: "App",
    to: "/sys/app",
  },
  {
    icon: <VideoCameraOutlined />,
    title: "About",
    to: "/sys/about",
  },
];
