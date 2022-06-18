import { Breadcrumb, Event, IssueDetail } from "@/types/issue";
import { timeFormat } from "@/utils/common";
import { StepBackwardOutlined, StepForwardOutlined } from "@ant-design/icons";
import { Button, Divider, Space, Table, Tag } from "antd";
import { ColumnsType } from "antd/lib/table";

const Brief = ({
  detail,
  currentEvent,
  disableLeft,
  disableRight,
  onPrevEvent,
  onNextEvent,
}: {
  detail: IssueDetail;
  currentEvent: Event;
  disableLeft: boolean;
  disableRight: boolean;
  onPrevEvent: () => void;
  onNextEvent: () => void;
}) => {
  return (
    <>
      <div className="flex justify-between item-center">
        <Tag color="purple" className="leading-8">
          EventId: {currentEvent.eventId}
        </Tag>
        <Space>
          <Button
            shape="circle"
            icon={<StepBackwardOutlined />}
            disabled={disableLeft}
            onClick={onPrevEvent}
          />
          <Button
            shape="circle"
            icon={<StepForwardOutlined />}
            disabled={disableRight}
            onClick={onNextEvent}
          />
        </Space>
      </div>
      <Breadcrumbs breadcrumbs={currentEvent.breadcrumbs} />
      <Tags currentEvent={currentEvent} />
    </>
  );
};

const Breadcrumbs = ({ breadcrumbs }: { breadcrumbs: Breadcrumb[] }) => {
  const columns: ColumnsType<Breadcrumb> = [
    {
      title: "TYPE",
      dataIndex: "type",
      align: "center",
    },
    {
      title: "CATEGORY",
      dataIndex: "category",
      align: "center",
    },
    {
      title: "DATA",
      dataIndex: "data",
      align: "center",
    },
    {
      title: "LEVEL",
      dataIndex: "level",
      align: "center",
    },
    {
      title: "TIMESTAMP",
      align: "center",
      dataIndex: "timestamp",
    },
  ];
  return (
    <>
      <Divider orientation="left">👋 触发轨迹</Divider>
      <Table
        rowKey="timestamp"
        columns={columns}
        dataSource={breadcrumbs}
        pagination={false}
      />
    </>
  );
};

const Tags = ({ currentEvent }: { currentEvent: Event }) => {
  return (
    <>
      <Divider orientation="left">🏷️ 标签</Divider>
      <div className="mb-3">
        <div className="text-xl text-cyan-700 mb-2">Headers</div>
        <div className="flex item-center">
          <div className="w-2/12 text-lg flex items-center">User-Agent:</div>
          <div className="w-10/12 text-gray-700 bg-gray-100 rounded p-3">
            {currentEvent.ua.ua}
          </div>
        </div>
      </div>
      <div className="mb-3">
        <div className="text-xl text-cyan-700 mb-2">Browser</div>
        <div className="flex item-center">
          <div className="w-2/12 text-lg flex items-center">Name:</div>
          <div className="w-10/12 text-gray-700 bg-gray-100 rounded p-3">
            {currentEvent.ua.browser.name}
          </div>
        </div>
        <div className="flex item-center">
          <div className="w-2/12 text-lg flex items-center">Version:</div>
          <div className="w-10/12 text-gray-700 bg-gray-100 rounded p-3">
            {currentEvent.ua.browser.version}
          </div>
        </div>
      </div>
      <div className="mb-3">
        <div className="text-xl text-cyan-700 mb-2">Engine</div>
        <div className="flex item-center">
          <div className="w-2/12 text-lg flex items-center">Name:</div>
          <div className="w-10/12 text-gray-700 bg-gray-100 rounded p-3">
            {currentEvent.ua.engine.name}
          </div>
        </div>
        <div className="flex item-center">
          <div className="w-2/12 text-lg flex items-center">Version:</div>
          <div className="w-10/12 text-gray-700 bg-gray-100 rounded p-3">
            {currentEvent.ua.engine.version}
          </div>
        </div>
      </div>
      <div className="mb-3">
        <div className="text-xl text-cyan-700 mb-2">OS</div>
        <div className="flex item-center">
          <div className="w-2/12 text-lg flex items-center">Name:</div>
          <div className="w-10/12 text-gray-700 bg-gray-100 rounded p-3">
            {currentEvent.ua.os.name}
          </div>
        </div>
        <div className="flex item-center">
          <div className="w-2/12 text-lg flex items-center">Version:</div>
          <div className="w-10/12 text-gray-700 bg-gray-100 rounded p-3">
            {currentEvent.ua.os.version}
          </div>
        </div>
      </div>
    </>
  );
};

export default Brief;
