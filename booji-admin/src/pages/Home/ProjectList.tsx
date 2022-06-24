import { Pagination, ProjectData } from "@/types";
import { timeFormat } from "@/utils/common";
import { Button, message, Space, Table, Typography } from "antd";
import { ColumnsType } from "antd/lib/table";
import { useTranslation } from "react-i18next";

const ProjectList = ({
  value,
  loading,
  onDelete,
  onChange,
}: {
  value: Pagination<ProjectData> | undefined;
  loading: boolean;
  onDelete: (project: ProjectData) => void;
  onChange: (page: number) => void;
}) => {
  const { t } = useTranslation();
  const columns: ColumnsType<ProjectData> = [
    {
      title: t("projectName"),
      dataIndex: "name",
      key: "name",
      align: "center",
    },
    {
      title: t("platform"),
      dataIndex: "platform",
      key: "platform",
      align: "center",
    },
    {
      title: t("appKey"),
      dataIndex: "appKey",
      key: "appKey",
      align: "center",
      render: (text) => <Typography.Text copyable>{text}</Typography.Text>,
    },
    {
      title: t("createdAt"),
      key: "createdAt",
      align: "center",
      dataIndex: "createdAt",
      render: (text) => timeFormat(text),
    },
    {
      title: t("operation"),
      key: "action",
      align: "center",
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" onClick={() => message.warn("todo")}>
            {t("usage")}
          </Button>
          <Button type="link" danger onClick={() => onDelete(record)}>
            {t("delete")}
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Table
      rowKey="appKey"
      columns={columns}
      dataSource={value?.data}
      pagination={{ total: value?.count, onChange: onChange }}
      loading={loading}
      scroll={{ y: "calc(100vh - 310px)" }}
    />
  );
};

export default ProjectList;
