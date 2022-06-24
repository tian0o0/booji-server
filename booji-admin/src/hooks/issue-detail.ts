import { getIssueDetail, getIssueEvents } from "@/api/issue";
import { Event, IssueDetail } from "@/types/issue";
import { TableProps } from "antd";
import { useEffect, useMemo, useState } from "react";
import { useAsyncRetry } from "react-use";

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
  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  const [page, setPage] = useState(1);

  const { loading, value } = useAsyncRetry(async () => {
    return await getIssueEvents({
      issueId,
      page,
    });
  }, [issueId, page]);

  const currentEvent = useMemo(() => {
    return value?.count && value.data[currentEventIndex];
  }, [value, currentEventIndex]);

  const disableLeft = useMemo(() => {
    return currentEventIndex === 0;
  }, [currentEventIndex]);

  const disableRight = useMemo(() => {
    return (
      value?.count === 0 || currentEventIndex === (value?.data.length || 1) - 1
    );
  }, [currentEventIndex, value]);

  const onPrevEvent = () => {
    setCurrentEventIndex(currentEventIndex - 1);
  };

  const onNextEvent = () => {
    setCurrentEventIndex(currentEventIndex + 1);
  };

  const onChange: TableProps<Event>["onChange"] = (pagination) => {
    const { current } = pagination;
    setPage(current || 1);
  };

  return {
    loading,
    value,
    currentEvent,
    disableLeft,
    disableRight,
    onPrevEvent,
    onNextEvent,
    onChange,
  };
};
