import { createElement, useState, useTransition } from "react";
import { Layout, Menu, Space } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { generateMenus } from "@/routes/utils";
import { VITE_APP_LOGO } from "@/config/constant";
import User from "@/components/User";
import { useAuth } from "@/context/auth";
import Lang from "@/components/Lang";
import { useTranslation } from "react-i18next";

const { Header, Sider, Content } = Layout;

const AuthLayout = () => {
  const { t } = useTranslation();
  const { hasLogin } = useAuth();
  if (!hasLogin) {
    return <Navigate to="/auth" />;
  }

  const [collapsed, setCollapsed] = useState(false);
  const selectedKeys = [useLocation().pathname];

  return (
    <Layout className="h-screen">
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        className="bg-white"
      >
        <div className="h-16 flex justify-center items-center">
          <img src={VITE_APP_LOGO} className="h-12" />
          {!collapsed && (
            <h2 className="text-slate-600 text-xl font-bold ml-1">
              {t("title")}
            </h2>
          )}
        </div>
        <Menu
          theme="light"
          mode="inline"
          selectedKeys={selectedKeys}
          items={generateMenus()}
        />
      </Sider>
      <Layout>
        <Header className="bg-white h-16 px-4 flex justify-between items-center">
          {createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            onClick: () => setCollapsed(!collapsed),
          })}
          <Space>
            <Lang />
            <User />
          </Space>
        </Header>
        <Content className="m-8 p-4 bg-white h-full">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AuthLayout;
