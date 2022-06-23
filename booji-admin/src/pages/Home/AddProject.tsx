import { useAddProject } from "@/hooks/project";
import { AddProjectForm } from "@/types";
import { Form, Input, Modal, Select } from "antd";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
  const [form] = Form.useForm<AddProjectForm>();
  const { loading, onAdd } = useAddProject(form);

  const onOk = async () => {
    await onAdd();
    onClose();
    onSuccess();
  };

  return (
    <Modal
      title={t("addProject")}
      destroyOnClose
      visible={visible}
      onOk={onOk}
      onCancel={onClose}
      confirmLoading={loading}
    >
      <Form form={form}>
        <Form.Item
          name={"name"}
          rules={[{ required: true, message: t("projectName") }]}
        >
          <Input placeholder={t("projectName")} type="text" id={"name"} />
        </Form.Item>
        <Form.Item
          name={"platform"}
          rules={[{ required: true, message: t("platform") }]}
        >
          <Select
            placeholder={t("platform")}
            options={platforms}
            id={"platform"}
          />
        </Form.Item>
        <Form.Item name={"desc"}>
          <Input placeholder={t("remark")} type="text" id={"desc"} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddProject;
