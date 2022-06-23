import { useUserList } from "@/hooks/user";
import { UserData } from "@/types";
import { Button, Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import { useTranslation } from "react-i18next";

const User = () => {
  const { t } = useTranslation();
  const columns: ColumnsType<UserData> = [
    {
      title: "ID",
      dataIndex: "id",
      align: "center",
    },
    {
      title: t("na me"),
      dataIndex: "name",
      align: "center",
    },
    {
      title: t("email"),
      dataIndex: "email",
      align: "center",
    },
    {
      title: t("operation"),
      key: "action",
      align: "center",
      render: (_, record) => (
        <Button type="link" danger onClick={() => {}}>
          {t("delete")}
        </Button>
      ),
    },
  ];
  const { value, loading } = useUserList();

  return (
    <Table
      rowKey="id"
      columns={columns}
      dataSource={value}
      loading={loading}
      scroll={{ y: "calc(100vh - 260px)" }}
    />
  );
};

export default User;
