import FullScreenSpin from "@/components/FullScreenSpin";
import { useIssueDetail, useIssueEvents } from "@/hooks/issue-detail";
import { Divider, Tabs } from "antd";
import { useParams } from "react-router-dom";
import Brief from "./Brief";
import Chart from "./Chart";
import Events from "./Events";
import Header from "./Header";
import SourceMap from "./SourceMap";

const { TabPane } = Tabs;

const IssueDetail = () => {
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
          <Divider />
          <SourceMap source={detail.source} />
          <Divider />
          <Tabs defaultActiveKey="1">
            <TabPane tab="🔎 摘要" key="1">
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
            <TabPane tab="📈 标签统计" key="2">
              <Chart tags={detail.tags} />
            </TabPane>
            <TabPane tab="⌚️ 事件列表" key="3">
              <Events events={events} />
            </TabPane>
          </Tabs>
        </>
      )}
    </div>
  );
};

export default IssueDetail;
