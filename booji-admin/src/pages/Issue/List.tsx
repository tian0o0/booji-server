import { lang } from "@/config/constant";
import { useUpdateIssue } from "@/hooks/issue";
import { useUserList } from "@/hooks/user";
import { Pagination, IssueData } from "@/types";
import { timeFormat, mapTypeColor, mapLevelColor } from "@/utils/common";
import { Button, Select, Table, Tag } from "antd";
import { ColumnsType, TableProps } from "antd/lib/table";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { statusList } from "./StatusTab";

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
      fixed: "left",
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
      render: (_, record) => (
        <Tag color={mapTypeColor(record.type)}>{record.type}</Tag>
      ),
    },
    {
      title: t("category"),
      dataIndex: "category",
      width: 120,
      align: "center",
    },
    {
      title: t("info"),
      dataIndex: "message",
      width: 300,
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
      render: (_, record) => (
        <Tag color={mapLevelColor(record.level)}>{record.level}</Tag>
      ),
    },
    {
      title: t("createdAt"),
      dataIndex: "createdAt",
      width: 160,
      align: "center",
      render: (text) => timeFormat(text),
    },
    {
      title: t("updatedAt"),
      dataIndex: "updatedAt",
      width: 160,
      align: "center",
      render: (text) => timeFormat(text),
    },
    {
      title: t("assignee"),
      width: 120,
      align: "center",
      fixed: "right",
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
      fixed: "right",
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
