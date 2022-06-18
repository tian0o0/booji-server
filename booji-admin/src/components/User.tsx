import React from "react";
import { Button, Dropdown, Menu } from "antd";
import { useRecoilValue } from "recoil";
import { userState } from "@/store";
import { useAuth } from "@/context/auth";

const User: React.FC = () => {
  const user = useRecoilValue(userState);
  const { logout } = useAuth();
  const items = [
    {
      key: "logout",
      label: (
        <Button type={"link"} onClick={logout}>
          退出登录
        </Button>
      ),
    },
  ];
  return (
    <Dropdown overlay={<Menu items={items} />}>
      <Button type={"link"} onClick={(e) => e.preventDefault()}>
        Hello, {user?.name}
      </Button>
    </Dropdown>
  );
};

export default User;
