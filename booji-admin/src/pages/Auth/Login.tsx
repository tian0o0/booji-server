import { Button, Form, Input } from "antd";
import { useAuth } from "@/context/auth";

const Login = () => {
  const { login, loading } = useAuth();

  return (
    <Form onFinish={login}>
      <Form.Item
        name={"email"}
        rules={[{ required: true, message: "请输入邮箱" }]}
      >
        <Input placeholder={"邮箱"} type="text" id={"email"} />
      </Form.Item>
      <Form.Item
        name={"password"}
        rules={[{ required: true, message: "请输入密码" }]}
      >
        <Input placeholder={"密码"} type="password" id={"password"} />
      </Form.Item>
      <Form.Item>
        <Button loading={loading} htmlType={"submit"} className="w-full">
          登录
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Login;
