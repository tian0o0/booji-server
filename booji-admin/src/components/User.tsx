import React from "react";
import { Button, Dropdown, Menu } from "antd";
import { useRecoilValue } from "recoil";
import { userState } from "@/store";
import { useAuth } from "@/context/auth";

const User: React.FC = () => {
  const user = useRecoilValue(userState);
  const { logout } = useAuth();
  return (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item key={"logout"}>
            <Button type={"link"} onClick={logout}>
              登出
            </Button>
          </Menu.Item>
        </Menu>
      }
    >
      <Button type={"link"} onClick={(e) => e.preventDefault()}>
        Hi, {user?.name}
      </Button>
    </Dropdown>
  );
};

export default User;
