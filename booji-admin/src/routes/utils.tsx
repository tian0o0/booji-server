import FullScreenSpin from "@/components/FullScreenSpin";
import { defaultLang } from "@/config/constant";
import {
  BugOutlined,
  UnorderedListOutlined,
  UserOutlined,
  BulbOutlined,
} from "@ant-design/icons";
import { ReactNode, Suspense } from "react";
import { useTranslation } from "react-i18next";
import { Link, RouteObject } from "react-router-dom";
import { routes } from "./config";

const lang = localStorage.getItem("lang") || defaultLang;

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
  title: string | undefined;
  icon?: ReactNode;
}

/**
 * 根据路由配置生成左侧菜单
 * @returns MenuItem[]
 */
export const generateMenus = () => {
  const { t } = useTranslation();
  return routes
    .find((route) => route.path === "/")
    ?.children?.find((route) => route.path === lang)
    ?.children?.filter((route) => !route.path?.includes("/"))
    .map((route) => {
      const path = route.path as string;
      const menuItem: MenuItem = {
        key: `/${lang}/${path}`,
        label: (
          <Link to={`/${lang}/${path}`}>
            <span>{t(path)}</span>
          </Link>
        ),
        title: path,
      };
      switch (path) {
        case "app":
          menuItem.icon = <UnorderedListOutlined />;
          break;
        case "issue":
          menuItem.icon = <BugOutlined />;
          break;
        case "performance":
          menuItem.icon = <BulbOutlined />;
          break;
        case "user":
          menuItem.icon = <UserOutlined />;
          break;
      }
      return menuItem;
    });
};
