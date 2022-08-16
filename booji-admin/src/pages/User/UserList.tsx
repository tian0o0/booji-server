import { userState } from "@/store";
import { Pagination, UserData } from "@/types";
import { Button, Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import { useTranslation } from "react-i18next";
import { useRecoilValue } from "recoil";

const UserList = ({
  value,
  loading,
  onDelete,
  onChange,
}: {
  value?: Pagination<UserData>;
  loading: boolean;
  onDelete: (user: UserData) => void;
  onChange: (page: number) => void;
}) => {
  const { t } = useTranslation();

  const user = useRecoilValue(userState);
  const columns: ColumnsType<UserData> = [
    {
      title: "ID",
      dataIndex: "id",
      align: "center",
    },
    {
      title: t("name"),
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
      render: (_, record) => {
        return user?.isAdmin ? (
          <Button
            type="link"
            danger
            onClick={() => {
              onDelete(record);
            }}
          >
            {t("delete")}
          </Button>
        ) : (
          <span>-</span>
        );
      },
    },
  ];

  return (
    <Table
      rowKey="id"
      columns={columns}
      dataSource={value?.data}
      loading={loading}
      pagination={{ total: value?.count, onChange }}
      scroll={{ y: "calc(100vh - 260px)" }}
    />
  );
};

export default UserList;
