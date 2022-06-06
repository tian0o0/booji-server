import React, { useState } from "react";
import { Layout, Menu } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { Link, Outlet, useLocation, useMatch } from "react-router-dom";
import { MENUS } from "@/routes/utils";
import { VITE_APP_LOGO, VITE_APP_TITLE } from "@config/constant";
import User from "@/components/User";

const { Header, Sider, Content } = Layout;

const BasicLayout: React.FC = () => {
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
          defaultSelectedKeys={selectedKeys}
          items={MENUS}
        />
      </Sider>
      <Layout className="h-16">
        <Header className="bg-white h-16 px-4 flex justify-between items-center">
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              onClick: () => setCollapsed(!collapsed),
            }
          )}
          <User />
        </Header>
        <Content className="m-8 p-4 bg-white min-h-full">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default BasicLayout;
