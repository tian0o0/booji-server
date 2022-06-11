import { useIssueList } from "@/hooks/issue";
import { IssueData } from "@/types/issue";
import { timeFormat } from "@/utils/common";
import { Button, message, Table } from "antd";
import { ColumnsType } from "antd/lib/table";

const List = ({ appKey, status }: { appKey: string; status: string }) => {
  const columns: ColumnsType<IssueData> = [
    {
      title: "操作",
      dataIndex: "action",
      width: 80,
      align: "center",
      render: (record) => (
        <Button type="link" onClick={() => message.warn("todo")}>
          查看
        </Button>
      ),
    },
    {
      title: "IssueId",
      dataIndex: "issueId",
      width: 110,
      align: "center",
    },
    {
      title: "类型",
      dataIndex: "type",
      width: 110,
      align: "center",
    },
    {
      title: "分类",
      dataIndex: "category",
      width: 80,
      align: "center",
    },
    {
      title: "信息",
      dataIndex: "message",
    },
    {
      title: "事件数",
      dataIndex: "users",
      width: 80,
      align: "center",
      render: (text) => text.length,
    },
    {
      title: "用户数",
      dataIndex: "eventCount",
      width: 80,
      align: "center",
    },
    {
      title: "等级",
      dataIndex: "level",
      width: 80,
      align: "center",
      sorter: true,
    },
    {
      title: "生成时间",
      width: 160,
      align: "center",
      render: (text) => timeFormat(text),
    },
    {
      title: "更新时间",
      width: 160,
      align: "center",
      render: (text) => timeFormat(text),
    },
    {
      title: "负责人",
      width: 120,
      align: "center",
      render: (text) => text,
    },
    {
      title: "状态",
      width: 120,
      align: "center",
      render: (text) => text,
    },
  ];

  const { loading, value, onChange } = useIssueList(appKey, status);

  return (
    <Table
      rowKey="issueId"
      columns={columns}
      dataSource={value}
      loading={loading}
      scroll={{ y: "calc(100vh - 360px)" }}
      onChange={onChange}
    />
  );
};

export default List;
