import { useUserList } from "@/hooks/user";
import { UserData } from "@/types";
import { Button, Table } from "antd";
import { ColumnsType } from "antd/lib/table";

const User = () => {
  const columns: ColumnsType<UserData> = [
    {
      title: "ID",
      dataIndex: "id",
      align: "center",
    },
    {
      title: "姓名",
      dataIndex: "name",
      align: "center",
    },
    {
      title: "邮箱",
      dataIndex: "email",
      align: "center",
    },
    {
      title: "操作",
      key: "action",
      align: "center",
      render: (_, record) => (
        <Button type="link" danger onClick={() => {}}>
          删除
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
