import { useIssueDetail, useIssueEvents } from "@/hooks/issue-detail";
import { Divider, Spin, Tabs } from "antd";
import { useParams } from "react-router-dom";
import Brief from "./Brief";
import Chart from "./Chart";
import Events from "./Events";
import Header from "./Header";

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
        <Spin />
      ) : (
        <>
          <Header detail={detail} />
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
              <Chart />
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
