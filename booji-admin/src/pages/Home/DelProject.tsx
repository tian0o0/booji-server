import { useDelProject } from "@/hooks/project";
import { ProjectData } from "@/types";
import { Modal } from "antd";

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
  const { loading, onDelete } = useDelProject();

  const onOk = async () => {
    await onDelete(project.appKey);
    onClose();
    onSuccess();
  };

  return (
    <Modal
      title="提示"
      visible={visible}
      onOk={onOk}
      confirmLoading={loading}
      onCancel={onClose}
    >
      {`确定删除[${project.name}]吗？`}
    </Modal>
  );
};

export default DelProject;
