import { useAuth } from "@/context/auth";
import { Button, Form, Input, message } from "antd";
import { useTranslation } from "react-i18next";

const Register = () => {
  const { t } = useTranslation();
  const { register, loading } = useAuth();

  const handleRegister = async ({
    password2,
    ...form
  }: {
    name: string;
    email: string;
    password: string;
    password2: string;
  }) => {
    if (form.password !== password2) {
      return message.error(t("passwordIsDiff"));
    }
    register(form);
  };

  return (
    <Form onFinish={handleRegister}>
      <Form.Item
        name={"name"}
        rules={[{ required: true, message: t("enterName") }]}
      >
        <Input placeholder={t("name")} type="text" id={"name"} />
      </Form.Item>
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
      <Form.Item
        name={"password2"}
        rules={[{ required: true, message: t("enterPassword") }]}
      >
        <Input placeholder={t("password")} type="password" id={"password2"} />
      </Form.Item>
      <Form.Item>
        <Button loading={loading} htmlType={"submit"} className="w-full">
          {t("signup")}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Register;
