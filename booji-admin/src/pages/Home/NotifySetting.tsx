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
  project?: ProjectData;
  visible: boolean;
  onClose: () => void;
  onSuccess: () => void;
}) => {
  const { t } = useTranslation();
  const [form] = Form.useForm<UpdateProjectForm>();

  const { loading, onNotifySet } = useNotifySetting(form);

  // Internal React error: Expected static flag was missing
  // should return after hooks
  if (!project) return null;

  form.setFieldsValue({
    ruleMinute: project.ruleMinute,
    ruleCount: project.ruleCount,
  });

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
      <Form
        form={form}
        initialValues={{
          ruleMinute: project.ruleMinute,
          ruleCount: project.ruleCount,
        }}
      >
        <Form.Item
          label={t("ruleMinute")}
          name={"ruleMinute"}
          rules={[{ required: true, message: t("ruleMinute") }]}
        >
          <InputNumber id={"ruleMinute"} min={1} />
        </Form.Item>
        <Form.Item
          label={t("ruleCount")}
          name={"ruleCount"}
          rules={[{ required: true, message: t("ruleCount") }]}
        >
          <InputNumber id={"ruleCount"} min={1} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default NotifySetting;
