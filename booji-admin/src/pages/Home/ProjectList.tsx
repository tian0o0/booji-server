import { useProjectList } from "@/hooks/project";
import { ProjectData } from "@/types";
import { timeFormat } from "@/utils/common";
import { Button, message, Modal, Space, Table, Typography } from "antd";
import { ColumnsType } from "antd/lib/table";
import { useState } from "react";
import { delProject } from "@/api";

const ProjectList = ({
  value,
  loading,
  onDelete,
}: {
  value: ProjectData[] | undefined;
  loading: boolean;
  onDelete: (project: ProjectData) => void;
}) => {
  const columns: ColumnsType<ProjectData> = [
    {
      title: "项目名",
      dataIndex: "name",
      key: "name",
      align: "center",
    },
    {
      title: "平台",
      dataIndex: "platform",
      key: "platform",
      align: "center",
    },
    {
      title: "AppKey",
      dataIndex: "appKey",
      key: "appKey",
      align: "center",
      render: (text) => <Typography.Text copyable>{text}</Typography.Text>,
    },
    {
      title: "创建时间",
      key: "createdAt",
      align: "center",
      dataIndex: "createdAt",
      render: (text) => timeFormat(text),
    },
    {
      title: "操作",
      key: "action",
      align: "center",
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" onClick={() => message.warn("todo")}>
            使用示例
          </Button>
          <Button type="link" danger onClick={() => onDelete(record)}>
            删除
          </Button>
        </Space>
      ),
    },
  ];

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

export default ProjectList;
