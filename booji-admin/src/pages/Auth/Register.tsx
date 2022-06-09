import { useAuth } from "@/context/auth";
import { Button, Form, Input, message } from "antd";

const Register = () => {
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
      return message.error("两次密码不一致");
    }
    register(form);
  };
  return (
    <Form onFinish={handleRegister}>
      <Form.Item
        name={"name"}
        rules={[{ required: true, message: "请输入用户名" }]}
      >
        <Input placeholder={"用户名"} type="text" id={"name"} />
      </Form.Item>
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
      <Form.Item
        name={"password2"}
        rules={[{ required: true, message: "请确认密码" }]}
      >
        <Input placeholder={"密码"} type="password" id={"password2"} />
      </Form.Item>
      <Form.Item>
        <Button loading={loading} htmlType={"submit"} className="w-full">
          注册
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Register;
