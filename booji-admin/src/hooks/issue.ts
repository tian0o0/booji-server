import { getIssueList, updateIssue } from "@/api/issue";
import { IssueData, IssueParams, Order, UpdateIssueData } from "@/types/issue";
import { TableProps } from "antd";
import { SorterResult } from "antd/lib/table/interface";
import { useEffect, useMemo, useState } from "react";
import { useAsyncRetry } from "react-use";
import { useProjectList } from "./project";

export const useProjectSelect = () => {
  const [selectedAppKey, setSelectedAppKey] = useState<string>("");
  const { value, loading } = useProjectList(100);

  const options =
    value?.data.map((item) => ({
      label: item.name,
      value: item.appKey,
    })) || [];

  useEffect(() => {
    const defaultAppKey = (value && value?.data[0]?.appKey) || "";
    setSelectedAppKey(defaultAppKey);
  }, [value]);

  const onChange = (appKey: string) => {
    setSelectedAppKey(appKey);
  };

  return {
    loading,
    options,
    selectedAppKey,
    onChange,
  };
};

export const useStatusTab = () => {
  const [status, setStatus] = useState("0");
  const onTabChange = (activeKey: string) => {
    setStatus(activeKey);
  };

  return {
    status,
    onTabChange: onTabChange,
  };
};

export const useIssueList = (appKey: string, status: string) => {
  const [page, setPage] = useState(1);
  const [state, setState] = useState<Pick<IssueParams, "sort" | "order">>();

  const params = useMemo<IssueParams>(() => {
    return {
      appKey,
      status,
      page,
      ...state,
    };
  }, [appKey, status, page, state]);

  const res = useAsyncRetry(async () => {
    return await getIssueList(params);
  }, [params]);

  // tabel改变
  const onChange: TableProps<IssueData>["onChange"] = (
    pagination,
    filters,
    sorter
  ) => {
    const { current } = pagination;
    setPage(current || 1);

    const { field, order } = sorter as SorterResult<IssueData>;
    setState({
      sort: order ? field : undefined,
      order: order ? Order[order] : undefined,
    });
  };

  return {
    ...res,
    page,
    setPage,
    setState,
    onChange,
  };
};

export const useUpdateIssue = (retry?: () => void) => {
  const update = async (
    issueId: string,
    data: UpdateIssueData,
    shouldRetry: boolean = false
  ) => {
    await updateIssue(issueId, data);
    shouldRetry && retry?.();
  };

  return {
    update,
  };
};
