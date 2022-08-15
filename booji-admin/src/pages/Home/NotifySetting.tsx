import { Modal, Form, InputNumber } from "antd";
import { useTranslation } from "react-i18next";
import { ProjectData, UpdateProjectForm } from "@/types";
import { useNotifySetting } from "@/hooks/project";

const NotifySetting = ({
  project,
  visible,
  onClose,
  onSuccess,
}: {
  project: ProjectData;
  visible: boolean;
  onClose: () => void;
  onSuccess: () => void;
}) => {
  const { t } = useTranslation();
  const [form] = Form.useForm<UpdateProjectForm>();

  const { loading, onNotifySet } = useNotifySetting(form);

  const onOk = async () => {
    await onNotifySet(project.id);
    onClose();
    onSuccess();
  };

  return (
    <Modal
      title={t("notifySetting")}
      destroyOnClose
      visible={visible}
      onCancel={onClose}
      onOk={onOk}
      confirmLoading={loading}
    >
      <Form form={form}>
        <Form.Item
          label={t("ruleMinute")}
          name={"ruleMinute"}
          initialValue={project.ruleMinute}
          rules={[{ required: true, message: t("ruleMinute") }]}
        >
          <InputNumber placeholder={t("ruleMinute")} id={"minute"} min={1} />
        </Form.Item>
        <Form.Item
          label={t("ruleCount")}
          name={"ruleCount"}
          initialValue={project.ruleCount}
          rules={[{ required: true, message: t("ruleCount") }]}
        >
          <InputNumber placeholder={t("ruleCount")} id={"count"} min={1} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default NotifySetting;
