import { useEffect } from "react";
import { Modal, Form, InputNumber, Typography } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
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
  useEffect(() => {
    form.setFieldsValue({
      ruleMinute: project.ruleMinute,
      ruleCount: project.ruleCount,
    });
  }, [project]);
  const ruleMinute = Form.useWatch("ruleMinute", form);
  const ruleCount = Form.useWatch("ruleCount", form);
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
        <Form.Item label={t("ruleMinute")} name={"ruleMinute"}>
          <InputNumber min={1} />
        </Form.Item>
        <Form.Item label={t("ruleCount")} name={"ruleCount"}>
          <InputNumber min={1} />
        </Form.Item>
      </Form>
      <Typography.Text type="warning">
        <ExclamationCircleOutlined className="mr-2" />
        {t("ruleTip", {
          minute: ruleMinute,
          count: ruleCount,
        })}
      </Typography.Text>
    </Modal>
  );
};

export default NotifySetting;
