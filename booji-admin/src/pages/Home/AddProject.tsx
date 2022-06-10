import { useAddProject } from "@/hooks/project";
import { AddProjectForm } from "@/types";
import { Form, Input, Modal } from "antd";

const AddProject = ({
  visible,
  onClose,
  onSuccess,
}: {
  visible: boolean;
  onClose: () => void;
  onSuccess: () => void;
}) => {
  const [form] = Form.useForm<AddProjectForm>();
  const { loading, onAdd } = useAddProject(form);

  const onOk = async () => {
    await onAdd();
    onClose();
    onSuccess();
  };

  return (
    <Modal
      title="新增项目"
      destroyOnClose
      visible={visible}
      onOk={onOk}
      onCancel={onClose}
      confirmLoading={loading}
    >
      <Form form={form}>
        <Form.Item
          name={"name"}
          rules={[{ required: true, message: "请输入项目名" }]}
        >
          <Input placeholder={"项目名"} type="text" id={"name"} />
        </Form.Item>
        <Form.Item
          name={"platform"}
          rules={[{ required: true, message: "请输入平台" }]}
        >
          <Input placeholder={"平台"} type="text" id={"platform"} />
        </Form.Item>
        <Form.Item name={"desc"}>
          <Input placeholder={"备注"} type="text" id={"desc"} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddProject;
