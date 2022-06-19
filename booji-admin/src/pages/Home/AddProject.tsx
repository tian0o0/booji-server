import { useAddProject } from "@/hooks/project";
import { AddProjectForm } from "@/types";
import { Form, Input, Modal, Select } from "antd";
import { DefaultOptionType } from "antd/lib/select";

const platforms = [
  { label: "JavaScript", value: "js" },
  { label: "React", value: "react" },
  { label: "Vue", value: "vue" },
  { label: "Angular", value: "angular" },
];

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
          rules={[{ required: true, message: "请选择平台" }]}
        >
          <Select placeholder={"平台"} options={platforms} id={"platform"} />
        </Form.Item>
        <Form.Item name={"desc"}>
          <Input placeholder={"备注"} type="text" id={"desc"} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddProject;
