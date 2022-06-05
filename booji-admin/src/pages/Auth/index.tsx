import { VITE_APP_LOGO } from "@config/constant";
import { Button } from "antd";
import { useState } from "react";
import Login from "./Login";
import Register from "./Register";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gray-100">
      <div className="flex flex-col items-center p-6 w-3/12 bg-white shadow rounded">
        <img src={VITE_APP_LOGO} className="h-12 mb-6" />
        {isLogin ? <Login /> : <Register />}
        <Button type="link" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "已经有账号了？直接登录" : "没有账号？注册新账号"}
        </Button>
      </div>
    </div>
  );
};

export default Auth;
