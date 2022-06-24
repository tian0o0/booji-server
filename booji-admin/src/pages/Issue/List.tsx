import { defaultLang } from "@/config/constant";
import { useUpdateIssue } from "@/hooks/issue";
import { useUserList } from "@/hooks/user";
import { Pagination } from "@/types";
import { IssueData } from "@/types/issue";
import { timeFormat } from "@/utils/common";
import { Button, Select, Table } from "antd";
import { ColumnsType, TableProps } from "antd/lib/table";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { statusList } from "./StatusTab";

const lang = localStorage.getItem("lang") || defaultLang;

const List = ({
  loading,
  value,
  page,
  retry,
  onChange,
}: {
  loading: boolean;
  value: Pagination<IssueData>;
  page: number;
  retry: () => void;
  onChange: TableProps<IssueData>["onChange"];
}) => {
  const { t } = useTranslation();

  const columns: ColumnsType<IssueData> = [
    {
      title: t("operation"),
      dataIndex: "action",
      width: 80,
      align: "center",
      render: (_, record) => (
        <Button
          type="link"
          onClick={() => navigate(`/${lang}/issue/${record.issueId}`)}
        >
          {t("check")}
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
      title: t("type"),
      dataIndex: "type",
      width: 110,
      align: "center",
    },
    {
      title: t("category"),
      dataIndex: "category",
      width: 80,
      align: "center",
    },
    {
      title: t("info"),
      dataIndex: "message",
    },
    {
      title: t("eventCount"),
      dataIndex: "eventCount",
      width: 80,
      align: "center",
    },
    {
      title: t("userCount"),
      width: 80,
      align: "center",
      dataIndex: "users",
      render: (text) => text.length,
    },
    {
      title: t("level"),
      dataIndex: "level",
      width: 80,
      align: "center",
      sorter: true,
    },
    {
      title: t("createdAt"),
      width: 160,
      align: "center",
      render: (text) => timeFormat(text),
    },
    {
      title: t("updatedAt"),
      width: 160,
      align: "center",
      render: (text) => timeFormat(text),
    },
    {
      title: t("assignee"),
      width: 120,
      align: "center",
      render: (_, { issueId, assigneeId }) => (
        <Select
          className="w-full"
          placeholder={t("plzSelect")}
          options={options}
          defaultValue={assigneeId}
          onChange={(newAssigneeId) =>
            update(issueId, { assigneeId: newAssigneeId })
          }
        />
      ),
    },
    {
      title: t("status"),
      width: 120,
      align: "center",
      render: (_, { issueId, status }) => (
        <Select
          className="w-full"
          placeholder={t("plzSelect")}
          options={statusList}
          defaultValue={status}
          onChange={(newStatus) => update(issueId, { status: newStatus }, true)}
        />
      ),
    },
  ];

  const navigate = useNavigate();
  const { options } = useUserList(100);
  const { update } = useUpdateIssue(retry);

  return (
    <Table
      rowKey="issueId"
      columns={columns}
      dataSource={value?.data}
      loading={loading}
      pagination={{
        total: value?.count,
        current: page,
        pageSize: 10,
      }}
      scroll={{ y: "calc(100vh - 390px)" }}
      onChange={onChange}
    />
  );
};

export default List;
