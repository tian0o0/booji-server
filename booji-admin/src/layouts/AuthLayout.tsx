import React, { useState } from "react";
import { Layout, Menu } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { MENUS } from "@/routes/utils";
import { VITE_APP_LOGO, VITE_APP_TITLE } from "@/config/constant";
import User from "@/components/User";
import { useAuth } from "@/context/auth";

const { Header, Sider, Content } = Layout;

const AuthLayout: React.FC = () => {
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
          <img src={VITE_APP_LOGO} className="h-8" />
          {!collapsed && (
            <h2 className="text-slate-600 text-xl font-bold ml-1">
              {VITE_APP_TITLE}
            </h2>
          )}
        </div>
        <Menu
          theme="light"
          mode="inline"
          selectedKeys={selectedKeys}
          items={MENUS}
        />
      </Sider>
      <Layout>
        <Header className="bg-white h-16 px-4 flex justify-between items-center">
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              onClick: () => setCollapsed(!collapsed),
            }
          )}
          <User />
        </Header>
        <Content className="m-8 p-4 bg-white h-full">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AuthLayout;
