import { Button, Dropdown, Menu } from "antd";
import { useRecoilValue } from "recoil";
import { userState } from "@/store";
import { useAuth } from "@/context/auth";
import { useTranslation } from "react-i18next";

const User = () => {
  const { t } = useTranslation();
  const user = useRecoilValue(userState);
  const { logout } = useAuth();
  const items = [
    {
      key: "logout",
      label: (
        <Button type={"link"} onClick={logout}>
          {t("logout")}
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
