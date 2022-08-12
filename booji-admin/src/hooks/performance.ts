import { getPerformanceList, getUrlList } from "@/api/performance";
import { useEffect, useState } from "react";
import { useAsyncRetry } from "react-use";

export const useUrlSelect = (appKey: string) => {
  const [selectedUrlId, setSelectedUrlId] = useState<number>();
  const { value, loading } = useUrlList(appKey);

  const options =
    value?.map((item) => ({
      label: item.url,
      value: item.id,
    })) || [];

  useEffect(() => {
    const defaultUrlId = value && value[0]?.id;
    setSelectedUrlId(defaultUrlId);
  }, [value]);

  //   useEffect(() => {
  //     console.log(appKey);
  //   }, [appKey]);

  const onChange = (urlId: number) => {
    setSelectedUrlId(urlId);
  };

  return {
    loading,
    options,
    selectedUrlId,
    onChange,
  };
};

export const useUrlList = (appKey: string) => {
  return useAsyncRetry(async () => {
    if (!appKey) return;
    return await getUrlList(appKey);
  }, [appKey]);
};

export const usePerformanceList = (urlId?: number) => {
  return useAsyncRetry(async () => {
    if (!urlId) return;
    return await getPerformanceList(urlId);
  }, [urlId]);
};
