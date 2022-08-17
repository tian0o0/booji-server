import { VITE_APP_LOGO } from "@/config/constant";
import { Button } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import Login from "./Login";
import Register from "./Register";
import OAuth from "./OAuth";

const Auth = () => {
  const { t } = useTranslation();
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gray-100">
      <div className="flex flex-col items-center p-6 w-3/12 bg-white shadow rounded">
        <img src={VITE_APP_LOGO} className="h-20 mb-6" />
        {isLogin ? <Login /> : <Register />}
        <OAuth />
        <Button type="link" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? t("toRegister") : t("toLogin")}
        </Button>
      </div>
    </div>
  );
};

export default Auth;
