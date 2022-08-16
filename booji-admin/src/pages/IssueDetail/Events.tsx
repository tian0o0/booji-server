import { Event } from "@/types";
import { ColumnsType, TableProps } from "antd/lib/table";
import { Table } from "antd";

const Events = ({
  events,
  total,
  onChange,
}: {
  events?: Event[];
  total?: number;
  onChange: TableProps<Event>["onChange"];
}) => {
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
  return (
    <Table
      rowKey="timestamp"
      columns={columns}
      dataSource={events}
      pagination={{ pageSize: 10, total }}
      onChange={onChange}
    />
  );
};

export default Events;
