import { useUpdateIssue } from "@/hooks/issue";
import { useUserList } from "@/hooks/user";
import { IssueDetail } from "@/types";
import { timeFormat, mapTypeColor, mapLevelColor } from "@/utils/common";
import { Divider, Select, Space, Tag } from "antd";
import { useTranslation } from "react-i18next";
import { statusList } from "../Issue/StatusTab";

const Header = ({ detail }: { detail: IssueDetail }) => {
  const { t } = useTranslation();
  const { update } = useUpdateIssue();
  const { options } = useUserList();

  return (
    <>
      <div className="flex justify-between items-center">
        <div className="flex flex-col w-2/4">
          <Space>
            <Tag color={mapTypeColor(detail.type)}>{detail.type}</Tag>
            <span className="leading-5">{detail.message}</span>
          </Space>
          <Space className="text-xs text-gray-400 mt-3">
            <span>
              {t("createdAt")}: {timeFormat(detail.createdAt)}
            </span>
            <span>
              {t("updatedAt")}: {timeFormat(detail.updatedAt)}
            </span>
          </Space>
        </div>
        <div className="flex justify-end items-center w-2/4">
          <div>
            <div className="text-gray-400 mb-2">{t("category")}</div>
            <Tag>{detail.category}</Tag>
          </div>
          <Divider type="vertical" />
          <div>
            <div className="text-gray-400 mb-2">{t("level")}</div>
            <Tag color={mapLevelColor(detail.level)}>{detail.level}</Tag>
          </div>
          <Divider type="vertical" />
          <div>
            <div className="text-gray-400 mb-2">{t("eventCount")}</div>
            <span>{detail.eventCount}</span>
          </div>
          <Divider type="vertical" />
          <div>
            <div className="text-gray-400 mb-2">{t("userCount")}</div>
            <span>{detail.users.length}</span>
          </div>
          <Divider type="vertical" />
          <div>
            <div className="text-gray-400 mb-2">{t("assignee")}</div>
            <Select
              className="w-full"
              placeholder={t("plzSelect")}
              options={options}
              defaultValue={detail.assigneeId}
              onChange={(newAssigneeId) =>
                update(detail.issueId, { assigneeId: newAssigneeId })
              }
            />
          </div>
          <Divider type="vertical" />
          <div>
            <div className="text-gray-400 mb-2">状态</div>
            <Select
              className="w-full"
              placeholder={t("plzSelect")}
              options={statusList}
              defaultValue={detail.status}
              onChange={(newStatus) =>
                update(detail.issueId, { status: newStatus })
              }
            />
          </div>
        </div>
      </div>
      <Divider />
    </>
  );
};

export default Header;
