import { defaultLang } from "@/config/constant";
import { FontColorsOutlined } from "@ant-design/icons";
import { Button, Dropdown, Menu } from "antd";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

const lang = localStorage.getItem("lang") || defaultLang;

const Lang = () => {
  const { t } = useTranslation();
  const pathname = useLocation().pathname.split("/")[2];
  const setLang = (lang: string) => {
    localStorage.setItem("lang", lang);
    location.hash = `/${lang}/${pathname}`;
    location.reload();
  };
  const items = [
    {
      key: "cn",
      label: (
        <Button type={"link"} onClick={() => setLang("cn")}>
          中文
        </Button>
      ),
    },
    {
      key: "en",
      label: (
        <Button type={"link"} onClick={() => setLang("en")}>
          English
        </Button>
      ),
    },
  ];
  return (
    <Dropdown overlay={<Menu items={items} />}>
      <Button type={"link"} onClick={(e) => e.preventDefault()}>
        <FontColorsOutlined />
        {t(lang)}
      </Button>
    </Dropdown>
  );
};

export default Lang;
