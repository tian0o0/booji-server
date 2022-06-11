import { Event } from "@/types/issue";
import { ColumnsType } from "antd/lib/table";
import { Table } from "antd";

const Events = ({ events }: { events: Event[] }) => {
  const columns: ColumnsType<Event> = [
    {
      title: "EeventID",
      dataIndex: "eventId",
      align: "center",
    },
    {
      title: "Brower",
      align: "center",
      render: (_, record) => record.ua.browser.name,
    },
    {
      title: "Engine",
      align: "center",
      render: (_, record) => record.ua.engine.name,
    },
    {
      title: "OS",
      align: "center",
      render: (_, record) => record.ua.os.name,
    },
    {
      title: "Device",
      align: "center",
      render: (_, record) => record.ua.device.type,
    },
  ];
  return <Table rowKey="timestamp" columns={columns} dataSource={events} />;
};

export default Events;
