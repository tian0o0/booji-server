import { useUpdateIssue } from "@/hooks/issue";
import { useUserList } from "@/hooks/user";
import { IssueDetail } from "@/types/issue";
import { timeFormat } from "@/utils/common";
import { Divider, Select, Space, Tag } from "antd";
import { statusList } from "../Issue/StatusTab";

const Header = ({ detail }: { detail: IssueDetail }) => {
  const { update } = useUpdateIssue();
  const { options } = useUserList();

  return (
    <>
      <div className="flex justify-between items-center">
        <div className="flex flex-col w-2/4">
          <Space>
            <Tag>{detail.type}</Tag>
            <span className="leading-5">{detail.message}</span>
          </Space>
          <Space className="text-xs text-gray-400 mt-3">
            <span>创建时间：{timeFormat(detail.createdAt)}</span>
            <span>更新时间：{timeFormat(detail.updatedAt)}</span>
          </Space>
        </div>
        <div className="flex justify-end items-center w-2/4">
          <div>
            <div className="text-gray-400 mb-2">分类</div>
            <Tag>{detail.category}</Tag>
          </div>
          <Divider type="vertical" />
          <div>
            <div className="text-gray-400 mb-2">等级</div>
            <Tag>{detail.level}</Tag>
          </div>
          <Divider type="vertical" />
          <div>
            <div className="text-gray-400 mb-2">事件数</div>
            <span>{detail.eventCount}</span>
          </div>
          <Divider type="vertical" />
          <div>
            <div className="text-gray-400 mb-2">用户数</div>
            <span>{detail.users.length}</span>
          </div>
          <Divider type="vertical" />
          <div>
            <div className="text-gray-400 mb-2">负责人</div>
            <Select
              className="w-full"
              placeholder="请选择"
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
              placeholder="请选择"
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
