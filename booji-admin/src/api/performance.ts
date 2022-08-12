import { PerformanceData, UrlData } from "@/types/performance";
import request from "@/utils/request";

export const getUrlList = (appKey: string) =>
  request<UrlData[]>({
    url: `/project/${appKey}/urls`,
    method: "GET",
  });

export const getPerformanceList = (urlId: number) =>
  request<PerformanceData[]>({
    url: `/url/${urlId}/performances`,
    method: "GET",
  });
