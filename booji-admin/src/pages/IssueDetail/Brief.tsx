import { useRef, useEffect, useState } from "react";
import { Breadcrumb, Event, IssueDetail, Playback } from "@/types";
import {
  StepBackwardOutlined,
  StepForwardOutlined,
  PlayCircleOutlined,
} from "@ant-design/icons";
import { Button, Divider, Space, Table, Tag, Modal } from "antd";
import { ColumnsType } from "antd/lib/table";
import { t } from "i18next";
import { useTranslation } from "react-i18next";
import rrwebPlayer from "rrweb-player";
import "rrweb-player/dist/style.css";

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
      <Breadcrumbs
        breadcrumbs={currentEvent.breadcrumbs}
        playbacks={currentEvent.playbacks}
      />
      <Tags currentEvent={currentEvent} />
    </>
  );
};

const Breadcrumbs = ({
  breadcrumbs,
  playbacks = [],
}: {
  breadcrumbs: Breadcrumb[];
  playbacks: Playback[];
}) => {
  const { t } = useTranslation();
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
  const [visible, setVisible] = useState<boolean>(false);
  return (
    <>
      <Divider orientation="left">
        {`👋 ${t("breadcrumbs")}`}{" "}
        {playbacks.length > 0 && (
          <Button
            type="primary"
            icon={<PlayCircleOutlined />}
            onClick={() => setVisible(true)}
          ></Button>
        )}
      </Divider>
      <Table
        rowKey="timestamp"
        columns={columns}
        dataSource={breadcrumbs}
        pagination={false}
      />
      <Modal
        destroyOnClose
        visible={visible}
        footer={null}
        onCancel={() => setVisible(false)}
      >
        <Player playbacks={playbacks} />
      </Modal>
    </>
  );
};

const Player = ({ playbacks = [] }: { playbacks: Playback[] }) => {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current || !playbacks.length) return;

    new rrwebPlayer({
      target: ref.current,
      props: {
        width: 472,
        height: 260,
        autoPlay: false,
        events: playbacks,
      },
    });
  }, [ref, playbacks]);

  return <div ref={ref}></div>;
};

const Tags = ({ currentEvent }: { currentEvent: Event }) => {
  return (
    <>
      <Divider orientation="left">{`🏷️ ${t("tags")}`}</Divider>
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
