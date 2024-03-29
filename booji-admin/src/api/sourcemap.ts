import request from "@/utils/request";
import { SourceMapParams } from "@/types";

export const getArchiveList = (appKey: string) =>
  request<string[]>({
    url: `/archive/list?appKey=${appKey}`,
    method: "GET",
  });

export const getSourceMapList = (params: SourceMapParams) =>
  request<string[]>({
    url: `/sourcemap/list`,
    method: "GET",
    params,
  });

export const downloadFile = (url: string) =>
  request({
    url: `/file/download?url=${url}`,
    method: "GET",
    responseType: "arraybuffer",
  });
