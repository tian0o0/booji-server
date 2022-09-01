import { Tabs } from "antd";
import { useTranslation } from "react-i18next";
import { useParams, useSearchParams } from "react-router-dom";
import Usage from "./Usage";
import SourceMaps from "./SourceMaps";
const { TabPane } = Tabs;

const AppDetail = () => {
  const { t } = useTranslation();
  const appKey = useParams().appKey as string;
  const [searchParams] = useSearchParams();
  const platform = searchParams.get("platform") as string;
  return (
    <Tabs
      tabPosition="left"
      defaultActiveKey="1"
      className="h-full overflow-scroll"
    >
      <TabPane tab={t("usage")} key="1">
        <Usage platform={platform} />
      </TabPane>
      <TabPane tab={t("SourceMaps")} key="2">
        <SourceMaps appKey={appKey} />
      </TabPane>
    </Tabs>
  );
};

export default AppDetail;
