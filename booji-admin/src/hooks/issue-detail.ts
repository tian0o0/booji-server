import { getIssueDetail, getIssueEvents } from "@/api/issue";
import { Event, IssueDetail } from "@/types/issue";
import { useEffect, useMemo, useState } from "react";

export const useIssueDetail = (issueId: string) => {
  const [loading, setLoading] = useState(false);
  const [detail, setDetail] = useState<IssueDetail>();

  useEffect(() => {
    setLoading(true);
    getIssueDetail(issueId)
      .then((res) => {
        setDetail(res);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return {
    loading,
    detail,
  };
};

export const useIssueEvents = (issueId: string) => {
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);
  const [total, setTotal] = useState(0);
  let [currentEventIndex, setCurrentEventIndex] = useState(0);

  useEffect(() => {
    setLoading(true);
    getIssueEvents(issueId)
      .then((res) => {
        setEvents(res.data);
        setTotal(res.count);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const currentEvent = useMemo(() => {
    return events[currentEventIndex];
  }, [events, currentEventIndex]);

  const disableLeft = useMemo(() => {
    return currentEventIndex === 0;
  }, [currentEventIndex]);

  const disableRight = useMemo(() => {
    return total === 0 || currentEventIndex === total - 1;
  }, [currentEventIndex]);

  const onPrevEvent = () => {
    setCurrentEventIndex(currentEventIndex - 1);
  };

  const onNextEvent = () => {
    setCurrentEventIndex(currentEventIndex + 1);
  };

  return {
    loading,
    events,
    currentEvent,
    disableLeft,
    disableRight,
    onPrevEvent,
    onNextEvent,
  };
};
