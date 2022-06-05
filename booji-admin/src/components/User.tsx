import React from "react";
import { Button, Dropdown, Menu } from "antd";

const User: React.FC = () => {
  return (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item key={"logout"}>
            <Button type={"link"}>登出</Button>
          </Menu.Item>
        </Menu>
      }
    >
      <Button type={"link"} onClick={(e) => e.preventDefault()}>
        Hi,
      </Button>
    </Dropdown>
  );
};

export default User;
