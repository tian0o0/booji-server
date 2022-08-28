import { lang } from "@/config/constant";
import { userState } from "@/store";
import { Pagination, Platform, ProjectData, UserData } from "@/types";
import { timeFormat } from "@/utils/common";
import { Button, Switch, Table, Typography, Tooltip } from "antd";
import { ColumnsType } from "antd/lib/table";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { subscribeProject } from "@/api";

const ProjectList = ({
  value,
  loading,
  onDelete,
  onNotifySet,
  onChange,
  onUpdate,
}: {
  value: Pagination<ProjectData> | undefined;
  loading: boolean;
  onDelete: (project: ProjectData) => void;
  onNotifySet: (project: ProjectData) => void;
  onChange: (page: number) => void;
  onUpdate: () => void;
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const toUsage = (platform: Platform) => {
    navigate(`/${lang}/usage/${platform}`);
  };
  const user = useRecoilValue(userState);

  const isSubscribed = (users: UserData[]): boolean => {
    return users.findIndex((u) => u.id === user?.id) > -1;
  };
  const onSubscribeChange = async (project: ProjectData) => {
    await subscribeProject(project.id);
    onUpdate();
  };

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
      width: 100,
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
      width: 120,
      render: (text) => timeFormat(text),
    },
    {
      title: t("usage"),
      key: "action",
      align: "center",
      width: 100,
      render: (_, record) => (
        <>
          <Button type="link" onClick={() => toUsage(record.platform)}>
            {t("check")}
          </Button>
        </>
      ),
    },
    {
      title: t("operation"),
      key: "action",
      align: "center",
      width: 260,
      render: (_, record) => (
        <>
          {user?.isAdmin && (
            <Button type="link" danger onClick={() => onDelete(record)}>
              {t("delete")}
            </Button>
          )}
          <Button type="link" onClick={() => onNotifySet(record)}>
            {t("notifySetting")}
          </Button>
          <Tooltip title={t("notifyTip")}>
            <Switch
              checkedChildren={t("subscribed")}
              unCheckedChildren={t("unsubscribed")}
              checked={isSubscribed(record.users)}
              onChange={() => onSubscribeChange(record)}
            />
          </Tooltip>
        </>
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
