import FullScreenSpin from "@/components/FullScreenSpin";
import { useIssueDetail, useIssueEvents } from "@/hooks/issue-detail";
import { Tabs } from "antd";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import Brief from "./Brief";
import Chart from "./Chart";
import Events from "./Events";
import Header from "./Header";
import SourceMap from "./SourceMap";

const { TabPane } = Tabs;

const IssueDetail = () => {
  const { t } = useTranslation();
  const { issueId } = useParams();
  const { detail } = useIssueDetail(issueId!);
  const {
    events,
    currentEvent,
    disableLeft,
    disableRight,
    onPrevEvent,
    onNextEvent,
  } = useIssueEvents(issueId!);

  return (
    <div className="h-full overflow-scroll">
      {!detail ? (
        <FullScreenSpin />
      ) : (
        <>
          <Header detail={detail} />
          <SourceMap source={detail.source} />
          <Tabs defaultActiveKey="1">
            <TabPane tab={`🔎 ${t("brief")}`} key="1">
              {currentEvent && (
                <Brief
                  detail={detail}
                  currentEvent={currentEvent}
                  disableLeft={disableLeft}
                  disableRight={disableRight}
                  onPrevEvent={onPrevEvent}
                  onNextEvent={onNextEvent}
                />
              )}
            </TabPane>
            <TabPane tab={`📈 ${t("tags")}`} key="2">
              <Chart tags={detail.tags} />
            </TabPane>
            <TabPane tab={`⌚️ ${t("events")}`} key="3">
              <Events events={events} />
            </TabPane>
          </Tabs>
        </>
      )}
    </div>
  );
};

export default IssueDetail;
