import { getIssueList } from "@/api/issue";
import { IssueData } from "@/types/issue";
import { timeFormat } from "@/utils/common";
import { Button, message, Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import { useEffect, useState } from "react";

const List = () => {
  const columns: ColumnsType<IssueData> = [
    {
      title: "操作",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <Button type="link" onClick={() => message.warn("todo")}>
          查看
        </Button>
      ),
    },
    {
      title: "IssueId",
      dataIndex: "issueId",
      key: "issueId",
    },
    {
      title: "类型",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "分类",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "信息",
      dataIndex: "message",
      key: "message",
    },
    {
      title: "事件数",
      dataIndex: "users",
      key: "users",
      render: (text) => text.length,
    },
    {
      title: "用户数",
      dataIndex: "eventCount",
      key: "eventCount",
    },
    {
      title: "等级",
      dataIndex: "level",
      defaultSortOrder: "descend",
      // sorter: (a, b) =>
    },
    {
      title: "生成时间",
      key: "createdAt",
      render: (text) => timeFormat(text),
    },
    {
      title: "更新时间",
      key: "updatedAt",
      render: (text) => timeFormat(text),
    },
    {
      title: "负责人",
      key: "assigneeId",
      render: (text) => text,
    },
    {
      title: "状态",
      key: "status",
      render: (text) => text,
    },
  ];

  const [value, setValue] = useState<IssueData[]>([]);
  const [loading, setLoading] = useState(false);
  const [params, setParams] = useState({
    appKey: "",
    status: 0,
    page: 1,
  });
  useEffect(() => {
    setLoading(true);
    getIssueList(params)
      .then((res) => {
        setValue(res.data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  return (
    <Table
      rowKey="appKey"
      columns={columns}
      dataSource={value}
      loading={loading}
      scroll={{ y: "calc(100vh - 310px)" }}
    />
  );
};

export default List;
