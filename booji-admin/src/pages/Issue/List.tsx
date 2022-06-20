import { defaultLang } from "@/config/constant";
import { useIssueList, useUpdateIssue } from "@/hooks/issue";
import { useUserList } from "@/hooks/user";
import { IssueData } from "@/types/issue";
import { timeFormat } from "@/utils/common";
import { Button, Select, Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import { useNavigate } from "react-router-dom";
import { statusList } from "./StatusTab";

const lang = localStorage.getItem("lang") || defaultLang;

const List = ({ appKey, status }: { appKey: string; status: string }) => {
  const columns: ColumnsType<IssueData> = [
    {
      title: "操作",
      dataIndex: "action",
      width: 80,
      align: "center",
      render: (_, record) => (
        <Button
          type="link"
          onClick={() => navigate(`/${lang}/issue/${record.issueId}`)}
        >
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
      dataIndex: "eventCount",
      width: 80,
      align: "center",
    },
    {
      title: "用户数",
      width: 80,
      align: "center",
      dataIndex: "users",
      render: (text) => text.length,
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
      render: (_, { issueId, assigneeId }) => (
        <Select
          className="w-full"
          placeholder="请选择"
          options={options}
          defaultValue={assigneeId}
          onChange={(newAssigneeId) =>
            update(issueId, { assigneeId: newAssigneeId })
          }
        />
      ),
    },
    {
      title: "状态",
      width: 120,
      align: "center",
      render: (_, { issueId, status }) => (
        <Select
          className="w-full"
          placeholder="请选择"
          options={statusList}
          defaultValue={status}
          onChange={(newStatus) => update(issueId, { status: newStatus }, true)}
        />
      ),
    },
  ];

  const navigate = useNavigate();
  const { loading, value, onChange, retry } = useIssueList(appKey, status);
  const { options } = useUserList();
  const { update } = useUpdateIssue(retry);

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
