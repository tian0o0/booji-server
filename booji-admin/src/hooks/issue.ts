import { getIssueList } from "@/api/issue";
import { IssueData, IssueParams, Order } from "@/types/issue";
import { TableProps } from "antd";
import { SorterResult } from "antd/lib/table/interface";
import { useEffect, useState } from "react";
import { useProjectList } from "./project";

export const useProjectSelect = () => {
  const [selectedAppKey, setSelectedAppKey] = useState<string>("");
  const { value } = useProjectList();

  const options =
    value?.map((item) => ({
      label: item.name,
      value: item.appKey,
    })) || [];

  useEffect(() => {
    const defaultAppKey = (value && value[0]?.appKey) || "";
    setSelectedAppKey(defaultAppKey);
  }, [value]);

  const onChange = (appKey: string) => {
    setSelectedAppKey(appKey);
  };

  return {
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
  const [value, setValue] = useState<IssueData[]>([]);
  const [loading, setLoading] = useState(false);
  const [params, setParams] = useState<IssueParams>({
    appKey,
    status,
    page: 1,
  });
  const onChange: TableProps<IssueData>["onChange"] = (
    pagination,
    filters,
    sorter
  ) => {
    const { field, order } = sorter as SorterResult<IssueData>;
    setParams({
      ...params,
      sort: order ? field : undefined,
      order: order ? Order[order] : undefined,
    });
  };

  useEffect(() => {
    setLoading(true);
    getIssueList(params)
      .then((res) => {
        setValue(res.data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [params]);

  useEffect(() => {
    setParams({
      ...params,
      appKey,
      status,
    });
  }, [appKey, status]);

  return {
    loading,
    value,
    onChange,
  };
};