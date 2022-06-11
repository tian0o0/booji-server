import { Tabs } from "antd";

const { TabPane } = Tabs;

const statusList = [
  { label: "待处理", value: 0 },
  { label: "处理中", value: 1 },
  { label: "已处理", value: 2 },
  { label: "已关闭", value: 3 },
  { label: "重新打开", value: 4 },
  { label: "已忽略", value: 5 },
];

const StatusTab = ({ onChange }: { onChange: (activeKey: string) => void }) => {
  return (
    <Tabs defaultActiveKey="0" onChange={onChange}>
      {statusList.map((item) => (
        <TabPane tab={item.label} key={item.value} />
      ))}
    </Tabs>
  );
};

export default StatusTab;
