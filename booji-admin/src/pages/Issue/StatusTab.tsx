import { Tabs } from "antd";
import { t } from "i18next";

const { TabPane } = Tabs;

export const statusList = [
  { label: t("ToBeHandled"), value: 0 },
  { label: t("Handling"), value: 1 },
  { label: t("Handled"), value: 2 },
  { label: t("Closed"), value: 3 },
  { label: t("Reopened"), value: 4 },
  { label: t("Ignored"), value: 5 },
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
