import { useDelProject } from "@/hooks/project";
import { ProjectData } from "@/types";
import { Modal } from "antd";
import { useTranslation } from "react-i18next";

const DelProject = ({
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

  const { loading, onDelete } = useDelProject();

  const onOk = async () => {
    await onDelete(project.id);
    onClose();
    onSuccess();
  };

  return (
    <Modal
      title={t("tip")}
      visible={visible}
      onOk={onOk}
      confirmLoading={loading}
      onCancel={onClose}
    >
      {t("deleteTip", { message: project.name })}
    </Modal>
  );
};

export default DelProject;
