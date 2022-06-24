import { useDelUser } from "@/hooks/user";
import { UserData } from "@/types";
import { Modal } from "antd";
import { useTranslation } from "react-i18next";

const DelUser = ({
  user,
  visible,
  onClose,
  onSuccess,
}: {
  user: UserData;
  visible: boolean;
  onClose: () => void;
  onSuccess: () => void;
}) => {
  const { t } = useTranslation();

  const { loading, onDelete } = useDelUser();

  const onOk = async () => {
    await onDelete(user.id);
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
      {t("deleteTip", { message: user.name })}
    </Modal>
  );
};

export default DelUser;
