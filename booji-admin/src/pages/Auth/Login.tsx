import { Button, Form, Input } from "antd";
import { useAuth } from "@/context/auth";
import { useTranslation } from "react-i18next";

const Login = () => {
  const { t } = useTranslation();
  const { login, loading } = useAuth();

  return (
    <Form onFinish={login}>
      <Form.Item
        name={"email"}
        rules={[{ required: true, message: t("enterEmail") }]}
      >
        <Input placeholder={t("email")} type="text" id={"email"} />
      </Form.Item>
      <Form.Item
        name={"password"}
        rules={[{ required: true, message: t("enterPassword") }]}
      >
        <Input placeholder={t("password")} type="password" id={"password"} />
      </Form.Item>
      <Form.Item>
        <Button loading={loading} htmlType={"submit"} className="w-full">
          {t("signin")}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Login;
